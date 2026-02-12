// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Execute extends APIResource {
  /**
   * Execute Python or Bash code in the sandbox environment.
   */
  create(
    sessionID: string,
    body: ExecuteCreateParams,
    options?: RequestOptions,
  ): APIPromise<Shared.ExecuteCodeResponse> {
    return this._client.post(path`/v1/sandbox/sessions/${sessionID}/execute`, { body, ...options });
  }
}

export interface ExecuteCreateParams {
  /**
   * Base64 encoded code to execute
   */
  code: string;

  /**
   * Programming language of the code
   */
  language: 'python' | 'bash';

  /**
   * Run in background (bash only)
   */
  background?: boolean;

  /**
   * Execution timeout in seconds (max 120)
   */
  execution_timeout?: number;
}

export declare namespace Execute {
  export { type ExecuteCreateParams as ExecuteCreateParams };
}
