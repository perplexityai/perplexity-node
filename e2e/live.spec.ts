import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';
// oxlint-disable-next-line no-restricted-imports -- Verify packaged public entrypoint.
import { Perplexity as Candidate } from '@perplexity-ai/perplexity_ai';
import { Perplexity as Published } from 'published-sdk';

interface CompletionResponse {
  choices: Array<{
    index: number;
    message: {
      content: string;
      role: string;
    };
    [key: string]: unknown;
  }>;
  id: string;
  model: string;
  [key: string]: unknown;
}

interface SearchResponse {
  id: string;
  results: Array<{
    snippet: string;
    title: string;
    url: string;
  }>;
  [key: string]: unknown;
}

function completionContract(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const completion = response as CompletionResponse;

  assert.equal(typeof completion.id, 'string');
  assert.equal(typeof completion.model, 'string');
  assert.ok(Array.isArray(completion.choices));
  assert.ok(completion.choices.length > 0);

  const choice = completion.choices[0];
  assert.ok(choice);
  assert.equal(typeof choice.index, 'number');
  assert.equal(typeof choice.message?.content, 'string');
  assert.equal(choice.message?.role, 'assistant');

  return {
    choiceKeys: Object.keys(choice).sort(),
    messageKeys: Object.keys(choice.message).sort(),
    responseKeys: Object.keys(completion).sort(),
  };
}

function searchContract(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const search = response as SearchResponse;
  assert.equal(typeof search.id, 'string');
  assert.ok(Array.isArray(search.results));
  assert.ok(search.results.length > 0);

  const result = search.results[0];
  assert.ok(result);
  assert.equal(typeof result.title, 'string');
  assert.equal(typeof result.url, 'string');
  assert.equal(typeof result.snippet, 'string');

  return {
    responseKeys: Object.keys(search).sort(),
    resultFields: {
      snippet: typeof result.snippet,
      title: typeof result.title,
      url: typeof result.url,
    },
  };
}

function embeddingContract(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const embeddings = response as {
    data?: Array<{ embedding?: string; index?: number }>;
    model?: string;
    object?: string;
  };
  assert.equal(typeof embeddings.model, 'string');
  assert.ok(Array.isArray(embeddings.data));
  assert.ok(embeddings.data.length > 0);

  const embedding = embeddings.data[0];
  assert.ok(embedding);
  assert.equal(typeof embedding.index, 'number');
  assert.equal(typeof embedding.embedding, 'string');

  return {
    embeddingFields: Object.keys(embedding).sort(),
    responseKeys: Object.keys(embeddings).sort(),
  };
}

function contextualizedEmbeddingContract(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const embeddings = response as {
    data?: Array<{ data?: Array<{ embedding?: string; index?: number }>; index?: number }>;
    model?: string;
  };
  assert.equal(typeof embeddings.model, 'string');
  assert.ok(Array.isArray(embeddings.data));
  assert.ok(embeddings.data.length > 0);

  const document = embeddings.data[0];
  assert.ok(document);
  assert.ok(Array.isArray(document.data));
  assert.ok(document.data.length > 0);

  const embedding = document.data[0];
  assert.ok(embedding);
  assert.equal(typeof embedding.embedding, 'string');

  return {
    documentFields: Object.keys(document).sort(),
    embeddingFields: Object.keys(embedding).sort(),
    responseKeys: Object.keys(embeddings).sort(),
  };
}

function responseContract(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const result = response as {
    id?: string;
    object?: string;
    output?: Array<{ type?: string }>;
    status?: string;
    [key: string]: unknown;
  };
  assert.equal(typeof result.id, 'string');
  assert.equal(result.object, 'response');
  assert.ok(Array.isArray(result.output));
  assert.ok(result.output.length > 0);
  assert.equal(typeof result.status, 'string');

  return {
    outputTypes: [...new Set(result.output.map((item) => item.type))].sort(),
    responseKeys: Object.keys(result).sort(),
  };
}

