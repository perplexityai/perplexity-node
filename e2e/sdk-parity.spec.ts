import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import type { IncomingHttpHeaders, OutgoingHttpHeaders } from 'node:http';
import { after, before, describe, it } from 'node:test';
// oxlint-disable-next-line no-restricted-imports -- Verify packaged public entrypoint.
import { Perplexity as Candidate } from '@perplexity-ai/perplexity_ai';
import { Perplexity as Published } from 'published-sdk';

type Operation = (...args: unknown[]) => unknown;

interface SdkClient {
  async: { chat: { completions: { create: Operation; get: Operation; list: Operation } } };
  browser: { sessions: { create: Operation; delete: Operation } };
  chat: { completions: { create: Operation } };
  contextualizedEmbeddings: { create: Operation };
  embeddings: { create: Operation };
  responses: {
    cancel: Operation;
    create: Operation;
    files: { content: Operation; list: Operation };
    retrieve: Operation;
  };
  search: { create: Operation };
}

interface MockResponse {
  body: string;
  headers: OutgoingHttpHeaders;
  status: number;
}

interface CapturedRequest {
  body: string;
  headers: IncomingHttpHeaders;
  method: string | undefined;
  url: string | undefined;
}

interface TestCase {
  expectedCandidateOutput?: unknown;
  expectedOutput?: unknown;
  expectedRequest: {
    authorization: string;
    body: unknown;
    method: string;
    path: string;
  };
  invoke: (client: SdkClient) => unknown;
  name: string;
  response: MockResponse;
}

type ClientConstructor = new (options: { apiKey: string; baseURL: string; maxRetries: number }) => unknown;

const jsonHeaders = { 'content-type': 'application/json' };
const chatResponse = {
  choices: [
    {
      finish_reason: 'stop',
      index: 0,
      message: { content: 'pong', role: 'assistant' },
    },
  ],
  created: 1,
  id: 'chatcmpl_test',
  model: 'sonar',
  usage: { completion_tokens: 1, prompt_tokens: 1, total_tokens: 2 },
};
const responsesResponse = {
  created_at: 1,
  id: 'resp_test',
  model: 'sonar',
  object: 'response',
  output: [
    {
      content: [{ annotations: [], text: 'pong', type: 'output_text' }],
      id: 'msg_test',
      role: 'assistant',
      status: 'completed',
      type: 'message',
    },
  ],
  status: 'completed',
};
const asyncResponse = {
  created_at: 1,
  id: 'async_test',
  model: 'sonar',
  status: 'COMPLETED',
};
const responseStreamEvent = {
  content_index: 0,
  delta: 'pong',
  item_id: 'msg_test',
  output_index: 0,
  sequence_number: 1,
  type: 'response.output_text.delta',
};

function jsonResponse(body: unknown, status = 200): MockResponse {
  return { body: JSON.stringify(body), headers: jsonHeaders, status };
}

function sseResponse(events: unknown[]): MockResponse {
  return {
    body: `${events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join('')}data: [DONE]\n\n`,
    headers: { 'content-type': 'text/event-stream' },
    status: 200,
  };
}

function normalizeRequest(request: CapturedRequest) {
  assert.ok(request.url);
  const url = new URL(request.url, 'http://localhost');
  url.searchParams.sort();

  return {
    authorization: request.headers.authorization,
    body: request.body === '' ? undefined : JSON.parse(request.body),
    method: request.method,
    path: `${url.pathname}${url.search}`,
  };
}

