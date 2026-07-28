import * as API from '../../generated/api.js';
export import Completions = API.Chat.Completions;
export type CompletionCreateParams = API.Chat.Completions.CompletionCreateParams;
export type CompletionCreateParamsBase = Omit<CompletionCreateParams, 'stream'>;
export type CompletionCreateParamsNonStreaming = API.Chat.Completions.CompletionCreateParamsNonStreaming;
export type CompletionCreateParamsStreaming = API.Chat.Completions.CompletionCreateParamsStreaming;
