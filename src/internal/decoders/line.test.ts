import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { findDoubleNewlineIndex, LineDecoder } from './line.js';

function decodeChunks(chunks: string[], { flush }: { flush: boolean } = { flush: false }): string[] {
  const decoder = new LineDecoder();
  const lines: string[] = [];
  for (const chunk of chunks) {
    lines.push(...decoder.decode(chunk));
  }

  if (flush) {
    lines.push(...decoder.flush());
  }

  return lines;
}

describe('line decoder', () => {
  it('basic', () => {
    // baz is not included because the line hasn't ended yet
    assert.deepStrictEqual(decodeChunks(['foo', ' bar\nbaz']), ['foo bar']);
  });

  it('basic with \\r', () => {
    assert.deepStrictEqual(decodeChunks(['foo', ' bar\r\nbaz']), ['foo bar']);
    assert.deepStrictEqual(decodeChunks(['foo', ' bar\r\nbaz'], { flush: true }), ['foo bar', 'baz']);
  });

  it('trailing new lines', () => {
    assert.deepStrictEqual(decodeChunks(['foo', ' bar', 'baz\n', 'thing\n']), ['foo barbaz', 'thing']);
  });

  it('trailing new lines with \\r', () => {
    assert.deepStrictEqual(decodeChunks(['foo', ' bar', 'baz\r\n', 'thing\r\n']), ['foo barbaz', 'thing']);
  });

  it('escaped new lines', () => {
    assert.deepStrictEqual(decodeChunks(['foo', ' bar\\nbaz\n']), ['foo bar\\nbaz']);
  });

  it('escaped new lines with \\r', () => {
    assert.deepStrictEqual(decodeChunks(['foo', ' bar\\r\\nbaz\n']), ['foo bar\\r\\nbaz']);
  });

  it('\\r & \\n split across multiple chunks', () => {
    assert.deepStrictEqual(decodeChunks(['foo\r', '\n', 'bar'], { flush: true }), ['foo', 'bar']);
  });

  it('single \\r', () => {
    assert.deepStrictEqual(decodeChunks(['foo\r', 'bar'], { flush: true }), ['foo', 'bar']);
  });

  it('double \\r', () => {
    assert.deepStrictEqual(decodeChunks(['foo\r', 'bar\r'], { flush: true }), ['foo', 'bar']);
    assert.deepStrictEqual(decodeChunks(['foo\r', '\r', 'bar'], { flush: true }), ['foo', '', 'bar']);
    // implementation detail that we don't yield the single \r line until a new \r or \n is encountered
    assert.deepStrictEqual(decodeChunks(['foo\r', '\r', 'bar'], { flush: false }), ['foo']);
  });

  it('double \\r then \\r\\n', () => {
    assert.deepStrictEqual(decodeChunks(['foo\r', '\r', '\r', '\n', 'bar', '\n']), ['foo', '', '', 'bar']);
    assert.deepStrictEqual(decodeChunks(['foo\n', '\n', '\n', 'bar', '\n']), ['foo', '', '', 'bar']);
  });

  it('double newline', () => {
    assert.deepStrictEqual(decodeChunks(['foo\n\nbar'], { flush: true }), ['foo', '', 'bar']);
    assert.deepStrictEqual(decodeChunks(['foo', '\n', '\nbar'], { flush: true }), ['foo', '', 'bar']);
    assert.deepStrictEqual(decodeChunks(['foo\n', '\n', 'bar'], { flush: true }), ['foo', '', 'bar']);
    assert.deepStrictEqual(decodeChunks(['foo', '\n', '\n', 'bar'], { flush: true }), ['foo', '', 'bar']);
  });

  it('multi-byte characters across chunks', () => {
    const decoder = new LineDecoder();

    // bytes taken from the string 'известни' and arbitrarily split
    // so that some multi-byte characters span multiple chunks
    assert.strictEqual(decoder.decode(new Uint8Array([0xd0])).length, 0);
    assert.strictEqual(decoder.decode(new Uint8Array([0xb8, 0xd0, 0xb7, 0xd0])).length, 0);
    assert.strictEqual(
      decoder.decode(new Uint8Array([0xb2, 0xd0, 0xb5, 0xd1, 0x81, 0xd1, 0x82, 0xd0, 0xbd, 0xd0, 0xb8]))
        .length,
      0,
    );

    const decoded = decoder.decode(new Uint8Array([0xa]));
    assert.deepStrictEqual(decoded, ['известни']);
  });

  it('flushing trailing newlines', () => {
    assert.deepStrictEqual(decodeChunks(['foo\n', '\nbar'], { flush: true }), ['foo', '', 'bar']);
  });

  it('flushing empty buffer', () => {
    assert.deepStrictEqual(decodeChunks([], { flush: true }), []);
  });
});

describe('findDoubleNewlineIndex', () => {
  it('finds \\n\\n', () => {
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\n\nbar')), 5);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('\n\nbar')), 2);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\n\n')), 5);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('\n\n')), 2);
  });

  it('finds \\r\\r', () => {
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\rbar')), 5);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('\r\rbar')), 2);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\r')), 5);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('\r\r')), 2);
  });

  it('finds \\r\\n\\r\\n', () => {
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\n\r\nbar')), 7);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('\r\n\r\nbar')), 4);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\n\r\n')), 7);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('\r\n\r\n')), 4);
  });

  it('returns -1 when no double newline found', () => {
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\nbar')), -1);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\rbar')), -1);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\nbar')), -1);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('')), -1);
  });

  it('handles incomplete patterns', () => {
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\n\r')), -1);
    assert.strictEqual(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\n')), -1);
  });
});
