// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SessionsAPI from './sessions';
import { SessionCreateParams, Sessions } from './sessions';

export class Browser extends APIResource {
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);
}

Browser.Sessions = Sessions;

export declare namespace Browser {
  export { Sessions as Sessions, type SessionCreateParams as SessionCreateParams };
}
