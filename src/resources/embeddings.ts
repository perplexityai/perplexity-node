// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Embeddings extends APIResource {
  /**
   * Generate embeddings for a list of texts. Use these embeddings for semantic
   * search, clustering, and other machine learning applications.
   */
  create(body: EmbeddingCreateParams, options?: RequestOptions): APIPromise<EmbeddingCreateResponse> {
    return this._client.post('/v1/embeddings', { body, ...options });
  }
}

/**
 * Response body for embeddings request
 */
export interface EmbeddingCreateResponse {
  /**
   * List of embedding objects
   */
  data?: Array<Shared.EmbeddingObject>;

  /**
   * The model used to generate embeddings
   */
  model?: string;

  /**
   * The object type
   */
  object?: string;

  /**
   * Token usage for the embeddings request
   */
  usage?: Shared.EmbeddingsUsage;
}

export interface EmbeddingCreateParams {
  /**
   * Input text to embed, encoded as a string or array of strings. Maximum 512 texts
   * per request. Each input must not exceed 32K tokens. All inputs in a single
   * request must not exceed 120,000 tokens combined. Empty strings are not allowed.
   */
  input: string | Array<string>;

  /**
   * The embedding model to use
   */
  model: 'pplx-embed-v1-0.6b' | 'pplx-embed-v1-4b';

  /**
   * Number of dimensions for output embeddings (Matryoshka). Range: 128-1024 for
   * pplx-embed-v1-0.6b, 128-2560 for pplx-embed-v1-4b. Defaults to full dimensions
   * (1024 or 2560).
   */
  dimensions?: number;

  /**
   * Output encoding format for embeddings. base64_int8 returns base64-encoded signed
   * int8 values. base64_binary returns base64-encoded packed binary (1 bit per
   * dimension).
   */
  encoding_format?: 'base64_int8' | 'base64_binary';
}

export declare namespace Embeddings {
  export {
    type EmbeddingCreateResponse as EmbeddingCreateResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };
}
