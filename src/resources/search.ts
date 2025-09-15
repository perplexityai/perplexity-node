// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search
   */
  create(body: SearchCreateParams, options?: RequestOptions): APIPromise<SearchCreateResponse> {
    return this._client.post('/search', { body, ...options });
  }
}

export interface SearchCreateResponse {
  id: string;

  results: Array<SearchCreateResponse.Result>;
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

  last_updated_after_filter?: string | null;

  last_updated_before_filter?: string | null;

  max_results?: number;

  max_tokens?: number;

  max_tokens_per_page?: number;

  safe_search?: boolean | null;

  search_after_date_filter?: string | null;

  search_before_date_filter?: string | null;

  search_domain_filter?: Array<string> | null;

  search_mode?: 'web' | 'academic' | 'sec' | null;

  search_recency_filter?: 'hour' | 'day' | 'week' | 'month' | 'year' | null;
}

export declare namespace Search {
  export { type SearchCreateResponse as SearchCreateResponse, type SearchCreateParams as SearchCreateParams };
}
