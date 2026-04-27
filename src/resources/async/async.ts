// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChatAPI from './chat/chat';
import { Chat } from './chat/chat';

export class Async extends APIResource {
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);
}

Async.Chat = Chat;

export declare namespace Async {
  export { Chat as Chat };
}
