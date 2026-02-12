// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Pause extends APIResource {
  /**
   * Pause the sandbox and snapshot its state to S3 for later resumption.
   */
  create(sessionID: string, options?: RequestOptions): APIPromise<Shared.PauseSandboxResponse> {
    return this._client.post(path`/v1/sandbox/sessions/${sessionID}/pause`, options);
  }
}
