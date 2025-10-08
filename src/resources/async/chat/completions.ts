// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import * as ChatAPI from '../../chat/chat';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Completions extends APIResource {
  /**
   * Submit an asynchronous chat completion request.
   */
  create(body: CompletionCreateParams, options?: RequestOptions): APIPromise<CompletionCreateResponse> {
    return this._client.post('/async/chat/completions', { body, ...options });
  }

  /**
   * Retrieve a list of all asynchronous chat completion requests for a given user.
   */
  list(options?: RequestOptions): APIPromise<CompletionListResponse> {
    return this._client.get('/async/chat/completions', options);
  }

  /**
   * Retrieve the response for a given asynchronous chat completion request.
   */
  get(
    apiRequest: string,
    params: CompletionGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CompletionGetResponse> {
    const {
      'x-client-env': xClientEnv,
      'x-client-name': xClientName,
      'x-created-at-epoch-seconds': xCreatedAtEpochSeconds,
      'x-request-time': xRequestTime,
      'x-usage-tier': xUsageTier,
      'x-user-id': xUserID,
      ...query
    } = params ?? {};
    return this._client.get(path`/async/chat/completions/${apiRequest}`, {
      query,
      ...options,
      headers: buildHeaders([
        {
          ...(xClientEnv != null ? { 'x-client-env': xClientEnv } : undefined),
          ...(xClientName != null ? { 'x-client-name': xClientName } : undefined),
          ...(xCreatedAtEpochSeconds != null ?
            { 'x-created-at-epoch-seconds': xCreatedAtEpochSeconds }
          : undefined),
          ...(xRequestTime != null ? { 'x-request-time': xRequestTime } : undefined),
          ...(xUsageTier != null ? { 'x-usage-tier': xUsageTier } : undefined),
          ...(xUserID != null ? { 'x-user-id': xUserID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface CompletionCreateResponse {
  id: string;

  created_at: number;

  model: string;

  /**
   * Status enum for async processing.
   */
  status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

  completed_at?: number | null;

  error_message?: string | null;

  failed_at?: number | null;

  response?: ChatAPI.StreamChunk | null;

  started_at?: number | null;
}

export interface CompletionListResponse {
  requests: Array<CompletionListResponse.Request>;

  next_token?: string | null;
}

export namespace CompletionListResponse {
  export interface Request {
    id: string;

    created_at: number;

    model: string;

    /**
     * Status enum for async processing.
     */
    status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

    completed_at?: number | null;

    failed_at?: number | null;

    started_at?: number | null;
  }
}

export interface CompletionGetResponse {
  id: string;

  created_at: number;

  model: string;

  /**
   * Status enum for async processing.
   */
  status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

  completed_at?: number | null;

  error_message?: string | null;

  failed_at?: number | null;

  response?: ChatAPI.StreamChunk | null;

  started_at?: number | null;
}

export interface CompletionCreateParams {
  request: CompletionCreateParams.Request;

  idempotency_key?: string | null;
}

export namespace CompletionCreateParams {
  export interface Request {
    messages: Array<Shared.ChatMessageInput>;

    model: string;

    _debug_pro_search?: boolean;

    _inputs?: Array<number> | null;

    _is_browser_agent?: boolean | null;

    _prompt_token_length?: number | null;

    best_of?: number | null;

    country?: string | null;

    cum_logprobs?: boolean | null;

    debug_params?: Request.DebugParams | null;

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
      | Request.ResponseFormatText
      | Request.ResponseFormatJsonSchema
      | Request.ResponseFormatRegex
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

    tools?: Array<Request.Tool> | null;

    top_k?: number | null;

    top_logprobs?: number | null;

    top_p?: number | null;

    updated_after_timestamp?: number | null;

    updated_before_timestamp?: number | null;

    use_threads?: boolean | null;

    web_search_options?: Request.WebSearchOptions;
  }

  export namespace Request {
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
  }
}

export interface CompletionGetParams {
  /**
   * Query param:
   */
  local_mode?: boolean;

  /**
   * Header param:
   */
  'x-client-env'?: string;

  /**
   * Header param:
   */
  'x-client-name'?: string;

  /**
   * Header param:
   */
  'x-created-at-epoch-seconds'?: string;

  /**
   * Header param:
   */
  'x-request-time'?: string;

  /**
   * Header param:
   */
  'x-usage-tier'?: string;

  /**
   * Header param:
   */
  'x-user-id'?: string;
}

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionListResponse as CompletionListResponse,
    type CompletionGetResponse as CompletionGetResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionGetParams as CompletionGetParams,
  };
}
