// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as CompletionsAPI from './completions';
import {
  CompletionCreateParams,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  Completions,
} from './completions';

export class Chat extends APIResource {
  completions: CompletionsAPI.Completions = new CompletionsAPI.Completions(this._client);
}

export interface StreamChunk {
  id: string;

  choices: Array<Shared.Choice>;

  created: number;

  model: string;

  citations?: Array<string> | null;

  object?: string;

  search_results?: Array<Shared.APIPublicSearchResult> | null;

  status?: 'PENDING' | 'COMPLETED' | null;

  type?: 'message' | 'info' | 'end_of_stream' | null;

  usage?: Shared.UsageInfo | null;
}

Chat.Completions = Completions;

export declare namespace Chat {
  export { type StreamChunk as StreamChunk };

  export {
    Completions as Completions,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };
}
