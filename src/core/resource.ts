// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Perplexity } from '../client';

export abstract class APIResource {
  protected _client: Perplexity;

  constructor(client: Perplexity) {
    this._client = client;
  }
}
