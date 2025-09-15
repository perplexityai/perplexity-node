// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CompletionsAPI from './completions';
import {
  CompletionCreateParams,
  CompletionCreateResponse,
  CompletionGetParams,
  CompletionGetResponse,
  CompletionListResponse,
  Completions,
} from './completions';

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
