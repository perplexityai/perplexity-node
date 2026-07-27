import type * as API from '../../generated/api.js';

export {
  Responses,
  type Annotation,
  type ContentPart,
  type ErrorInfo,
  type FunctionCallOutputItem,
  type FunctionTool,
  type InputItem,
  type OutputItem,
  type ResponseCancelResponse,
  type ResponseCreateResponse,
  type ResponseFile,
  type ResponseFileList,
  type ResponseRetrieveResponse,
  type ResponseStreamChunk,
} from '../../generated/api.js';

export type ResponseCreateParams = API.ResponseCreateParams;
export type ResponsesCreateParams = API.ResponsesCreateParams;
export type ResponsesUsage = API.ResponsesUsage;
export type ResponseCreateParamsNonStreaming = API.Responses.ResponseCreateParamsNonStreaming;
export type ResponseCreateParamsStreaming = API.Responses.ResponseCreateParamsStreaming;

export namespace InputItem {
  export type InputMessage = API.InputMessageInput;
  export namespace InputMessage {
    export type ContentPartArray = Extract<InputMessage['content'], readonly unknown[]>;
  }
  export type FunctionCallOutputInput = API.FunctionCallOutputInputInput;
  export type FunctionCallInput = API.FunctionCallInputInput;
}

export namespace OutputItem {
  export type MessageOutputItem = API.MessageOutputItemOutput;
  export type SearchResultsOutputItem = API.SearchResultsOutputItemOutput;
  export type FetchURLResultsOutputItem = API.FetchUrlResultsOutputItemOutput;
  export namespace FetchURLResultsOutputItem {
    export type Content = FetchURLResultsOutputItem['contents'][number];
  }
  export type McpListToolsOutputItem = API.McpListToolsOutputItemOutput;
  export namespace McpListToolsOutputItem {
    export type Tool = McpListToolsOutputItem['tools'][number];
  }
  export type McpCallOutputItem = API.McpCallOutputItemOutput;
  export type SkillLoadedOutputItem = API.SkillLoadedOutputItemOutput;
  export type AdvisorResultOutputItem = API.AdvisorResultOutputItemOutput;
  export type SandboxResultsOutputItem = API.SandboxResultsOutputItemOutput;
  export namespace SandboxResultsOutputItem {
    export type Result = SandboxResultsOutputItem['results'][number];
  }
  export type SandboxWriteFileOutputItem = API.SandboxWriteFileOutputItemOutput;
  export type SandboxReadFileOutputItem = API.SandboxReadFileOutputItemOutput;
  export type SandboxEditFileOutputItem = API.SandboxEditFileOutputItemOutput;
  export type SandboxGrepOutputItem = API.SandboxGrepOutputItemOutput;
  export type SandboxGlobOutputItem = API.SandboxGlobOutputItemOutput;
  export type SandboxApplyPatchOutputItem = API.SandboxApplyPatchOutputItemOutput;
  export type ShareFileOutputItem = API.ShareFileOutputItemOutput;
  export type UnknownOutputItem = API.UnknownOutputItemOutput;
}

export namespace ResponseStreamChunk {
  export type ResponseCreatedEvent = API.ResponseCreatedEventOutput;
  export namespace ResponseCreatedEvent {
    export type Response = NonNullable<ResponseCreatedEvent['response']>;
  }
  export type ResponseInProgressEvent = API.ResponseInProgressEventOutput;
  export namespace ResponseInProgressEvent {
    export type Response = NonNullable<ResponseInProgressEvent['response']>;
  }
  export type ResponseCompletedEvent = API.ResponseCompletedEventOutput;
  export namespace ResponseCompletedEvent {
    export type Response = NonNullable<ResponseCompletedEvent['response']>;
  }
  export type ResponseFailedEvent = API.ResponseFailedEventOutput;
  export type OutputItemAddedEvent = API.OutputItemAddedEventOutput;
  export type OutputItemDoneEvent = API.OutputItemDoneEventOutput;
  export type TextDeltaEvent = API.TextDeltaEventOutput;
  export type TextDoneEvent = API.TextDoneEventOutput;
  export type ReasoningStartedEvent = API.ReasoningStartedEventOutput;
  export type SearchQueriesEvent = API.SearchQueriesEventOutput;
  export type SearchResultsEvent = API.SearchResultsEventOutput;
  export type FetchURLQueriesEvent = API.FetchUrlQueriesEventOutput;
  export type FetchURLResultsEvent = API.FetchUrlResultsEventOutput;
  export namespace FetchURLResultsEvent {
    export type Content = FetchURLResultsEvent['contents'][number];
  }
  export type ReasoningStoppedEvent = API.ReasoningStoppedEventOutput;
  export type ResponseSkillLoadedEvent = API.ResponseSkillLoadedEventOutput;
}

type Skill<Params extends API.ResponsesCreateParams> = NonNullable<Params['skills']>[number];
type Tool<Params extends API.ResponsesCreateParams> = NonNullable<Params['tools']>[number];

export namespace ResponsesCreateParams {
  export type Reasoning = NonNullable<API.ResponsesCreateParams['reasoning']>;
  export type BuiltinSkill = Extract<Skill<API.ResponsesCreateParams>, { type: 'builtin' }>;
  export type InlineSkill = Extract<Skill<API.ResponsesCreateParams>, { type: 'inline' }>;
  export type WebSearchTool = Extract<Tool<API.ResponsesCreateParams>, { type: 'web_search' }>;
  export namespace WebSearchTool {
    export type Filters = NonNullable<WebSearchTool['filters']>;
    export type UserLocation = NonNullable<WebSearchTool['user_location']>;
  }
  export type FetchURLTool = Extract<Tool<API.ResponsesCreateParams>, { type: 'fetch_url' }>;
  export type PeopleSearchTool = Extract<Tool<API.ResponsesCreateParams>, { type: 'people_search' }>;
  export type FinanceSearchTool = Extract<Tool<API.ResponsesCreateParams>, { type: 'finance_search' }>;
  export type SandboxTool = Extract<Tool<API.ResponsesCreateParams>, { type: 'sandbox' }>;
  export type McpTool = Extract<Tool<API.ResponsesCreateParams>, { type: 'mcp' }>;
}

export namespace ResponsesUsage {
  export type Cost = NonNullable<API.ResponsesUsage['cost']>;
  export type InputTokensDetails = NonNullable<API.ResponsesUsage['input_tokens_details']>;
  export type ToolCallsDetails = NonNullable<API.ResponsesUsage['tool_calls_details']>;
}

export namespace ResponseCreateParams {
  export type Reasoning = ResponsesCreateParams.Reasoning;
  export type BuiltinSkill = ResponsesCreateParams.BuiltinSkill;
  export type InlineSkill = ResponsesCreateParams.InlineSkill;
  export type WebSearchTool = ResponsesCreateParams.WebSearchTool;
  export namespace WebSearchTool {
    export type Filters = ResponsesCreateParams.WebSearchTool.Filters;
    export type UserLocation = ResponsesCreateParams.WebSearchTool.UserLocation;
  }
  export type FetchURLTool = ResponsesCreateParams.FetchURLTool;
  export type PeopleSearchTool = ResponsesCreateParams.PeopleSearchTool;
  export type FinanceSearchTool = ResponsesCreateParams.FinanceSearchTool;
  export type SandboxTool = ResponsesCreateParams.SandboxTool;
  export type McpTool = ResponsesCreateParams.McpTool;
  export type ResponseCreateParamsNonStreaming = API.Responses.ResponseCreateParamsNonStreaming;
  export type ResponseCreateParamsStreaming = API.Responses.ResponseCreateParamsStreaming;
}
