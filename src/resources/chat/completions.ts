// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CompletionsAPI from './completions';
import * as Shared from '../shared';
import * as ChatAPI from './chat';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { RequestOptions } from '../../internal/request-options';

export class Completions extends APIResource {
  /**
   * Generate a chat completion response for the given conversation.
   */
  create(body: CompletionCreateParamsNonStreaming, options?: RequestOptions): APIPromise<ChatAPI.StreamChunk>;
  create(
    body: CompletionCreateParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<ChatAPI.StreamChunk>>;
  create(
    body: CompletionCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<ChatAPI.StreamChunk> | ChatAPI.StreamChunk>;
  create(
    body: CompletionCreateParams,
    options?: RequestOptions,
  ): APIPromise<ChatAPI.StreamChunk> | APIPromise<Stream<ChatAPI.StreamChunk>> {
    return this._client.post('/chat/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ChatAPI.StreamChunk>
      | APIPromise<Stream<ChatAPI.StreamChunk>>;
  }
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  messages: Array<Shared.ChatMessageInput>;

  model: string;

  _debug_pro_search?: boolean;

  _inputs?: Array<number> | null;

  _is_browser_agent?: boolean | null;

  _prompt_token_length?: number | null;

  best_of?: number | null;

  country?: string | null;

  cum_logprobs?: boolean | null;

  debug_params?: CompletionCreateParams.DebugParams | null;

  disable_search?: boolean | null;

  diverse_first_token?: boolean | null;

  enable_search_classifier?: boolean | null;

  file_workspace_id?: string | null;

  frequency_penalty?: number | null;

  has_image_url?: boolean;

  image_domain_filter?: Array<string> | null;

  image_format_filter?: Array<string> | null;

  language_preference?: string | null;

  last_updated_after_filter?: string | null;

  last_updated_before_filter?: string | null;

  latitude?: number | null;

  logprobs?: boolean | null;

  longitude?: number | null;

  max_tokens?: number | null;

  n?: number | null;

  num_images?: number;

  num_search_results?: number;

  parallel_tool_calls?: boolean | null;

  presence_penalty?: number | null;

  ranking_model?: string | null;

  reasoning_effort?: 'minimal' | 'low' | 'medium' | 'high' | null;

  response_format?:
    | CompletionCreateParams.ResponseFormatText
    | CompletionCreateParams.ResponseFormatJsonSchema
    | CompletionCreateParams.ResponseFormatRegex
    | null;

  response_metadata?: { [key: string]: unknown } | null;

  return_images?: boolean | null;

  return_related_questions?: boolean | null;

  safe_search?: boolean | null;

  search_after_date_filter?: string | null;

  search_before_date_filter?: string | null;

  search_domain_filter?: Array<string> | null;

  search_internal_properties?: { [key: string]: unknown } | null;

  search_mode?: 'web' | 'academic' | 'sec' | null;

  search_recency_filter?: 'hour' | 'day' | 'week' | 'month' | 'year' | null;

  search_tenant?: string | null;

  stop?: string | Array<string> | null;

  stream?: boolean | null;

  stream_mode?: 'full' | 'concise';

  temperature?: number | null;

  thread_id?: string | null;

  tool_choice?: 'none' | 'auto' | 'required' | null;

  tools?: Array<CompletionCreateParams.Tool> | null;

  top_k?: number | null;

  top_logprobs?: number | null;

  top_p?: number | null;

  updated_after_timestamp?: number | null;

  updated_before_timestamp?: number | null;

  use_threads?: boolean | null;

  web_search_options?: CompletionCreateParams.WebSearchOptions;
}

export namespace CompletionCreateParams {
  export interface DebugParams {
    summarizer_model_override?: string | null;

    summarizer_prompt_override?: string | null;
  }

  export interface ResponseFormatText {
    type: 'text';
  }

  export interface ResponseFormatJsonSchema {
    json_schema: ResponseFormatJsonSchema.JsonSchema;

    type: 'json_schema';
  }

  export namespace ResponseFormatJsonSchema {
    export interface JsonSchema {
      schema: { [key: string]: unknown };

      description?: string | null;

      name?: string | null;

      strict?: boolean | null;
    }
  }

  export interface ResponseFormatRegex {
    regex: ResponseFormatRegex.Regex;

    type: 'regex';
  }

  export namespace ResponseFormatRegex {
    export interface Regex {
      regex: string;

      description?: string | null;

      name?: string | null;

      strict?: boolean | null;
    }
  }

  export interface Tool {
    function: Tool.Function;

    type: 'function';
  }

  export namespace Tool {
    export interface Function {
      description: string;

      name: string;

      parameters: Function.Parameters;

      strict?: boolean | null;
    }

    export namespace Function {
      export interface Parameters {
        properties: { [key: string]: unknown };

        type: string;

        additional_properties?: boolean | null;

        required?: Array<string> | null;
      }
    }
  }

  export interface WebSearchOptions {
    image_results_enhanced_relevance?: boolean;

    search_context_size?: 'low' | 'medium' | 'high';

    search_type?: 'fast' | 'pro' | 'auto' | null;

    user_location?: WebSearchOptions.UserLocation | null;
  }

  export namespace WebSearchOptions {
    export interface UserLocation {
      city?: string | null;

      country?: string | null;

      latitude?: number | null;

      longitude?: number | null;

      region?: string | null;
    }
  }

  export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  stream?: false | null;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  stream: true;
}

export declare namespace Completions {
  export {
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };
}
