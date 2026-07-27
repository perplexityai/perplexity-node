import type { Perplexity } from '../client.js';

export abstract class APIResource {
  protected _client: Perplexity;

  constructor(client: Perplexity) {
    this._client = client;
  }
}
