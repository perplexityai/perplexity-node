import { Browser } from '../../generated/api.js';

export const Sessions = Browser.Sessions;
export type Sessions = InstanceType<typeof Sessions>;
export type SessionCreateParams = Browser.SessionCreateParams;

export namespace Sessions {
  export type SessionCreateParams = Browser.SessionCreateParams;
}
