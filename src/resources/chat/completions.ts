import { Chat } from '../../generated/api.js';

export const Completions = Chat.Completions;
export type Completions = InstanceType<typeof Completions>;
export type CompletionCreateParams = Chat.CompletionCreateParams;
export type CompletionCreateParamsBase = Omit<CompletionCreateParams, 'stream'>;
export type CompletionCreateParamsNonStreaming = Chat.CompletionCreateParamsNonStreaming;
export type CompletionCreateParamsStreaming = Chat.CompletionCreateParamsStreaming;

export namespace CompletionCreateParams {
  export type ResponseFormatText = Extract<
    NonNullable<CompletionCreateParams['response_format']>,
    { type: 'text' }
  >;
  export type ResponseFormatJsonSchema = Extract<
    NonNullable<CompletionCreateParams['response_format']>,
    { type: 'json_schema' }
  >;
  export namespace ResponseFormatJsonSchema {
    export type JsonSchema = ResponseFormatJsonSchema['json_schema'];
  }
  export type ResponseFormatRegex = Extract<
    NonNullable<CompletionCreateParams['response_format']>,
    { type: 'regex' }
  >;
  export namespace ResponseFormatRegex {
    export type Regex = ResponseFormatRegex['regex'];
  }
  export type Tool = NonNullable<CompletionCreateParams['tools']>[number];
  export namespace Tool {
    export type Function = Tool['function'];
    export namespace Function {
      export type Parameters = Function['parameters'];
    }
  }
  export type CompletionCreateParamsNonStreaming = Chat.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = Chat.CompletionCreateParamsStreaming;
}