function streamingCompletionContract(chunks: unknown[]) {
  assert.ok(chunks.length > 0);
  const chunk = chunks.find((item) => {
    if (typeof item !== 'object' || item === null) {
      return false;
    }
    return Array.isArray((item as { choices?: unknown }).choices);
  }) as { choices: Array<{ delta?: unknown; index?: unknown }>; [key: string]: unknown } | undefined;
  assert.ok(chunk);
  assert.ok(chunk.choices.length > 0);

  const choice = chunk.choices[0];
  assert.ok(choice);
  assert.equal(typeof choice.index, 'number');
  assert.ok(typeof choice.delta === 'object' && choice.delta !== null);

  return {
    choiceKeys: Object.keys(choice).sort(),
    chunkKeys: Object.keys(chunk).sort(),
    deltaKeys: Object.keys(choice.delta).sort(),
  };
}

function streamingResponseContract(events: unknown[]) {
  assert.ok(events.length > 0);
  const types = events.map((event) => {
    assert.ok(typeof event === 'object' && event !== null);
    const type = (event as { type?: unknown }).type;
    assert.equal(typeof type, 'string');
    return type;
  });

  assert.ok(types.includes('response.created'));
  assert.ok(types.includes('response.completed'));
  assert.ok(types.includes('response.output_text.delta'));

  return {
    hasCompleted: types.includes('response.completed'),
    hasCreated: types.includes('response.created'),
    hasTextDelta: types.includes('response.output_text.delta'),
  };
}

function asyncCompletionContract(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const completion = response as {
    created_at?: unknown;
    id?: unknown;
    model?: unknown;
    status?: unknown;
  };
  assert.equal(typeof completion.created_at, 'number');
  assert.equal(typeof completion.id, 'string');
  assert.equal(typeof completion.model, 'string');
  assert.equal(typeof completion.status, 'string');

  return {
    createdAt: typeof completion.created_at,
    id: typeof completion.id,
    model: typeof completion.model,
    status: typeof completion.status,
  };
}

function asyncCompletionID(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const id = (response as { id?: unknown }).id;
  assert.equal(typeof id, 'string');
  return id;
}

function asyncCompletionStatus(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const status = (response as { status?: unknown }).status;
  assert.equal(typeof status, 'string');
  return status;
}

async function pollAsyncCompletion(initial: unknown, retrieve: (id: string) => PromiseLike<unknown>) {
  const id = asyncCompletionID(initial);
  let completion = initial;

  for (let attempt = 0; attempt < 120; attempt += 1) {
    const status = asyncCompletionStatus(completion);
    if (status === 'COMPLETED') {
      return completion;
    }
    assert.notEqual(status, 'FAILED');
    await delay(1_000);
    completion = await retrieve(id);
  }

  assert.fail(`Async completion ${id} did not finish`);
}

