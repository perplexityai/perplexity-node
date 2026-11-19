import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import Perplexity from '../../index.js';
import type { EmbeddingCreateParams } from '../../resources/embeddings.js';

const usage = { prompt_tokens: 5, total_tokens: 5 };
const image = { type: 'image' as const, image: 'data:image/png;base64,AAAA' };

function denseResponse(model: string, count = 1) {
  return {
    object: 'list',
    model,
    data: Array.from({ length: count }, (_, index) => ({ object: 'embedding', index, embedding: 'AAE=' })),
    usage,
  };
}

function chunkedResponse(model: string, chunks: number[]) {
  return {
    object: 'list',
    model,
    data: chunks.map((count, index) => ({
      object: 'list',
      index,
      data: Array.from({ length: count }, (_, chunk) => ({
        object: 'embedding',
        index: chunk,
        embedding: 'AgM=',
      })),
    })),
    usage,
  };
}

function mockClient(body: unknown, sent: unknown[]) {
  return new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    maxRetries: 0,
    fetch: async (input, init) => {
      const request = new Request(input, init);
      assert.equal(request.method, 'POST');
      assert.equal(request.url, 'https://example.test/v1/embeddings');
      sent.push(await request.json());
      return Response.json(body);
    },
  });
}

describe('embeddings', () => {
  for (const model of ['pplx-embed-v1-0.6b', 'pplx-embed-v1-4b'] as const) {
    it(`sends ${model} requests unchanged`, async () => {
      const sent: unknown[] = [];
      const body: EmbeddingCreateParams = {
        model,
        input: ['first', 'second'],
        dimensions: 128,
        encoding_format: 'base64_binary',
      };
      const response = await mockClient(denseResponse(model, 2), sent).embeddings.create(body);

      assert.deepEqual(sent, [body]);
      assert.deepEqual(
        response.data?.map((item) => [item.index, item.embedding]),
        [
          [0, 'AAE='],
          [1, 'AAE='],
        ],
      );
    });
  }

  for (const model of ['pplx-embed-v2-context-9b', 'pplx-embed-v2-context-0.6b'] as const) {
    it(`embeds ${model} queries`, async () => {
      const sent: unknown[] = [];
      const body: EmbeddingCreateParams = {
        model,
        input_type: 'query',
        input: ['What is late interaction retrieval?'],
        dimensions: 1024,
      };
      const response = await mockClient(denseResponse(model), sent).embeddings.create(body);

      assert.deepEqual(sent, [body]);
      assert.equal(response.model, model);
      assert.equal(response.data?.[0]?.embedding, 'AAE=');
      assert.equal(response.data?.[0]?.data, undefined);
    });

    it(`returns one ${model} embedding per document chunk`, async () => {
      const sent: unknown[] = [];
      const body: EmbeddingCreateParams = {
        model,
        input_type: 'document',
        input: [['First chunk.', 'Second chunk.'], ['Another document.']],
      };
      const response = await mockClient(chunkedResponse(model, [2, 1]), sent).embeddings.create(body);

      assert.deepEqual(sent, [body]);
      assert.deepEqual(
        response.data?.map((document) => [document.index, document.data?.length]),
        [
          [0, 2],
          [1, 1],
        ],
      );
      assert.deepEqual(response.data?.[0]?.data?.[1], { object: 'embedding', index: 1, embedding: 'AgM=' });
    });
  }

  it('returns one v2 embedding per whole document', async () => {
    const sent: unknown[] = [];
    const body: EmbeddingCreateParams = {
      model: 'pplx-embed-v2-context-0.6b',
      input_type: 'document',
      input: ['First document.', 'Second document.'],
    };
    const response = await mockClient(denseResponse(body.model, 2), sent).embeddings.create(body);

    assert.deepEqual(sent, [body]);
    assert.deepEqual(
      response.data?.map((item) => [item.index, item.embedding, item.data]),
      [
        [0, 'AAE=', undefined],
        [1, 'AAE=', undefined],
      ],
    );
  });

  it('returns one v2 embedding per image without num_chunks', async () => {
    const sent: unknown[] = [];
    const body: EmbeddingCreateParams = {
      model: 'pplx-embed-v2-context-0.6b',
      input_type: 'document',
      input: [image],
    };
    const response = await mockClient(denseResponse(body.model), sent).embeddings.create(body);

    assert.deepEqual(sent, [body]);
    assert.equal(response.data?.[0]?.embedding, 'AAE=');
  });

  it('embeds v2 images with num_chunks', async () => {
    const sent: unknown[] = [];
    const body: EmbeddingCreateParams = {
      model: 'pplx-embed-v2-context-9b',
      input_type: 'document',
      input: [image],
      num_chunks: 4,
      encoding_format: 'base64_binary',
    };
    const response = await mockClient(chunkedResponse(body.model, [4]), sent).embeddings.create(body);

    assert.deepEqual(sent, [body]);
    assert.equal(response.data?.[0]?.data?.length, 4);
  });

  it('keeps contextualized v1 embeddings unchanged', async () => {
    const body = { model: 'pplx-embed-context-v1-0.6b' as const, input: [['Perplexity answers questions.']] };
    const client = new Perplexity({
      apiKey: 'test',
      baseURL: 'https://example.test',
      maxRetries: 0,
      fetch: async (input, init) => {
        const request = new Request(input, init);
        assert.equal(request.url, 'https://example.test/v1/contextualizedembeddings');
        assert.deepEqual(await request.json(), body);
        return Response.json({
          object: 'list',
          model: body.model,
          data: [{ object: 'list', index: 0, data: [{ object: 'embedding', index: 0, embedding: 'AAE=' }] }],
          usage,
        });
      },
    });
    const response = await client.contextualizedEmbeddings.create(body);

    assert.equal(response.data?.[0]?.data?.[0]?.embedding, 'AAE=');
  });
});
