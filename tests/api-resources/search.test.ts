// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Perplexity from 'perplexity_ai';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.search.create({ query: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.search.create({
      query: 'string',
      country: 'country',
      last_updated_after_filter: 'last_updated_after_filter',
      last_updated_before_filter: 'last_updated_before_filter',
      max_results: 0,
      max_tokens: 0,
      max_tokens_per_page: 0,
      safe_search: true,
      search_after_date_filter: 'search_after_date_filter',
      search_before_date_filter: 'search_before_date_filter',
      search_domain_filter: ['string'],
      search_mode: 'web',
      search_recency_filter: 'hour',
    });
  });
});
