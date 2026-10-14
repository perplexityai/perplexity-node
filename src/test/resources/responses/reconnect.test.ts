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
