import { APIResource } from '../../../core/resource.js';
import * as CompletionsAPI from './completions.js';
import {
  CompletionCreateParams,
  CompletionCreateResponse,
  CompletionGetParams,
  CompletionGetResponse,
  CompletionListResponse,
  Completions,
} from './completions.js';

export class Chat extends APIResource {
  completions: CompletionsAPI.Completions = new CompletionsAPI.Completions(this._client);
}

Chat.Completions = Completions;

export declare namespace Chat {
  export {
    Completions as Completions,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionListResponse as CompletionListResponse,
    type CompletionGetResponse as CompletionGetResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionGetParams as CompletionGetParams,
  };
}
