// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Content extends APIResource {
  /**
   * Get Urls Content
   */
  create(body: ContentCreateParams, options?: RequestOptions): APIPromise<ContentCreateResponse> {
    return this._client.post('/content', { body, ...options });
  }
}

export interface ContentCreateResponse {
  id: string;

  results: Array<ContentCreateResponse.Result>;
}

export namespace ContentCreateResponse {
  export interface Result {
    content: string;

    title: string;

    url: string;

    date?: string | null;
  }
}

export interface ContentCreateParams {
  urls: Array<string>;
}

export declare namespace Content {
  export {
    type ContentCreateResponse as ContentCreateResponse,
    type ContentCreateParams as ContentCreateParams,
  };
}