async function collect(stream: AsyncIterable<unknown>) {
  const chunks: unknown[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return chunks;
}

let pendingResponse: MockResponse | undefined;
let capturedRequest: CapturedRequest | undefined;
const server = createServer((request, response) => {
  const chunks: Buffer[] = [];
  request.on('data', (chunk) => chunks.push(chunk));
  request.on('end', () => {
    capturedRequest = {
      body: Buffer.concat(chunks).toString(),
      headers: request.headers,
      method: request.method,
      url: request.url,
    };

    assert.ok(pendingResponse);
    response.writeHead(pendingResponse.status, pendingResponse.headers);
    response.end(pendingResponse.body);
  });
});

let baseURL: string;

const cases: TestCase[] = [
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: {
        messages: [{ content: 'ping', role: 'user' }],
        model: 'sonar',
      },
      method: 'POST',
      path: '/chat/completions',
    },
    invoke: (client) =>
      client.chat.completions.create({
        messages: [{ content: 'ping', role: 'user' }],
        model: 'sonar',
      }),
    name: 'chat completion',
    response: jsonResponse(chatResponse),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: {
        messages: [{ content: 'ping', role: 'user' }],
        model: 'sonar',
        stream: true,
      },
      method: 'POST',
      path: '/chat/completions',
    },
    invoke: async (client) =>
      collect(
        (await client.chat.completions.create({
          messages: [{ content: 'ping', role: 'user' }],
          model: 'sonar',
          stream: true,
        })) as AsyncIterable<unknown>,
      ),
    name: 'streaming chat completion',
    response: sseResponse([chatResponse]),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: { max_results: 1, query: 'Perplexity SDK' },
      method: 'POST',
      path: '/search',
    },
    invoke: (client) => client.search.create({ max_results: 1, query: 'Perplexity SDK' }),
    name: 'search',
    response: jsonResponse({
      id: 'search_test',
      results: [{ snippet: 'SDK result', title: 'Perplexity', url: 'https://perplexity.ai' }],
    }),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: { dimensions: 128, input: 'ping', model: 'pplx-embed-v1-0.6b' },
      method: 'POST',
      path: '/v1/embeddings',
    },
    invoke: (client) =>
      client.embeddings.create({
        dimensions: 128,
        input: 'ping',
        model: 'pplx-embed-v1-0.6b',
      }),
    name: 'embeddings',
    response: jsonResponse({
      data: [{ embedding: 'AA==', index: 0, object: 'embedding' }],
      model: 'pplx-embed-v1-0.6b',
      object: 'list',
      usage: { prompt_tokens: 1, total_tokens: 1 },
    }),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: {
        dimensions: 128,
        input: [['first chunk', 'second chunk']],
        model: 'pplx-embed-context-v1-0.6b',
      },
      method: 'POST',
      path: '/v1/contextualizedembeddings',
    },
    invoke: (client) =>
      client.contextualizedEmbeddings.create({
        dimensions: 128,
        input: [['first chunk', 'second chunk']],
        model: 'pplx-embed-context-v1-0.6b',
      }),
    name: 'contextualized embeddings',
    response: jsonResponse({
      data: [
        {
          data: [
            { embedding: 'AA==', index: 0, object: 'embedding' },
            { embedding: 'AQ==', index: 1, object: 'embedding' },
          ],
          index: 0,
          object: 'contextualized_embedding',
        },
      ],
      model: 'pplx-embed-context-v1-0.6b',
      object: 'list',
      usage: { prompt_tokens: 2, total_tokens: 2 },
    }),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: { input: 'ping', model: 'sonar' },
      method: 'POST',
      path: '/v1/responses',
    },
    expectedOutput: { ...responsesResponse, output_text: 'pong' },
    invoke: (client) => client.responses.create({ input: 'ping', model: 'sonar' }),
    name: 'response creation',
    response: jsonResponse(responsesResponse),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: { input: 'ping', model: 'sonar', stream: true },
      method: 'POST',
      path: '/v1/responses',
    },
    invoke: async (client) =>
      collect(
        (await client.responses.create({
          input: 'ping',
          model: 'sonar',
          stream: true,
        })) as AsyncIterable<unknown>,
      ),
    name: 'streaming response creation',
    response: sseResponse([responseStreamEvent]),
  },
  {
    expectedCandidateOutput: {
      ...responsesResponse,
      output_text: 'pong',
    },
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: undefined,
      method: 'GET',
      path: '/v1/responses/resp_test',
    },
    expectedOutput: responsesResponse,
    invoke: (client) => client.responses.retrieve('resp_test'),
    name: 'response retrieval',
    response: jsonResponse(responsesResponse),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: undefined,
      method: 'POST',
      path: '/v1/responses/resp_test/cancel',
    },
    invoke: (client) => client.responses.cancel('resp_test'),
    name: 'response cancellation',
    response: jsonResponse({ response_id: 'resp_test', status: 'cancelling' }),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: undefined,
      method: 'GET',
      path: '/v1/responses/resp_test/files',
    },
    invoke: (client) => client.responses.files.list('resp_test'),
    name: 'response file listing',
    response: jsonResponse({
      data: [{ file_id: 'file_test', filename: 'result.txt', size_bytes: 4 }],
      object: 'list',
    }),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: undefined,
      method: 'GET',
      path: '/v1/responses/resp_test/files/file_test/content',
    },
    invoke: async (client) => {
      const response = (await client.responses.files.content('file_test', {
        response_id: 'resp_test',
      })) as Response;
      return {
        contentDisposition: response.headers.get('content-disposition'),
        text: await response.text(),
      };
    },
    name: 'response file content',
    response: {
      body: 'pong',
      headers: {
        'content-disposition': 'attachment; filename="result.txt"',
        'content-type': 'application/octet-stream',
      },
      status: 200,
    },
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: {},
      method: 'POST',
      path: '/v1/browser/sessions',
    },
    invoke: (client) => client.browser.sessions.create({}),
    name: 'browser session creation',
    response: jsonResponse({ session_id: 'session_test', status: 'running' }),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: undefined,
      method: 'DELETE',
      path: '/v1/browser/sessions/session_test',
    },
    invoke: (client) => client.browser.sessions.delete('session_test'),
    name: 'browser session deletion',
    response: { body: '', headers: {}, status: 204 },
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: {
        idempotency_key: 'key_test',
        request: {
          messages: [{ content: 'ping', role: 'user' }],
          model: 'sonar',
        },
      },
      method: 'POST',
      path: '/async/chat/completions',
    },
    invoke: (client) =>
      client.async.chat.completions.create({
        idempotency_key: 'key_test',
        request: {
          messages: [{ content: 'ping', role: 'user' }],
          model: 'sonar',
        },
      }),
    name: 'async chat completion creation',
    response: jsonResponse(asyncResponse),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: undefined,
      method: 'GET',
      path: '/async/chat/completions',
    },
    invoke: (client) => client.async.chat.completions.list(),
    name: 'async chat completion listing',
    response: jsonResponse({ requests: [asyncResponse] }),
  },
  {
    expectedRequest: {
      authorization: 'Bearer parity-token',
      body: undefined,
      method: 'GET',
      path: '/async/chat/completions/async_test?local_mode=true',
    },
    invoke: (client) => client.async.chat.completions.get('async_test', { local_mode: true }),
    name: 'async chat completion retrieval',
    response: jsonResponse(asyncResponse),
  },
];

