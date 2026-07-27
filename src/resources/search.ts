import type * as API from '../generated/api.js';

export { Search } from '../generated/api.js';
export type SearchCreateParams = API.SearchCreateParams;
export type SearchCreateResponse = API.SearchCreateResponse;

export namespace SearchCreateResponse {
  export type Result = API.SearchCreateResponse['results'][number];
}
