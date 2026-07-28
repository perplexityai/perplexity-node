import { Async } from '../../../generated/api.js';

export const Completions = Async.Chat.Completions;
export type Completions = InstanceType<typeof Completions>;
export type CompletionCreateParams = Async.Chat.CompletionCreateParams;
export type CompletionCreateResponse = Async.Chat.CompletionCreateResponse;
export type CompletionGetParams = Async.Chat.CompletionGetParams;
export type CompletionGetResponse = Async.Chat.CompletionGetResponse;
export type CompletionListResponse = Async.Chat.CompletionListResponse;

export namespace Completions {
  export type CompletionCreateResponse = Async.Chat.CompletionCreateResponse;
  export type CompletionListResponse = Async.Chat.CompletionListResponse;
  export type CompletionGetResponse = Async.Chat.CompletionGetResponse;
  export type CompletionCreateParams = Async.Chat.CompletionCreateParams;
  export type CompletionGetParams = Async.Chat.CompletionGetParams;
}

export namespace CompletionListResponse {
  export type Request = CompletionListResponse['requests'][number];
}

export namespace CompletionCreateParams {
  export type Request = CompletionCreateParams['request'];
  export namespace Request {
    export type ResponseFormatText = Extract<NonNullable<Request['response_format']>, { type: 'text' }>;
    export type ResponseFormatJsonSchema = Extract<
      NonNullable<Request['response_format']>,
      { type: 'json_schema' }
    >;
    export namespace ResponseFormatJsonSchema {
      export type JsonSchema = ResponseFormatJsonSchema['json_schema'];
    }
    export type ResponseFormatRegex = Extract<NonNullable<Request['response_format']>, { type: 'regex' }>;
    export namespace ResponseFormatRegex {
      export type Regex = ResponseFormatRegex['regex'];
    }
    export type Tool = NonNullable<Request['tools']>[number];
    export namespace Tool {
      export type Function = Tool['function'];
      export namespace Function {
        export type Parameters = Function['parameters'];
      }
    }
  }
}
