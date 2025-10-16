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

  display_server_time?: boolean;

  max_results?: number;

  max_tokens?: number;

  max_tokens_per_page?: number;

  search_after_date_filter?: string | null;

  search_before_date_filter?: string | null;

  search_domain_filter?: Array<string> | null;

  search_mode?: 'web' | 'academic' | 'sec' | null;

  search_recency_filter?: 'hour' | 'day' | 'week' | 'month' | 'year' | null;
}

export declare namespace Search {
  export { type SearchCreateResponse as SearchCreateResponse, type SearchCreateParams as SearchCreateParams };
}
