// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Completions extends APIResource {
  /**
   * Generates a model's response for the given chat conversation with integrated
   * search capabilities
   */
  create(body: CompletionCreateParams, options?: RequestOptions): APIPromise<CompletionCreateResponse> {
    return this._client.post('/chat/completions', { body, ...options });
  }
}

export interface CompletionCreateResponse {
  /**
   * Unique identifier for the chat completion
   */
  id: string;

  choices: Array<Shared.ChatChoice>;

  /**
   * Unix timestamp of creation
   */
  created: number;

  /**
   * The model used
   */
  model: string;

  object: string;

  usage: Shared.UsageInfo;

  /**
   * Search results used in generating the response
   */
  search_results?: Array<Shared.SearchResult> | null;
}

export interface CompletionCreateParams {
  /**
   * A list of messages comprising the conversation so far
   */
  messages: Array<Shared.ChatMessage>;

  /**
   * The name of the model that will complete your prompt
   */
  model: 'sonar' | 'sonar-pro' | 'sonar-deep-research' | 'sonar-reasoning' | 'sonar-reasoning-pro';

  /**
   * Disables web search completely - model uses only training data
   */
  disable_search?: boolean;

  /**
   * Enables classifier that decides if web search is needed
   */
  enable_search_classifier?: boolean;

  /**
   * Only include content last updated after this date (YYYY-MM-DD)
   */
  last_updated_after_filter?: string | null;

  /**
   * Only include content last updated before this date (YYYY-MM-DD)
   */
  last_updated_before_filter?: string | null;

  /**
   * Controls computational effort for sonar-deep-research model. Higher effort =
   * more thorough but more tokens
   */
  reasoning_effort?: 'low' | 'medium' | 'high' | null;

  /**
   * Whether to include images in search results
   */
  return_images?: boolean;

  /**
   * Whether to return related questions
   */
  return_related_questions?: boolean;

  /**
   * Only include content published after this date (YYYY-MM-DD)
   */
  search_after_date_filter?: string | null;

  /**
   * Only include content published before this date (YYYY-MM-DD)
   */
  search_before_date_filter?: string | null;

  /**
   * List of domains to limit search results to. Use '-' prefix to exclude domains
   */
  search_domain_filter?: Array<string> | null;

  /**
   * Type of search: 'web' for general, 'academic' for scholarly, 'sec' for SEC
   * filings
   */
  search_mode?: 'web' | 'academic' | 'sec' | null;

  /**
   * Filter results by how recently they were published
   */
  search_recency_filter?: 'hour' | 'day' | 'week' | 'month' | 'year' | null;

  web_search_options?: CompletionCreateParams.WebSearchOptions;
}

export namespace CompletionCreateParams {
  export interface WebSearchOptions {
    /**
     * Improves relevance of image search results
     */
    image_search_relevance_enhanced?: boolean;

    /**
     * Amount of search context retrieved: low (cost-saving), medium (balanced), high
     * (comprehensive)
     */
    search_context_size?: 'low' | 'medium' | 'high';

    user_location?: WebSearchOptions.UserLocation;
  }

  export namespace WebSearchOptions {
    export interface UserLocation {
      city?: string | null;

      /**
       * Two-letter ISO country code
       */
      country?: string | null;

      latitude?: number | null;

      longitude?: number | null;

      /**
       * State/province name
       */
      region?: string | null;
    }
  }
}

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
  };
}