const clients: Array<[string, ClientConstructor]> = [
  ['candidate', Candidate],
  ['published', Published],
];

describe('published SDK parity', { concurrency: false }, () => {
  before(async () => {
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    assert.ok(typeof address !== 'string' && address !== null);
    baseURL = `http://127.0.0.1:${address.port}`;
  });

  after(
    () =>
      new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))),
  );

  for (const testCase of cases) {
    it(testCase.name, async () => {
      const results: Array<{ output: unknown; request: ReturnType<typeof normalizeRequest> }> = [];
      for (const [sdkName, Client] of clients) {
        pendingResponse = testCase.response;
        capturedRequest = undefined;
        const client = new Client({
          apiKey: 'parity-token',
          baseURL,
          maxRetries: 0,
        }) as SdkClient;
        const output = await testCase.invoke(client);
        assert.ok(capturedRequest, `${sdkName} sent no request`);
        results.push({ output, request: normalizeRequest(capturedRequest) });
      }

      const candidate = results[0];
      const published = results[1];
      assert.ok(candidate);
      assert.ok(published);
      assert.deepStrictEqual(candidate.request, testCase.expectedRequest, 'candidate request changed');
      assert.deepStrictEqual(published.request, testCase.expectedRequest, 'published request changed');
      assert.deepStrictEqual(
        candidate.output,
        testCase.expectedCandidateOutput ?? testCase.expectedOutput ?? published.output,
        'candidate output changed',
      );
      assert.deepStrictEqual(
        published.output,
        testCase.expectedOutput ?? candidate.output,
        'published output changed',
      );
    });
  }
});
