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
              type: 'web_search',
              agent_progress: { action: 'action', screenshot: 'screenshot', url: 'url' },
              browser_agent: { result: 'result', url: 'url' },
              browser_tool_execution: { tool: { foo: 'bar' } },
              execute_python: { code: 'code', result: 'result' },
              fetch_url_content: {
                contents: [
                  {
                    title: 'title',
                    url: 'url',
                    date: 'date',
                    last_updated: 'last_updated',
                    snippet: 'snippet',
                  },
                ],
              },
              file_attachment_search: { attachment_urls: ['string'] },
              web_search: {
                search_keywords: ['string'],
                search_results: [
                  {
                    title: 'title',
                    url: 'url',
                    date: 'date',
                    last_updated: 'last_updated',
                    snippet: 'snippet',
                  },
                ],
              },
            },
          ],
          tool_calls: [{ id: 'id', function: { arguments: 'arguments', name: 'name' }, type: 'function' }],
        },
      ],
      model: 'model',
      _debug_pro_search: true,
      _inputs: [0],
      _is_browser_agent: true,
      _prompt_token_length: 0,
      best_of: 0,
      country: 'country',
      cum_logprobs: true,
      debug_params: {
        summarizer_model_override: 'summarizer_model_override',
        summarizer_prompt_override: 'summarizer_prompt_override',
      },
      disable_search: true,
      diverse_first_token: true,
      enable_search_classifier: true,
      file_workspace_id: 'file_workspace_id',
      frequency_penalty: -2,
      has_image_url: true,
      image_domain_filter: ['string'],
      image_format_filter: ['string'],
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
      search_mode: 'web',
      search_recency_filter: 'hour',
      search_tenant: 'search_tenant',
      stop: 'string',
      stream: true,
      temperature: 0,
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
      web_search_options: {
        image_results_enhanced_relevance: true,
        search_context_size: 'low',
        search_type: 'fast',
        user_location: { city: 'city', country: 'country', latitude: 0, longitude: 0, region: 'region' },
      },
    });
  });
});
