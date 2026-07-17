// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource responses', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.responses.create({ input: 'string' });
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
    const response = await client.responses.create({
      input: 'string',
      background: true,
      instructions: 'instructions',
      language_preference: 'language_preference',
      max_output_tokens: 1,
      max_steps: 1,
      model: 'model',
      models: ['string'],
      preset: 'preset',
      previous_response_id: 'previous_response_id',
      reasoning: { effort: 'minimal' },
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'x',
          schema: { foo: 'bar' },
          description: 'description',
          strict: true,
        },
      },
      skills: [{ name: 'office', type: 'builtin' }],
      store: true,
      stream: false,
      tools: [
        {
          type: 'web_search',
          filters: {
            last_updated_after_filter: 'last_updated_after_filter',
            last_updated_before_filter: 'last_updated_before_filter',
            search_after_date_filter: 'search_after_date_filter',
            search_before_date_filter: 'search_before_date_filter',
            search_domain_filter: ['string'],
            search_recency_filter: 'hour',
          },
          max_tokens: 0,
          max_tokens_per_page: 0,
          search_context_size: 'low',
          user_location: {
            city: 'city',
            country: 'country',
            latitude: 0,
            longitude: 0,
            region: 'region',
          },
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.responses.retrieve('response_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('cancel', async () => {
    const responsePromise = client.responses.cancel('response_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
