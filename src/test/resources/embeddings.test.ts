import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import Perplexity from '../../index.js';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource embeddings', () => {
  // Mock server tests are disabled
  it.skip('create: only required params', async () => {
    const responsePromise = client.embeddings.create({ input: 'x', model: 'pplx-embed-v1-0.6b' });
    const rawResponse = await responsePromise.asResponse();
    assert.ok(rawResponse instanceof Response);
    const response = await responsePromise;
    assert.ok(!(response instanceof Response));
    const dataAndResponse = await responsePromise.withResponse();
    assert.strictEqual(dataAndResponse.data, response);
    assert.strictEqual(dataAndResponse.response, rawResponse);
  });

  // Mock server tests are disabled
  it.skip('create: required and optional params', async () => {
    const _response = await client.embeddings.create({
      input: 'x',
      model: 'pplx-embed-v1-0.6b',
      dimensions: 128,
      encoding_format: 'base64_int8',
    });
  });
});
