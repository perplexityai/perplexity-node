// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Resume extends APIResource {
  /**
   * Resume a paused sandbox session from its S3 snapshot.
   */
  create(
    sessionID: string,
    body: ResumeCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.SandboxSessionResponse> {
    return this._client.post(path`/v1/sandbox/sessions/${sessionID}/resume`, { body, ...options });
  }
}

export interface ResumeCreateParams {
  /**
   * Override network setting when resuming
   */
  network_enabled?: boolean;
}

export declare namespace Resume {
  export { type ResumeCreateParams as ResumeCreateParams };
}
