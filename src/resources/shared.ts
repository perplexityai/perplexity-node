import type * as API from '../generated/api.js';

type ArrayItem<Value> = Value extends readonly (infer Item)[] ? Item : never;
type MessageContent<Message extends { content: unknown }> = ArrayItem<
  Exclude<NonNullable<Message['content']>, string>
>;

export type APIPublicSearchResult = API.APIPublicSearchResult;
export type BrowserSessionResponse = API.BrowserSessionResponse;
export type ChatMessageInput = API.ChatMessageInput;
export type ChatMessageOutput = API.ChatMessageOutput;
export type Choice = API.Choice;
export type ContextualizedEmbeddingObject = API.ContextualizedEmbeddingObject;
export type EmbeddingObject = API.EmbeddingObject;
export type EmbeddingsUsage = API.EmbeddingsUsage;
export type JsonSchemaFormat = API.JsonSchemaFormat;
export type ResponseFormat = API.ResponseFormat;
export type SearchResult = API.SearchResult;
export type UsageInfo = API.UsageInfo;
export type UserLocation = API.UserLocation;
export type WebSearchOptions = API.WebSearchOptions;

export namespace ChatMessageInput {
  export type ChatMessageContentTextChunk = Extract<MessageContent<API.ChatMessageInput>, { type: 'text' }>;
  export type ChatMessageContentImageChunk = Extract<
    MessageContent<API.ChatMessageInput>,
    { type: 'image_url' }
  >;
  export namespace ChatMessageContentImageChunk {
    export type URL = Exclude<ChatMessageContentImageChunk['image_url'], string>;
  }
  export type ChatMessageContentFileChunk = Extract<
    MessageContent<API.ChatMessageInput>,
    { type: 'file_url' }
  >;
  export namespace ChatMessageContentFileChunk {
    export type URL = Exclude<ChatMessageContentFileChunk['file_url'], string>;
  }
  export type ChatMessageContentPdfChunk = Extract<MessageContent<API.ChatMessageInput>, { type: 'pdf_url' }>;
  export namespace ChatMessageContentPdfChunk {
    export type URL = Exclude<ChatMessageContentPdfChunk['pdf_url'], string>;
  }
  export type ChatMessageContentVideoChunk = Extract<
    MessageContent<API.ChatMessageInput>,
    { type: 'video_url' }
  >;
  export namespace ChatMessageContentVideoChunk {
    export type VideoURL = Exclude<ChatMessageContentVideoChunk['video_url'], string>;
  }
  export type ReasoningStep = ArrayItem<NonNullable<API.ChatMessageInput['reasoning_steps']>>;
  export namespace ReasoningStep {
    export type ExecutePython = NonNullable<ReasoningStep['execute_python']>;
    export type FetchURLContent = NonNullable<ReasoningStep['fetch_url_content']>;
    export type WebSearch = NonNullable<ReasoningStep['web_search']>;
  }
  export type ToolCall = ArrayItem<NonNullable<API.ChatMessageInput['tool_calls']>>;
  export namespace ToolCall {
    export type Function = NonNullable<ToolCall['function']>;
  }
}

export namespace ChatMessageOutput {
  export type ChatMessageContentTextChunk = Extract<MessageContent<API.ChatMessageOutput>, { type: 'text' }>;
  export type ChatMessageContentImageChunk = Extract<
    MessageContent<API.ChatMessageOutput>,
    { type: 'image_url' }
  >;
  export namespace ChatMessageContentImageChunk {
    export type URL = Exclude<ChatMessageContentImageChunk['image_url'], string>;
  }
  export type ChatMessageContentFileChunk = Extract<
    MessageContent<API.ChatMessageOutput>,
    { type: 'file_url' }
  >;
  export namespace ChatMessageContentFileChunk {
    export type URL = Exclude<ChatMessageContentFileChunk['file_url'], string>;
  }
  export type ChatMessageContentPdfChunk = Extract<
    MessageContent<API.ChatMessageOutput>,
    { type: 'pdf_url' }
  >;
  export namespace ChatMessageContentPdfChunk {
    export type URL = Exclude<ChatMessageContentPdfChunk['pdf_url'], string>;
  }
  export type ChatMessageContentVideoChunk = Extract<
    MessageContent<API.ChatMessageOutput>,
    { type: 'video_url' }
  >;
  export namespace ChatMessageContentVideoChunk {
    export type VideoURL = Exclude<ChatMessageContentVideoChunk['video_url'], string>;
  }
  export type ReasoningStep = ArrayItem<NonNullable<API.ChatMessageOutput['reasoning_steps']>>;
  export namespace ReasoningStep {
    export type ExecutePython = NonNullable<ReasoningStep['execute_python']>;
    export type FetchURLContent = NonNullable<ReasoningStep['fetch_url_content']>;
    export type WebSearch = NonNullable<ReasoningStep['web_search']>;
  }
  export type ToolCall = ArrayItem<NonNullable<API.ChatMessageOutput['tool_calls']>>;
  export namespace ToolCall {
    export type Function = NonNullable<ToolCall['function']>;
  }
}

export namespace EmbeddingsUsage {
  export type Cost = NonNullable<API.EmbeddingsUsage['cost']>;
}

export namespace UsageInfo {
  export type Cost = API.UsageInfo['cost'];
}
