import assert from 'node:assert/strict';
import { it } from 'node:test';
import Perplexity from '../../../index.js';

it('sends cache controls and parses extraction usage', async () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      const request = new Request(input, init);
      assert.equal(request.url, 'https://example.test/v1/responses');
      assert.deepEqual(await request.json(), {
        input: [{ role: 'user', content: 'Summarize the file.' }],
        service_tier: 'priority',
        prompt_cache_key: 'doc-1',
      });
      return Response.json({
        id: 'resp-1',
        object: 'response',
        created_at: 0,
        model: 'openai/gpt-5.4',
        status: 'completed',
        output: [],
        service_tier: 'priority',
        prompt_cache_key: 'doc-1',
        usage: {
          input_tokens: 10,
          output_tokens: 2,
          total_tokens: 12,
          tool_calls_details: {
            fetch_url: {
              invocation: 1,
              cost_usd: 0.0025,
              token_usage: [
                {
                  model: 'extractor',
                  input_tokens: 100,
                  input_tokens_details: { cached_tokens: 40, cache_read_input_tokens: 40 },
                  output_tokens: 20,
                  output_tokens_details: { reasoning_tokens: 5 },
                },
              ],
            },
          },
        },
      });
    },
  });
  const response = await client.responses.create({
    input: [{ role: 'user', content: 'Summarize the file.' }],
    service_tier: 'priority',
    prompt_cache_key: 'doc-1',
  });
  assert.equal(response.service_tier, 'priority');
  assert.equal(response.prompt_cache_key, 'doc-1');
  const details = response.usage?.tool_calls_details?.['fetch_url'];
  assert.equal(details?.cost_usd, 0.0025);
  const usage = details?.token_usage?.[0];
  assert.equal(usage?.input_tokens_details.cache_read_input_tokens, 40);
  assert.equal(usage?.output_tokens_details.reasoning_tokens, 5);
});
