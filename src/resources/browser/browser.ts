import { APIResource } from '../../core/resource.js';
import * as SessionsAPI from './sessions.js';
import { SessionCreateParams, Sessions } from './sessions.js';

export class Browser extends APIResource {
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);
}

Browser.Sessions = Sessions;

export declare namespace Browser {
  export { Sessions as Sessions, type SessionCreateParams as SessionCreateParams };
}
