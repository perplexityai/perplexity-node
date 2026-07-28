// oxlint-disable no-restricted-imports -- Verify packaged public entrypoints.
import Perplexity, { APIError, type ClientOptions } from '@perplexity-ai/perplexity_ai';
import type { CompletionCreateParamsBase } from '@perplexity-ai/perplexity_ai/resources/chat/completions.mjs';
import type { ResponseCreateParamsBase } from '@perplexity-ai/perplexity_ai/resources/responses/responses.mjs';

const options: ClientOptions = {
  apiKey: 'test-key',
  fetchOptions: { agent: {}, dispatcher: {} },
};
const client = new Perplexity(options);
const completion: CompletionCreateParamsBase = {
  messages: [{ content: 'Hello', role: 'user' }],
  model: 'sonar',
};
const response: ResponseCreateParamsBase = { input: 'Hello' };

void client.chat.completions.create(completion);
void client.responses.create(response);
void APIError;
