// oxlint-disable no-restricted-imports -- Verify packaged public entrypoints.
import Perplexity, { APIError, type ClientOptions } from '@perplexity-ai/perplexity_ai';
import type { Chat as AsyncChat } from '@perplexity-ai/perplexity_ai/resources/async/chat/chat.mjs';
import type { Completions as AsyncCompletions } from '@perplexity-ai/perplexity_ai/resources/async/chat/completions.mjs';
import type { Sessions } from '@perplexity-ai/perplexity_ai/resources/browser/sessions.mjs';
import type { Completions } from '@perplexity-ai/perplexity_ai/resources/chat/completions.mjs';
import type { CompletionCreateParamsBase } from '@perplexity-ai/perplexity_ai/resources/chat/completions.mjs';
import type { Files } from '@perplexity-ai/perplexity_ai/resources/responses/files.mjs';
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

type LegacyNamespaceAliases = [
  AsyncChat.Completions,
  AsyncChat.CompletionCreateResponse,
  AsyncChat.CompletionListResponse,
  AsyncChat.CompletionGetResponse,
  AsyncChat.CompletionCreateParams,
  AsyncChat.CompletionGetParams,
  AsyncCompletions.CompletionCreateResponse,
  AsyncCompletions.CompletionListResponse,
  AsyncCompletions.CompletionGetResponse,
  AsyncCompletions.CompletionCreateParams,
  AsyncCompletions.CompletionGetParams,
  Sessions.SessionCreateParams,
  Completions.CompletionCreateParams,
  Completions.CompletionCreateParamsNonStreaming,
  Completions.CompletionCreateParamsStreaming,
  Files.FileContentParams,
];

void client.chat.completions.create(completion);
void client.responses.create(response);
void APIError;
void ({} as LegacyNamespaceAliases);
