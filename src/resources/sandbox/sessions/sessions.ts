// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import * as ExecuteAPI from './execute';
import { Execute, ExecuteCreateParams } from './execute';
import * as FilesAPI from './files';
import { FileListParams, FileReadParams, FileWriteParams, Files } from './files';
import * as PauseAPI from './pause';
import { Pause } from './pause';
import * as ProcessesAPI from './processes';
import { ProcessDeleteParams, ProcessGetParams, Processes } from './processes';
import * as ResumeAPI from './resume';
import { Resume, ResumeCreateParams } from './resume';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Sessions extends APIResource {
  execute: ExecuteAPI.Execute = new ExecuteAPI.Execute(this._client);
  pause: PauseAPI.Pause = new PauseAPI.Pause(this._client);
  resume: ResumeAPI.Resume = new ResumeAPI.Resume(this._client);
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
  processes: ProcessesAPI.Processes = new ProcessesAPI.Processes(this._client);

  /**
   * Create a new isolated sandbox environment for code execution.
   */
  create(
    body: SessionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.SandboxSessionResponse> {
    return this._client.post('/v1/sandbox/sessions', { body, ...options });
  }

  /**
   * Terminate and clean up a sandbox session.
   */
  delete(sessionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/sandbox/sessions/${sessionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Retrieve the current status of a sandbox session.
   */
  get(sessionID: string, options?: RequestOptions): APIPromise<Shared.SandboxSessionResponse> {
    return this._client.get(path`/v1/sandbox/sessions/${sessionID}`, options);
  }
}

export interface SessionCreateParams {
  /**
   * Enable network access in the sandbox
   */
  network_enabled?: boolean;
}

Sessions.Execute = Execute;
Sessions.Pause = Pause;
Sessions.Resume = Resume;
Sessions.Files = Files;
Sessions.Processes = Processes;

export declare namespace Sessions {
  export { type SessionCreateParams as SessionCreateParams };

  export { Execute as Execute, type ExecuteCreateParams as ExecuteCreateParams };

  export { Pause as Pause };

  export { Resume as Resume, type ResumeCreateParams as ResumeCreateParams };

  export {
    Files as Files,
    type FileListParams as FileListParams,
    type FileReadParams as FileReadParams,
    type FileWriteParams as FileWriteParams,
  };

  export {
    Processes as Processes,
    type ProcessDeleteParams as ProcessDeleteParams,
    type ProcessGetParams as ProcessGetParams,
  };
}
