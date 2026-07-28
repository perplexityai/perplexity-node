import * as API from '../../generated/api.js';
export import Chat = API.Chat;
export type CompletionCreateParams = API.Chat.CompletionCreateParams;
export type CompletionCreateParamsBase = Omit<CompletionCreateParams, 'stream'>;
export type CompletionCreateParamsNonStreaming = API.Chat.CompletionCreateParamsNonStreaming;
export type CompletionCreateParamsStreaming = API.Chat.CompletionCreateParamsStreaming;
export type StreamChunk = API.Chat.StreamChunk;
