// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource contextualizedEmbeddings', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.contextualizedEmbeddings.create({
      input: [['x']],
      model: 'pplx-embed-context-v1-0.6b',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.contextualizedEmbeddings.create({
      input: [['x']],
      model: 'pplx-embed-context-v1-0.6b',
      dimensions: 128,
      encoding_format: 'base64_int8',
    });
  });
});
