// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.async.chat.completions.create({
      request: { messages: [{ content: 'string', role: 'system' }], model: 'sonar' },
    });
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
    const response = await client.async.chat.completions.create({
      request: {
        messages: [{ content: 'string', role: 'system' }],
        model: 'sonar',
        disable_search: true,
        enable_search_classifier: true,
        last_updated_after_filter: 'last_updated_after_filter',
        last_updated_before_filter: 'last_updated_before_filter',
        reasoning_effort: 'low',
        return_images: true,
        return_related_questions: true,
        search_after_date_filter: 'search_after_date_filter',
        search_before_date_filter: 'search_before_date_filter',
        search_domain_filter: ['string'],
        search_mode: 'web',
        search_recency_filter: 'hour',
        web_search_options: {
          image_search_relevance_enhanced: true,
          search_context_size: 'low',
          user_location: { city: 'city', country: 'country', latitude: 0, longitude: 0, region: 'region' },
        },
      },
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.async.chat.completions.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.async.chat.completions.list(
        { limit: 0, next_token: 'next_token' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Perplexity.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.async.chat.completions.get('request_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
