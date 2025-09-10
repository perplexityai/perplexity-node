// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Perform a search query with various filtering and customization options
   */
  create(body: SearchCreateParams, options?: RequestOptions): APIPromise<SearchCreateResponse> {
    return this._client.post('/search', { body, ...options });
  }
}

/**
 * Response containing search results
 */
export interface SearchCreateResponse {
  /**
   * Unique identifier for this search request
   */
  id: string;

  /**
   * Array of search result pages matching the query
   */
  results: Array<SearchCreateResponse.Result>;
}

export namespace SearchCreateResponse {
  /**
   * A single search result page
   */
  export interface Result {
    /**
     * A brief excerpt or summary of the page content
     */
    snippet: string;

    /**
     * The title of the search result page
     */
    title: string;

    /**
     * The URL of the search result page
     */
    url: string;

    /**
     * The publication date of the content (if available)
     */
    date?: string | null;

    /**
     * When the content was last updated (if available)
     */
    last_updated?: string | null;
  }
}

export interface SearchCreateParams {
  /**
   * Search query string or array of query strings to search for
   */
  query: string | Array<string>;

  /**
   * Country code to bias search results towards (e.g., 'US', 'GB', 'CA')
   */
  country?: string | null;

  /**
   * Only include results last updated after this date (ISO 8601 format: YYYY-MM-DD)
   */
  last_updated_after_filter?: string | null;

  /**
   * Only include results last updated before this date (ISO 8601 format: YYYY-MM-DD)
   */
  last_updated_before_filter?: string | null;

  /**
   * Maximum number of search results to return
   */
  max_results?: number;

  /**
   * Maximum number of tokens to return across all results
   */
  max_tokens?: number;

  /**
   * Maximum number of tokens to return per individual search result
   */
  max_tokens_per_page?: number;

  /**
   * Enable safe search filtering to exclude adult content
   */
  safe_search?: boolean | null;

  /**
   * Only include results published after this date (ISO 8601 format: YYYY-MM-DD)
   */
  search_after_date_filter?: string | null;

  /**
   * Only include results published before this date (ISO 8601 format: YYYY-MM-DD)
   */
  search_before_date_filter?: string | null;

  /**
   * List of domains to restrict search results to (e.g., ['example.com',
   * 'another.com'])
   */
  search_domain_filter?: Array<string> | null;

  /**
   * Type of search to perform: 'web' for general web search, 'academic' for
   * scholarly articles, 'sec' for SEC filings
   */
  search_mode?: 'web' | 'academic' | 'sec' | null;

  /**
   * Filter results by how recently they were published (hour, day, week, month, or
   * year)
   */
  search_recency_filter?: 'hour' | 'day' | 'week' | 'month' | 'year' | null;
}

export declare namespace Search {
  export { type SearchCreateResponse as SearchCreateResponse, type SearchCreateParams as SearchCreateParams };
}
