// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ResponsesAPI from './responses';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  /**
   * Lists the files the model delivered via the share_file tool during this
   * response.
   */
  list(responseID: string, options?: RequestOptions): APIPromise<ResponsesAPI.ResponseFileList> {
    return this._client.get(path`/v1/responses/${responseID}/files`, options);
  }

  /**
   * Streams the raw bytes of one shared file. Content-Disposition carries the
   * original filename.
   */
  content(fileID: string, params: FileContentParams, options?: RequestOptions): APIPromise<Response> {
    const { response_id } = params;
    return this._client.get(path`/v1/responses/${response_id}/files/${fileID}/content`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

export interface FileContentParams {
  /**
   * ID of the response (e.g., resp\_...).
   */
  response_id: string;
}

export declare namespace Files {
  export { type FileContentParams as FileContentParams };
}
