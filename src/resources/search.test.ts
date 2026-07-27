import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import Perplexity from '../index.js';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // Mock server tests are disabled
  it.skip('create: only required params', async () => {
    const responsePromise = client.search.create({ query: 'string' });
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
    const _response = await client.search.create({
      query: 'string',
      country: 'country',
      display_server_time: true,
      last_updated_after_filter: 'last_updated_after_filter',
      last_updated_before_filter: 'last_updated_before_filter',
      max_results: 0,
      max_tokens: 0,
      max_tokens_per_page: 0,
      search_after_date_filter: 'search_after_date_filter',
      search_before_date_filter: 'search_before_date_filter',
      search_context_size: 'low',
      search_domain_filter: ['string'],
      search_language_filter: ['string'],
      search_mode: 'web',
      search_recency_filter: 'hour',
      search_type: 'web',
    });
  });
});
