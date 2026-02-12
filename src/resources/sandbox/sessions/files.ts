// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Files extends APIResource {
  /**
   * List files and directories in the sandbox filesystem.
   */
  list(
    sessionID: string,
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.ListFilesResponse> {
    return this._client.get(path`/v1/sandbox/sessions/${sessionID}/files/list`, { query, ...options });
  }

  /**
   * Get a list of files that have been modified since the session started.
   */
  modified(sessionID: string, options?: RequestOptions): APIPromise<Shared.ModifiedFilesResponse> {
    return this._client.get(path`/v1/sandbox/sessions/${sessionID}/files/modified`, options);
  }

  /**
   * Read a file from the sandbox filesystem. Content is returned base64 encoded.
   */
  read(
    sessionID: string,
    query: FileReadParams,
    options?: RequestOptions,
  ): APIPromise<Shared.ReadFileResponse> {
    return this._client.get(path`/v1/sandbox/sessions/${sessionID}/files`, { query, ...options });
  }

  /**
   * Write a file to the sandbox filesystem. Content must be base64 encoded.
   */
  write(
    sessionID: string,
    body: FileWriteParams,
    options?: RequestOptions,
  ): APIPromise<Shared.WriteFileResponse> {
    return this._client.post(path`/v1/sandbox/sessions/${sessionID}/files`, { body, ...options });
  }
}

export interface FileListParams {
  /**
   * Directory traversal depth
   */
  depth?: number;

  /**
   * Directory path to list
   */
  path?: string;
}

export interface FileReadParams {
  /**
   * Absolute path to the file to read
   */
  path: string;
}

export interface FileWriteParams {
  /**
   * Base64 encoded file content
   */
  content: string;

  /**
   * Absolute path where the file should be written
   */
  path: string;
}

export declare namespace Files {
  export {
    type FileListParams as FileListParams,
    type FileReadParams as FileReadParams,
    type FileWriteParams as FileWriteParams,
  };
}
