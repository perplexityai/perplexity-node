// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SessionsAPI from './sessions/sessions';
import { SessionCreateParams, Sessions } from './sessions/sessions';

export class Sandbox extends APIResource {
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);
}

Sandbox.Sessions = Sessions;

export declare namespace Sandbox {
  export { Sessions as Sessions, type SessionCreateParams as SessionCreateParams };
}
