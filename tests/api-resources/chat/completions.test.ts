// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.chat.completions.create({
      messages: [{ content: 'string', role: 'system' }],
      model: 'model',
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
    const response = await client.chat.completions.create({
      messages: [
        {
          content: 'string',
          role: 'system',
          reasoning_steps: [
            {
              thought: 'thought',
              execute_python: { code: 'code', result: 'result' },
              fetch_url_content: {
                contents: [
                  {
                    title: 'title',
                    url: 'url',
                    date: 'date',
                    last_updated: 'last_updated',
                    snippet: 'snippet',
                    source: 'web',
                  },
                ],
              },
              type: 'type',
              web_search: {
                search_keywords: ['string'],
                search_results: [
                  {
                    title: 'title',
                    url: 'url',
                    date: 'date',
                    last_updated: 'last_updated',
                    snippet: 'snippet',
                    source: 'web',
                  },
                ],
              },
            },
          ],
          tool_call_id: 'tool_call_id',
          tool_calls: [{ id: 'id', function: { arguments: 'arguments', name: 'name' }, type: 'function' }],
        },
      ],
      model: 'model',
      _debug_pro_search: true,
      _force_new_agent: true,
      _inputs: [0],
      _prompt_token_length: 0,
      best_of: 0,
      country: 'country',
      cum_logprobs: true,
      disable_search: true,
      diverse_first_token: true,
      enable_search_classifier: true,
      file_workspace_id: 'file_workspace_id',
      frequency_penalty: -2,
      has_image_url: true,
      image_domain_filter: ['string'],
      image_format_filter: ['string'],
      language_preference: 'language_preference',
      last_updated_after_filter: 'last_updated_after_filter',
      last_updated_before_filter: 'last_updated_before_filter',
      latitude: 0,
      logprobs: true,
      longitude: 0,
      max_tokens: 1,
      n: 1,
      num_images: 0,
      num_search_results: 0,
      parallel_tool_calls: true,
      presence_penalty: -2,
      ranking_model: 'ranking_model',
      reasoning_effort: 'minimal',
      response_format: { type: 'text' },
      response_metadata: { foo: 'bar' },
      return_images: true,
      return_related_questions: true,
      safe_search: true,
      search_after_date_filter: 'search_after_date_filter',
      search_before_date_filter: 'search_before_date_filter',
      search_domain_filter: ['string'],
      search_internal_properties: { foo: 'bar' },
      search_language_filter: ['string'],
      search_mode: 'web',
      search_recency_filter: 'hour',
      search_tenant: 'search_tenant',
      stop: 'string',
      stream: false,
      stream_mode: 'full',
      temperature: 0,
      thread_id: 'thread_id',
      tool_choice: 'none',
      tools: [
        {
          function: {
            description: 'description',
            name: 'name',
            parameters: {
              properties: { foo: 'bar' },
              type: 'type',
              additional_properties: true,
              required: ['string'],
            },
            strict: true,
          },
          type: 'function',
        },
      ],
      top_k: 0,
      top_logprobs: 0,
      top_p: 0,
      updated_after_timestamp: 0,
      updated_before_timestamp: 0,
      use_threads: true,
      user_original_query: 'user_original_query',
      web_search_options: {
        image_results_enhanced_relevance: true,
        search_context_size: 'low',
        search_type: 'fast',
        user_location: { city: 'city', country: 'country', latitude: 0, longitude: 0, region: 'region' },
      },
    });
  });
});
