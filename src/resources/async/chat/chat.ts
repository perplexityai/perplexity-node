import { Async } from '../../../generated/api.js';

export const Chat = Async.Chat;
export type Chat = InstanceType<typeof Chat>;

export namespace Chat {
  export type Completions = InstanceType<typeof Async.Chat.Completions>;
  export type CompletionCreateResponse = Async.Chat.CompletionCreateResponse;
  export type CompletionListResponse = Async.Chat.CompletionListResponse;
  export type CompletionGetResponse = Async.Chat.CompletionGetResponse;
  export type CompletionCreateParams = Async.Chat.CompletionCreateParams;
  export type CompletionGetParams = Async.Chat.CompletionGetParams;
}
