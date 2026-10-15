import assert from 'node:assert/strict';
import { it } from 'node:test';
import Perplexity from '../../../index.js';
import { Stream } from '../../../core/streaming.js';

const event = {
  type: 'response.output_text.delta',
  sequence_number: 4,
  item_id: 'msg-1',
  output_index: 0,
  content_index: 0,
  delta: 'resumed',
};

it('resumes a background response stream after a cursor', async () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      const request = new Request(input, init);
      assert.equal(request.method, 'GET');
      const url = new URL(request.url);
      assert.equal(url.pathname, '/v1/responses/resp-1');
      assert.deepEqual(Object.fromEntries(url.searchParams), { starting_after: '3', stream: 'true' });
      return new Response(`data: ${JSON.stringify(event)}\n\n`, {
        headers: { 'content-type': 'text/event-stream' },
      });
    },
  });
  const stream = await client.responses.retrieve('resp-1', { stream: true, starting_after: 3 });
  assert.ok(stream instanceof Stream);
  const events = [];
  for await (const item of stream) events.push(item);
  assert.deepEqual(events, [event]);
});

it('keeps plain retrieve as a JSON snapshot without query parameters', async () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      const request = new Request(input, init);
      assert.equal(request.url, 'https://example.test/v1/responses/resp-1');
      return Response.json({
        id: 'resp-1',
        object: 'response',
        created_at: 0,
        model: 'openai/gpt-5.4',
        status: 'completed',
        output: [],
      });
    },
  });
  const response = await client.responses.retrieve('resp-1');
  assert.equal(response.id, 'resp-1');
  assert.equal(response.output_text, '');
});

it('does not take routing fields from retrieve parameters', async () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    maxRetries: 0,
    fetch: async (input, init) => {
      const request = new Request(input, init);
      assert.equal(request.method, 'GET');
      assert.equal(request.url, 'https://example.test/v1/responses/resp-1');
      assert.equal(request.headers.get('x-custom'), 'kept');
      assert.equal(await request.text(), '');
      return Response.json({
        id: 'resp-1',
        object: 'response',
        created_at: 0,
        model: 'openai/gpt-5.4',
        status: 'completed',
        output: [],
      });
    },
  });
  const params = {
    headers: { 'X-Custom': 'kept' },
    method: 'post',
    path: 'https://other.example/x',
    body: { injected: true },
    defaultBaseURL: 'https://other.example',
  } as unknown as { headers: Record<string, string> };
  const response = await client.responses.retrieve('resp-1', params);
  assert.equal(response.id, 'resp-1');
});

it('rejects routing fields in legacy fetch options', () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    maxRetries: 0,
    fetch: async (input) => {
      throw new Error(`unexpected request to ${String(input)}`);
    },
  });
  for (const fetchOptions of [{ method: 'DELETE' }, { headers: {} }, { body: 'x' }]) {
    const params = { fetchOptions } as unknown as { headers: Record<string, string> };
    assert.throws(() => client.responses.retrieve('resp-1', params), TypeError);
  }
});

it('keeps the stream flag and cursor from typed reconnect parameters', async () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      const url = new URL(new Request(input, init).url);
      assert.deepEqual(Object.fromEntries(url.searchParams), { starting_after: '3', stream: 'true' });
      return new Response(`data: ${JSON.stringify(event)}\n\n`, {
        headers: { 'content-type': 'text/event-stream' },
      });
    },
  });
  const params = { stream: true, starting_after: 3, query: { stream: false, starting_after: 9 } } as {
    stream: true;
    starting_after: number;
  };
  const stream = await client.responses.retrieve('resp-1', params);
  assert.ok(stream instanceof Stream);
});

it('drops stream cursor values from a legacy query', async () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      const url = new URL(new Request(input, init).url);
      assert.deepEqual(Object.fromEntries(url.searchParams), { custom: 'kept' });
      return Response.json({
        id: 'resp-1',
        object: 'response',
        created_at: 0,
        model: 'openai/gpt-5.4',
        status: 'completed',
        output: [],
      });
    },
  });
  const response = await client.responses.retrieve('resp-1', {
    query: { starting_after: 5, custom: 'kept' },
  });
  assert.equal(response.id, 'resp-1');
});

it('requires starting_after before resuming a stream', () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input) => {
      throw new Error(`unexpected request to ${String(input)}`);
    },
  });
  assert.throws(
    () => client.responses.retrieve('resp-1', { stream: true }),
    /stream: true requires starting_after/,
  );
});

it('copies allowlisted legacy fetch options and drops legacy stream query values', async () => {
  const dispatcher = { dispatch() {} };
  const fetchOptions = { cache: 'no-store' as const, dispatcher };
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    maxRetries: 0,
    fetch: async (input, init) => {
      assert.equal(init?.cache, 'no-store');
      assert.equal((init as RequestInit & { dispatcher?: unknown })?.dispatcher, dispatcher);
      const url = new URL(new Request(input, init).url);
      assert.deepEqual(Object.fromEntries(url.searchParams), {});
      return Response.json({
        id: 'resp-1',
        object: 'response',
        created_at: 0,
        model: 'openai/gpt-5.4',
        status: 'completed',
        output: [],
      });
    },
  });
  const response = await client.responses.retrieve('resp-1', {
    fetchOptions,
    query: { starting_after: 5, stream: true },
  });
  assert.equal(response.id, 'resp-1');
});

it('rejects legacy stream options even with a cursor in the legacy query', () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input) => {
      throw new Error(`unexpected request to ${String(input)}`);
    },
  });
  assert.throws(
    () => client.responses.retrieve('resp-1', { stream: true, timeout: 1000 }),
    /stream: true requires starting_after/,
  );
  assert.throws(
    () => client.responses.retrieve('resp-1', { stream: true, query: { starting_after: 3 } }),
    /stream: true requires starting_after/,
  );
});

it('rejects invalid stream cursors before sending a request', () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input) => {
      throw new Error(`unexpected request to ${String(input)}`);
    },
  });
  for (const starting_after of [-1, 1.5, Number.NaN]) {
    assert.throws(
      () => client.responses.retrieve('resp-1', { stream: true, starting_after }),
      /starting_after must be a non-negative integer/,
    );
  }
});

it('rejects non-boolean stream flags before sending a request', () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input) => {
      throw new Error(`unexpected request to ${String(input)}`);
    },
  });
  const params = { stream: 'true', starting_after: 1 } as unknown as {
    stream: true;
    starting_after: number;
  };
  assert.throws(() => client.responses.retrieve('resp-1', params), TypeError);
});
