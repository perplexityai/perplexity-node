// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search the web and retrieve relevant web page contents.
   */
  create(body: SearchCreateParams, options?: RequestOptions): APIPromise<SearchCreateResponse> {
    return this._client.post('/search', { body, ...options });
  }
}

export interface SearchCreateResponse {
  id: string;

  results: Array<SearchCreateResponse.Result>;

  server_time?: string | null;
}

export namespace SearchCreateResponse {
  export interface Result {
    snippet: string;

    title: string;

    url: string;

    date?: string | null;

    last_updated?: string | null;
  }
}

export interface SearchCreateParams {
  query: string | Array<string>;

  country?: string | null;

  display_server_time?: boolean;

  last_updated_after_filter?: string | null;

  last_updated_before_filter?: string | null;

  max_results?: number;

  max_tokens?: number;

  max_tokens_per_page?: number;

  search_after_date_filter?: string | null;

  search_before_date_filter?: string | null;

  /**
   * Controls how much content is retrieved per result. Larger sizes return more page
   * content at higher cost. Defaults to "high". Omit when supplying explicit
   * max_tokens / max_tokens_per_page.
   */
  search_context_size?: 'low' | 'medium' | 'high';

  search_domain_filter?: Array<string> | null;

  search_language_filter?: Array<string> | null;

  search_mode?: 'web' | 'academic' | 'sec' | null;

  search_recency_filter?: 'hour' | 'day' | 'week' | 'month' | 'year' | null;

  /**
   * Search type — "web" for general web search, "people" for people search.
   * max_results above 20 is only supported for people search.
   */
  search_type?: 'web' | 'people' | null;
}

export declare namespace Search {
  export { type SearchCreateResponse as SearchCreateResponse, type SearchCreateParams as SearchCreateParams };
}
