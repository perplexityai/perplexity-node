// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
