import { APIResource } from '../../core/resource.js';
import * as Shared from '../shared.js';
import { APIPromise } from '../../core/api-promise.js';
import { buildHeaders } from '../../internal/headers.js';
import { RequestOptions } from '../../internal/request-options.js';
import { path } from '../../internal/utils/path.js';

export class Sessions extends APIResource {
  /**
   * Create a new remote browser session for CDP-based automation.
   */
  create(
    body?: SessionCreateParams | null | undefined,
    options?: RequestOptions,
  ): APIPromise<Shared.BrowserSessionResponse> {
    return this._client.post('/v1/browser/sessions', { body, ...options });
  }

  /**
   * Stop and clean up a remote browser session.
   */
  delete(sessionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/browser/sessions/${sessionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SessionCreateParams {}

export declare namespace Sessions {
  export { type SessionCreateParams as SessionCreateParams };
}
