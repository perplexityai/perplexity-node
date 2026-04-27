// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ContextualizedEmbeddings extends APIResource {
  /**
   * Generate contextualized embeddings for document chunks. Chunks from the same
   * document share context awareness, improving retrieval quality for document-based
   * applications.
   */
  create(
    body: ContextualizedEmbeddingCreateParams,
    options?: RequestOptions,
  ): APIPromise<ContextualizedEmbeddingCreateResponse> {
    return this._client.post('/v1/contextualizedembeddings', { body, ...options });
  }
}

/**
 * Response body for contextualized embeddings request
 */
export interface ContextualizedEmbeddingCreateResponse {
  /**
   * List of contextualized embedding objects
   */
  data?: Array<Shared.ContextualizedEmbeddingObject>;

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

export interface ContextualizedEmbeddingCreateParams {
  /**
   * Nested array structure where each inner array contains chunks from a single
   * document. Chunks within the same document are encoded with document-level
   * context awareness. Maximum 512 documents. Total chunks across all documents must
   * not exceed 16,000. Total tokens per document must not exceed 32K. All chunks in
   * a single request must not exceed 120,000 tokens combined. Empty strings are not
   * allowed.
   */
  input: Array<Array<string>>;

  /**
   * The contextualized embedding model to use
   */
  model: 'pplx-embed-context-v1-0.6b' | 'pplx-embed-context-v1-4b';

  /**
   * Number of dimensions for output embeddings (Matryoshka). Range: 128-1024 for
   * pplx-embed-context-v1-0.6b, 128-2560 for pplx-embed-context-v1-4b. Defaults to
   * full dimensions (1024 or 2560).
   */
  dimensions?: number;

  /**
   * Output encoding format for embeddings. base64_int8 returns base64-encoded signed
   * int8 values. base64_binary returns base64-encoded packed binary (1 bit per
   * dimension).
   */
  encoding_format?: 'base64_int8' | 'base64_binary';
}

export declare namespace ContextualizedEmbeddings {
  export {
    type ContextualizedEmbeddingCreateResponse as ContextualizedEmbeddingCreateResponse,
    type ContextualizedEmbeddingCreateParams as ContextualizedEmbeddingCreateParams,
  };
}
