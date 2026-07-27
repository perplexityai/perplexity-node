import { APIResource } from '../../core/resource.js';
import * as ChatAPI from './chat/chat.js';
import { Chat } from './chat/chat.js';

export class Async extends APIResource {
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);
}

Async.Chat = Chat;

export declare namespace Async {
  export { Chat as Chat };
}
