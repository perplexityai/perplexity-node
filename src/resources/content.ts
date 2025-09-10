// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Content extends APIResource {
  /**
   * Retrieve the full content from specified URLs
   */
  create(body: ContentCreateParams, options?: RequestOptions): APIPromise<ContentCreateResponse> {
    return this._client.post('/content', { body, ...options });
  }
}

/**
 * Response containing the retrieved content from URLs
 */
export interface ContentCreateResponse {
  /**
   * Unique identifier for this content retrieval request
   */
  id: string;

  /**
   * Array of content objects retrieved from the requested URLs
   */
  results: Array<ContentCreateResponse.Result>;
}

export namespace ContentCreateResponse {
  /**
   * Content retrieved from a specific URL
   */
  export interface Result {
    /**
     * The full text content of the web page or document
     */
    content: string;

    /**
     * The title of the web page or document
     */
    title: string;

    /**
     * The URL of the web page or document
     */
    url: string;

    /**
     * The publication date of the content (if available)
     */
    date?: string | null;
  }
}

export interface ContentCreateParams {
  /**
   * List of URLs to retrieve content from
   */
  urls: Array<string>;
}

export declare namespace Content {
  export {
    type ContentCreateResponse as ContentCreateResponse,
    type ContentCreateParams as ContentCreateParams,
  };
}
