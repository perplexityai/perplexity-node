import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import Perplexity from '../../../index.js';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sessions', () => {
  // Mock server tests are disabled
  it.skip('create', async () => {
    const responsePromise = client.browser.sessions.create();
    const rawResponse = await responsePromise.asResponse();
    assert.ok(rawResponse instanceof Response);
    const response = await responsePromise;
    assert.ok(!(Object(response) instanceof Response));
    const dataAndResponse = await responsePromise.withResponse();
    assert.strictEqual(dataAndResponse.data, response);
    assert.strictEqual(dataAndResponse.response, rawResponse);
  });

  // Mock server tests are disabled
  it.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await assert.rejects(
      client.browser.sessions.create({}, { path: '/_unknown_path' }),
      Perplexity.NotFoundError,
    );
  });

  // Mock server tests are disabled
  it.skip('delete', async () => {
    const responsePromise = client.browser.sessions.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    assert.ok(rawResponse instanceof Response);
    const response = await responsePromise;
    assert.ok(!((response as unknown as object) instanceof Response));
    const dataAndResponse = await responsePromise.withResponse();
    assert.strictEqual(dataAndResponse.data, response);
    assert.strictEqual(dataAndResponse.response, rawResponse);
  });
});
