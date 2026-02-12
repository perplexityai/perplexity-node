// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Processes extends APIResource {
  /**
   * List all running processes in the sandbox session.
   */
  list(sessionID: string, options?: RequestOptions): APIPromise<Shared.ListProcessesResponse> {
    return this._client.get(path`/v1/sandbox/sessions/${sessionID}/processes`, options);
  }

  /**
   * Kill a running process in the sandbox session.
   */
  delete(pid: number, params: ProcessDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { session_id } = params;
    return this._client.delete(path`/v1/sandbox/sessions/${session_id}/processes/${pid}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get details of a specific process in the sandbox session.
   */
  get(pid: number, params: ProcessGetParams, options?: RequestOptions): APIPromise<Shared.ProcessInfo> {
    const { session_id } = params;
    return this._client.get(path`/v1/sandbox/sessions/${session_id}/processes/${pid}`, options);
  }
}

export interface ProcessDeleteParams {
  /**
   * The unique identifier of the sandbox session
   */
  session_id: string;
}

export interface ProcessGetParams {
  /**
   * The unique identifier of the sandbox session
   */
  session_id: string;
}

export declare namespace Processes {
  export { type ProcessDeleteParams as ProcessDeleteParams, type ProcessGetParams as ProcessGetParams };
}
