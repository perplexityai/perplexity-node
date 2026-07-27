import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Stream, _iterSSEMessages } from './streaming.js';
import { APIError } from './error.js';
import { ReadableStreamFrom } from '../internal/shims.js';

describe('streaming decoding', () => {
  it('basic', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('event: completion\n');
      yield Buffer.from('data: {"foo":true}\n');
      yield Buffer.from('\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(JSON.parse(event.value.data), { foo: true });

    event = await stream.next();
    assert.ok(event.done);
  });

  it('data without event', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('data: {"foo":true}\n');
      yield Buffer.from('\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.strictEqual(event.value.event, null);
    assert.deepStrictEqual(JSON.parse(event.value.data), { foo: true });

    event = await stream.next();
    assert.ok(event.done);
  });

  it('event without data', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('event: foo\n');
      yield Buffer.from('\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(event.value.event, 'foo');
    assert.deepStrictEqual(event.value.data, '');

    event = await stream.next();
    assert.ok(event.done);
  });

  it('multiple events', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('event: foo\n');
      yield Buffer.from('\n');
      yield Buffer.from('event: ping\n');
      yield Buffer.from('\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(event.value.event, 'foo');
    assert.deepStrictEqual(event.value.data, '');

    event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(event.value.event, 'ping');
    assert.deepStrictEqual(event.value.data, '');

    event = await stream.next();
    assert.ok(event.done);
  });

  it('multiple events with data', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('event: foo\n');
      yield Buffer.from('data: {"foo":true}\n');
      yield Buffer.from('\n');
      yield Buffer.from('event: ping\n');
      yield Buffer.from('data: {"bar":false}\n');
      yield Buffer.from('\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(event.value.event, 'foo');
    assert.deepStrictEqual(JSON.parse(event.value.data), { foo: true });

    event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(event.value.event, 'ping');
    assert.deepStrictEqual(JSON.parse(event.value.data), { bar: false });

    event = await stream.next();
    assert.ok(event.done);
  });

  it('multiple data lines with empty line', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('event: ping\n');
      yield Buffer.from('data: {\n');
      yield Buffer.from('data: "foo":\n');
      yield Buffer.from('data: \n');
      yield Buffer.from('data:\n');
      yield Buffer.from('data: true}\n');
      yield Buffer.from('\n\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(event.value.event, 'ping');
    assert.deepStrictEqual(JSON.parse(event.value.data), { foo: true });
    assert.deepStrictEqual(event.value.data, '{\n"foo":\n\n\ntrue}');

    event = await stream.next();
    assert.ok(event.done);
  });

  it('data json escaped double new line', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('event: ping\n');
      yield Buffer.from('data: {"foo": "my long\\n\\ncontent"}');
      yield Buffer.from('\n\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(event.value.event, 'ping');
    assert.deepStrictEqual(JSON.parse(event.value.data), { foo: 'my long\n\ncontent' });

    event = await stream.next();
    assert.ok(event.done);
  });

  it('special new line characters', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('data: {"content": "culpa "}\n');
      yield Buffer.from('\n');
      yield Buffer.from('data: {"content": "');
      yield Buffer.from([0xe2, 0x80, 0xa8]);
      yield Buffer.from('"}\n');
      yield Buffer.from('\n');
      yield Buffer.from('data: {"content": "foo"}\n');
      yield Buffer.from('\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(JSON.parse(event.value.data), { content: 'culpa ' });

    event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(JSON.parse(event.value.data), {
      content: Buffer.from([0xe2, 0x80, 0xa8]).toString(),
    });

    event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(JSON.parse(event.value.data), { content: 'foo' });

    event = await stream.next();
    assert.ok(event.done);
  });

  it('multi-byte characters across chunks', async () => {
    async function* body(): AsyncGenerator<Buffer> {
      yield Buffer.from('event: completion\n');
      yield Buffer.from('data: {"content": "');
      // bytes taken from the string 'известни' and arbitrarily split
      // so that some multi-byte characters span multiple chunks
      yield Buffer.from([0xd0]);
      yield Buffer.from([0xb8, 0xd0, 0xb7, 0xd0]);
      yield Buffer.from([0xb2, 0xd0, 0xb5, 0xd1, 0x81, 0xd1, 0x82, 0xd0, 0xbd, 0xd0, 0xb8]);
      yield Buffer.from('"}\n');
      yield Buffer.from('\n');
    }

    const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
      Symbol.asyncIterator
    ]();

    let event = await stream.next();
    assert(event.value);
    assert.deepStrictEqual(event.value.event, 'completion');
    assert.deepStrictEqual(JSON.parse(event.value.data), { content: 'известни' });

    event = await stream.next();
    assert.ok(event.done);
  });
});

it('error handling', async () => {
  async function* body(): AsyncGenerator<Buffer> {
    yield Buffer.from('event: error\n');
    yield Buffer.from('data: {"type":"error","error":{"type":"overloaded_error","message":"Overloaded"}}');
    yield Buffer.from('\n\n');
  }

  const stream = Stream.fromSSEResponse(
    new Response(await ReadableStreamFrom(body())),
    new AbortController(),
  );

  await assert.rejects(
    (async () => {
      for await (const _event of stream) {
      }
    })(),
    (error: unknown) => {
      assert.ok(error instanceof APIError);
      assert.strictEqual(
        error.message,
        '{"type":"error","error":{"type":"overloaded_error","message":"Overloaded"}}',
      );
      return true;
    },
  );
});