async function collect(stream: AsyncIterable<unknown>) {
  const chunks: unknown[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return chunks;
}

async function expectMatchingContracts(
  candidateCall: () => PromiseLike<unknown>,
  publishedCall: () => PromiseLike<unknown>,
  contract: (response: unknown) => unknown,
) {
  const [candidateResponse, publishedResponse] = await Promise.all([candidateCall(), publishedCall()]);
  assert.deepStrictEqual(contract(candidateResponse), contract(publishedResponse));
}

function createClients() {
  const apiKey = process.env['PPLX_API_TOKEN'];
  assert.ok(apiKey, 'PPLX_API_TOKEN must be set');
  return {
    candidate: new Candidate({ apiKey, maxRetries: 0 }),
    published: new Published({ apiKey, maxRetries: 0 }),
  };
}

const liveTestShard = process.env['LIVE_TEST_SHARD'];
const runsShard = (shard: string) => !liveTestShard || liveTestShard === shard;

if (runsShard('fast')) {
  describe('live API parity: fast APIs', () => {
    it('matches published chat completion response contract', async () => {
      const { candidate, published } = createClients();
      const request = {
        max_tokens: 16,
        messages: [{ content: 'Reply with only the word pong.', role: 'user' as const }],
        model: 'sonar',
        temperature: 0,
      };

      await expectMatchingContracts(
        () => candidate.chat.completions.create(request),
        () => published.chat.completions.create(request),
        completionContract,
      );
    });

    it('matches published streaming chat contract', async () => {
      const { candidate, published } = createClients();
      const request = {
        max_tokens: 16,
        messages: [{ content: 'Reply with only the word pong.', role: 'user' as const }],
        model: 'sonar',
        stream: true as const,
        temperature: 0,
      };

      await expectMatchingContracts(
        async () => collect(await candidate.chat.completions.create(request)),
        async () => collect(await published.chat.completions.create(request)),
        (chunks) => {
          assert.ok(Array.isArray(chunks));
          return streamingCompletionContract(chunks);
        },
      );
    });

    it('matches published search response contract', async () => {
      const { candidate, published } = createClients();
      const request = {
        max_results: 1,
        query: 'Perplexity AI',
      };

      await expectMatchingContracts(
        () => candidate.search.create(request),
        () => published.search.create(request),
        searchContract,
      );
    });

    it('matches published embeddings response contract', async () => {
      const { candidate, published } = createClients();
      const request = {
        dimensions: 128,
        input: 'Perplexity answers questions.',
        model: 'pplx-embed-v1-0.6b' as const,
      };

      await expectMatchingContracts(
        () => candidate.embeddings.create(request),
        () => published.embeddings.create(request),
        embeddingContract,
      );
    });

    it('matches published contextualized embeddings response contract', async () => {
      const { candidate, published } = createClients();
      const request = {
        dimensions: 128,
        input: [['Perplexity answers questions.', 'Its answers include citations.']],
        model: 'pplx-embed-context-v1-0.6b' as const,
      };

      await expectMatchingContracts(
        () => candidate.contextualizedEmbeddings.create(request),
        () => published.contextualizedEmbeddings.create(request),
        contextualizedEmbeddingContract,
      );
    });
  });
}

if (runsShard('responses')) {
  describe('live API parity: Responses API', () => {
    it('matches published responses API contract', async () => {
      const { candidate, published } = createClients();
      const request = {
        input: 'Reply with only the word pong.',
        max_output_tokens: 16,
        preset: 'pro-search',
      };

      await expectMatchingContracts(
        () => candidate.responses.create(request),
        () => published.responses.create(request),
        responseContract,
      );
    });
  });
}

if (runsShard('streaming-responses')) {
  describe('live API parity: streaming Responses API', () => {
    it('matches published streaming responses API contract', async () => {
      const { candidate, published } = createClients();
      const request = {
        input: 'Reply with only the word pong.',
        max_output_tokens: 16,
        preset: 'pro-search',
        stream: true as const,
      };

      await expectMatchingContracts(
        async () => collect(await candidate.responses.create(request)),
        async () => collect(await published.responses.create(request)),
        (events) => {
          assert.ok(Array.isArray(events));
          return streamingResponseContract(events);
        },
      );
    });
  });
}

if (runsShard('async')) {
  describe('live API parity: async API', () => {
    it('matches published async chat completion lifecycle', { timeout: 180_000 }, async () => {
      const { candidate, published } = createClients();
      const request = {
        request: {
          max_tokens: 16,
          messages: [{ content: 'Reply with only the word pong.', role: 'user' as const }],
          model: 'sonar-deep-research',
        },
      };
      const [candidateInitial, publishedInitial] = await Promise.all([
        candidate.async.chat.completions.create(request),
        published.async.chat.completions.create(request),
      ]);
      assert.deepStrictEqual(
        asyncCompletionContract(candidateInitial),
        asyncCompletionContract(publishedInitial),
      );

      const [candidateCompleted, publishedCompleted] = await Promise.all([
        pollAsyncCompletion(candidateInitial, (id) => candidate.async.chat.completions.get(id)),
        pollAsyncCompletion(publishedInitial, (id) => published.async.chat.completions.get(id)),
      ]);
      assert.deepStrictEqual(
        asyncCompletionContract(candidateCompleted),
        asyncCompletionContract(publishedCompleted),
      );
    });
  });
}
