// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ResponsesAPI from './responses';
import * as Shared from '../shared';
import * as FilesAPI from './files';
import { FileContentParams, Files } from './files';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Responses extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);

  /**
   * Generate a response for the provided input with optional web search and
   * reasoning.
   */
  create(
    body: ResponseCreateParamsNonStreaming,
    options?: RequestOptions,
  ): APIPromise<ResponseCreateResponse>;
  create(
    body: ResponseCreateParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<ResponseStreamChunk>>;
  create(
    body: ResponseCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<ResponseStreamChunk> | ResponseCreateResponse>;
  create(
    body: ResponseCreateParams,
    options?: RequestOptions,
  ): APIPromise<ResponseCreateResponse> | APIPromise<Stream<ResponseStreamChunk>> {
    return this._client.post('/v1/responses', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ResponseCreateResponse>
      | APIPromise<Stream<ResponseStreamChunk>>;
  }

  /**
   * Retrieve a response by its ID. Use this to poll the status of background tasks.
   */
  retrieve(responseID: string, options?: RequestOptions): APIPromise<ResponseRetrieveResponse> {
    return this._client.get(path`/v1/responses/${responseID}`, options);
  }

  /**
   * Request cancellation of a response. Acts on durable state, so it works for
   * background responses that outlive the client connection as well as durably
   * routed foreground responses. The cancel is asynchronous: a 200 acknowledges the
   * request (status `cancelling`) and the run stops shortly after. Poll the retrieve
   * endpoint for the terminal status. Cancelling a run that is already terminal
   * returns 400. Ownership is enforced server side; an unknown id, or a response
   * belonging to a different account, returns 404.
   */
  cancel(responseID: string, options?: RequestOptions): APIPromise<ResponseCancelResponse> {
    return this._client.post(path`/v1/responses/${responseID}/cancel`, options);
  }
}

/**
 * Text annotation (e.g., URL citation)
 */
export interface Annotation {
  end_index?: number;

  start_index?: number;

  title?: string;

  type?: string;

  url?: string;
}

export interface ContentPart {
  text: string;

  /**
   * Type of a content part
   */
  type: 'output_text';

  annotations?: Array<Annotation>;
}

export interface ErrorInfo {
  message: string;

  code?: string;

  type?: string;
}

export interface FunctionCallOutputItem {
  id: string;

  /**
   * JSON string of arguments
   */
  arguments: string;

  /**
   * Correlates with function_call_output input
   */
  call_id: string;

  name: string;

  /**
   * Status of a response or output item
   */
  status: 'completed' | 'failed' | 'in_progress' | 'queued' | 'cancelled' | 'requires_action';

  type: 'function_call';

  /**
   * Base64-encoded opaque signature for thinking models
   */
  thought_signature?: string;
}

export interface FunctionTool {
  /**
   * The name of the function
   */
  name: string;

  type: 'function';

  /**
   * A description of what the function does
   */
  description?: string;

  /**
   * JSON Schema defining the function's parameters
   */
  parameters?: { [key: string]: unknown };

  /**
   * Whether to enable strict schema validation
   */
  strict?: boolean;
}

export type InputItem =
  | InputItem.InputMessage
  | InputItem.FunctionCallOutputInput
  | InputItem.FunctionCallInput;

export namespace InputItem {
  export interface InputMessage {
    /**
     * Message content - either a string or array of content parts
     */
    content: string | Array<InputMessage.ContentPartArray>;

    role: 'user' | 'assistant' | 'system' | 'developer';

    type: 'message';
  }

  export namespace InputMessage {
    export interface ContentPartArray {
      type: 'input_text' | 'input_image';

      image_url?: string;

      text?: string;
    }
  }

  export interface FunctionCallOutputInput {
    /**
     * The call_id from function_call output
     */
    call_id: string;

    /**
     * Function result (JSON string)
     */
    output: string;

    type: 'function_call_output';

    /**
     * Function name (required by some providers)
     */
    name?: string;

    /**
     * Base64-encoded signature from function_call
     */
    thought_signature?: string;
  }

  export interface FunctionCallInput {
    /**
     * Function arguments (JSON string)
     */
    arguments: string;

    /**
     * The call_id that correlates with function_call_output
     */
    call_id: string;

    /**
     * The function name
     */
    name: string;

    type: 'function_call';

    /**
     * Base64-encoded signature for thinking models
     */
    thought_signature?: string;
  }
}

/**
 * One item in the response output: an assistant message, retrieved tool results,
 * or a record of a tool call.
 */
export type OutputItem =
  | OutputItem.MessageOutputItem
  | OutputItem.SearchResultsOutputItem
  | OutputItem.FetchURLResultsOutputItem
  | FunctionCallOutputItem
  | OutputItem.McpListToolsOutputItem
  | OutputItem.McpCallOutputItem
  | OutputItem.SkillLoadedOutputItem
  | OutputItem.AdvisorResultOutputItem
  | OutputItem.SandboxResultsOutputItem
  | OutputItem.SandboxWriteFileOutputItem
  | OutputItem.SandboxReadFileOutputItem
  | OutputItem.SandboxEditFileOutputItem
  | OutputItem.SandboxGrepOutputItem
  | OutputItem.SandboxGlobOutputItem
  | OutputItem.SandboxApplyPatchOutputItem
  | OutputItem.ShareFileOutputItem
  | OutputItem.UnknownOutputItem;

export namespace OutputItem {
  export interface MessageOutputItem {
    id: string;

    content: Array<ResponsesAPI.ContentPart>;

    /**
     * Role in a message
     */
    role: 'assistant';

    /**
     * Status of a response or output item
     */
    status: 'completed' | 'failed' | 'in_progress' | 'queued' | 'cancelled' | 'requires_action';

    type: 'message';
  }

  export interface SearchResultsOutputItem {
    results: Array<Shared.SearchResult>;

    type: 'search_results';

    queries?: Array<string>;
  }

  export interface FetchURLResultsOutputItem {
    contents: Array<FetchURLResultsOutputItem.Content>;

    type: 'fetch_url_results';
  }

  export namespace FetchURLResultsOutputItem {
    /**
     * Content fetched from a URL
     */
    export interface Content {
      /**
       * The fetched content snippet
       */
      snippet: string;

      /**
       * The title of the page
       */
      title: string;

      /**
       * The URL from which content was fetched
       */
      url: string;
    }
  }

  /**
   * Tools discovered on one external MCP server at boot. Matches OpenAI's
   * mcp_list_tools item.
   */
  export interface McpListToolsOutputItem {
    id: string;

    server_label: string;

    tools: Array<McpListToolsOutputItem.Tool>;

    type: 'mcp_list_tools';

    error?: string;
  }

  export namespace McpListToolsOutputItem {
    /**
     * One tool discovered on a remote MCP server.
     */
    export interface Tool {
      /**
       * The server's JSON Schema for the tool, passed through unmodified.
       */
      input_schema: { [key: string]: unknown };

      name: string;

      description?: string;
    }
  }

  /**
   * One tool call executed against an external MCP server, modeled on OpenAI's
   * mcp_call item.
   */
  export interface McpCallOutputItem {
    id: string;

    /**
     * JSON-encoded arguments the model passed.
     */
    arguments: string;

    name: string;

    server_label: string;

    type: 'mcp_call';

    /**
     * The failure string when the call failed (also returned to the model in-band);
     * null on success, matching OpenAI's mcp_call.
     */
    error?: string | null;

    /**
     * Tool output text; empty when the call failed.
     */
    output?: string;
  }

  /**
   * Per-call result emitted by the `load_skill` tool. Only the resolved skill name
   * is surfaced here; the skill body itself lives in the function_call_output input
   * item the model consumes on its next turn.
   */
  export interface SkillLoadedOutputItem {
    /**
     * Name of the skill that was loaded.
     */
    name: string;

    type: 'skill_loaded';
  }

  /**
   * Preview API. Advisor tool invocation emitted in `response.output[]`. The advisor
   * result is server-side guidance consumed by the agent loop; it is not a
   * client-executable function call.
   */
  export interface AdvisorResultOutputItem {
    call_id: string;

    /**
     * Status of a response or output item
     */
    status: 'completed' | 'failed' | 'in_progress' | 'queued' | 'cancelled' | 'requires_action';

    type: 'advisor_result';

    /**
     * Guidance returned by the advisor model.
     */
    advice?: string;

    /**
     * Raw JSON arguments the executor passed to the advisor tool.
     */
    arguments?: string;

    /**
     * Non-fatal advisor error code when the advisor call failed.
     */
    error_code?: string;

    /**
     * Non-fatal advisor error message when the advisor call failed.
     */
    error_message?: string;

    /**
     * Parsed advisor question when present in arguments.
     */
    question?: string;
  }

  /**
   * Sandbox tool results emitted in `response.output[]`. Cost is aggregated into
   * `Usage.tool_calls_details.sandbox.cost_usd`; this item does not carry
   * per-execution cost.
   */
  export interface SandboxResultsOutputItem {
    call_id: string;

    code: string;

    language: 'python' | 'bash';

    results: Array<SandboxResultsOutputItem.Result>;

    status: 'in_progress' | 'completed' | 'failed' | 'timed_out';

    type: 'sandbox_results';

    container_id?: string;
  }

  export namespace SandboxResultsOutputItem {
    /**
     * One sandbox execution result. `status` describes whether the sandbox runner
     * completed, failed, or timed out. `exit_code` is the program exit code, so
     * `status: completed` can still have a non-zero `exit_code`.
     */
    export interface Result {
      duration_ms: number;

      exit_code: number;

      status: 'in_progress' | 'completed' | 'failed' | 'timed_out';

      stderr: string;

      stdout: string;
    }
  }

  /**
   * Per-invocation result of the `write` tool inside the sandbox.
   */
  export interface SandboxWriteFileOutputItem {
    call_id: string;

    file_path: string;

    type: 'sandbox_write_file';

    error?: string;

    size_bytes?: number;
  }

  /**
   * Per-invocation result of the `read` tool inside the sandbox.
   */
  export interface SandboxReadFileOutputItem {
    call_id: string;

    file_path: string;

    type: 'sandbox_read_file';

    content?: string;

    error?: string;

    start_line?: number;

    total_lines?: number;
  }

  /**
   * Per-invocation result of the `edit` tool inside the sandbox.
   */
  export interface SandboxEditFileOutputItem {
    call_id: string;

    type: 'sandbox_edit_file';

    error?: string;

    file_path?: string;

    message?: string;
  }

  /**
   * Per-invocation result of the `grep` tool inside the sandbox.
   */
  export interface SandboxGrepOutputItem {
    call_id: string;

    type: 'sandbox_grep';

    count?: number;

    error?: string;

    files?: Array<string>;

    truncated?: boolean;
  }

  /**
   * Per-invocation result of the `glob` tool inside the sandbox.
   */
  export interface SandboxGlobOutputItem {
    call_id: string;

    type: 'sandbox_glob';

    count?: number;

    error?: string;

    files?: Array<string>;

    truncated?: boolean;
  }

  /**
   * Per-invocation result of the `apply_patch` tool inside the sandbox.
   */
  export interface SandboxApplyPatchOutputItem {
    call_id: string;

    type: 'sandbox_apply_patch';

    added?: Array<string>;

    deleted?: Array<string>;

    error?: string;

    modified?: Array<string>;
  }

  /**
   * Result of one `share_file` tool call. On success, file_id and filename identify
   * a sandbox file downloadable at url.
   */
  export interface ShareFileOutputItem {
    call_id: string;

    type: 'share_file';

    error?: string;

    file_id?: string;

    filename?: string;

    size_bytes?: number;

    /**
     * Relative download path, /v1/responses/{id}/files/{file_id}/content.
     */
    url?: string;
  }

  /**
   * Forward-compat fallback for proto OutputItem variants the gateway does not yet
   * have a typed schema for.
   */
  export interface UnknownOutputItem {
    item_name: string;

    payload: { [key: string]: unknown };

    type: 'unknown';
  }
}

/**
 * Metadata for a file shared from a response sandbox via the share_file tool.
 */
export interface ResponseFile {
  /**
   * File identifier, scoped to the parent response.
   */
  id: string;

  /**
   * Size of the file in bytes.
   */
  bytes: number;

  /**
   * Unix timestamp (seconds) when the file was produced.
   */
  created_at: number;

  /**
   * Original filename set by the share_file tool call.
   */
  filename: string;

  /**
   * Object type. Always `file`.
   */
  object: 'file';
}

export interface ResponseFileList {
  data: Array<ResponseFile>;

  /**
   * Object type. Always `list`.
   */
  object: 'list';
}

/**
 * SSE stream event. Discriminate by the `type` field:
 *
 * - `response.created`: Initial response object
 * - `response.in_progress`: Response processing started
 * - `response.completed`: Final response with output
 * - `response.failed`: Error occurred
 * - `response.output_item.added`: New output item started
 * - `response.output_item.done`: Output item completed
 * - `response.output_text.delta`: Streaming text delta
 * - `response.output_text.done`: Final text content
 * - `response.reasoning.started`: Reasoning phase started
 * - `response.reasoning.search_queries`: Search queries issued
 * - `response.reasoning.search_results`: Search results received
 * - `response.reasoning.fetch_url_queries`: URL fetch queries issued
 * - `response.reasoning.fetch_url_results`: URL fetch results received
 * - `response.reasoning.stopped`: Reasoning phase complete
 * - `response.skill.loaded`: load_skill resolved a skill body
 */
export type ResponseStreamChunk =
  | ResponseStreamChunk.ResponseCreatedEvent
  | ResponseStreamChunk.ResponseInProgressEvent
  | ResponseStreamChunk.ResponseCompletedEvent
  | ResponseStreamChunk.ResponseFailedEvent
  | ResponseStreamChunk.OutputItemAddedEvent
  | ResponseStreamChunk.OutputItemDoneEvent
  | ResponseStreamChunk.TextDeltaEvent
  | ResponseStreamChunk.TextDoneEvent
  | ResponseStreamChunk.ReasoningStartedEvent
  | ResponseStreamChunk.SearchQueriesEvent
  | ResponseStreamChunk.SearchResultsEvent
  | ResponseStreamChunk.FetchURLQueriesEvent
  | ResponseStreamChunk.FetchURLResultsEvent
  | ResponseStreamChunk.ReasoningStoppedEvent
  | ResponseStreamChunk.ResponseSkillLoadedEvent;

export namespace ResponseStreamChunk {
  /**
   * Response created event (type: "response.created"). Contains the initial response
   * object.
   */
  export interface ResponseCreatedEvent {
    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.created")
     */
    type: 'response.created';

    /**
     * Non-streaming response returned when stream is false
     */
    response?: ResponseCreatedEvent.Response;
  }

  export namespace ResponseCreatedEvent {
    /**
     * Non-streaming response returned when stream is false
     */
    export interface Response {
      id: string;

      created_at: number;

      model: string;

      /**
       * Object type in API responses
       */
      object: 'response';

      output: Array<ResponsesAPI.OutputItem>;

      /**
       * Status of a response or output item
       */
      status: 'completed' | 'failed' | 'in_progress' | 'queued' | 'cancelled' | 'requires_action';

      /**
       * Whether the response was created in background mode.
       */
      background?: boolean;

      error?: ResponsesAPI.ErrorInfo;

      /**
       * ID of the previous response in the chain, when the response was created with
       * previous_response_id.
       */
      previous_response_id?: string | null;

      /**
       * Whether the response is stored and visible to later retrieve calls. A response
       * created with store=false can still be used as a previous_response_id
       * continuation source.
       */
      store?: boolean;

      usage?: ResponsesAPI.ResponsesUsage;
    }
  }

  /**
   * Response in progress event (type: "response.in_progress"). Emitted when response
   * processing has started.
   */
  export interface ResponseInProgressEvent {
    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.in_progress")
     */
    type: 'response.in_progress';

    /**
     * Non-streaming response returned when stream is false
     */
    response?: ResponseInProgressEvent.Response;
  }

  export namespace ResponseInProgressEvent {
    /**
     * Non-streaming response returned when stream is false
     */
    export interface Response {
      id: string;

      created_at: number;

      model: string;

      /**
       * Object type in API responses
       */
      object: 'response';

      output: Array<ResponsesAPI.OutputItem>;

      /**
       * Status of a response or output item
       */
      status: 'completed' | 'failed' | 'in_progress' | 'queued' | 'cancelled' | 'requires_action';

      /**
       * Whether the response was created in background mode.
       */
      background?: boolean;

      error?: ResponsesAPI.ErrorInfo;

      /**
       * ID of the previous response in the chain, when the response was created with
       * previous_response_id.
       */
      previous_response_id?: string | null;

      /**
       * Whether the response is stored and visible to later retrieve calls. A response
       * created with store=false can still be used as a previous_response_id
       * continuation source.
       */
      store?: boolean;

      usage?: ResponsesAPI.ResponsesUsage;
    }
  }

  /**
   * Response event Contains the full or partial response object.
   */
  export interface ResponseCompletedEvent {
    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.completed")
     */
    type: 'response.completed';

    /**
     * Non-streaming response returned when stream is false
     */
    response?: ResponseCompletedEvent.Response;
  }

  export namespace ResponseCompletedEvent {
    /**
     * Non-streaming response returned when stream is false
     */
    export interface Response {
      id: string;

      created_at: number;

      model: string;

      /**
       * Object type in API responses
       */
      object: 'response';

      output: Array<ResponsesAPI.OutputItem>;

      /**
       * Status of a response or output item
       */
      status: 'completed' | 'failed' | 'in_progress' | 'queued' | 'cancelled' | 'requires_action';

      /**
       * Whether the response was created in background mode.
       */
      background?: boolean;

      error?: ResponsesAPI.ErrorInfo;

      /**
       * ID of the previous response in the chain, when the response was created with
       * previous_response_id.
       */
      previous_response_id?: string | null;

      /**
       * Whether the response is stored and visible to later retrieve calls. A response
       * created with store=false can still be used as a previous_response_id
       * continuation source.
       */
      store?: boolean;

      usage?: ResponsesAPI.ResponsesUsage;
    }
  }

  /**
   * Response failed event (type: "response.failed"). Contains error details when
   * streaming fails.
   */
  export interface ResponseFailedEvent {
    error: ResponsesAPI.ErrorInfo;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.failed")
     */
    type: 'response.failed';
  }

  /**
   * Output item added event (type: "response.output_item.added"). Emitted when a new
   * output item (message or tool call) starts.
   */
  export interface OutputItemAddedEvent {
    /**
     * One item in the response output: an assistant message, retrieved tool results,
     * or a record of a tool call.
     */
    item: ResponsesAPI.OutputItem;

    output_index: number;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.output_item.added")
     */
    type: 'response.output_item.added';
  }

  /**
   * Output item done event (type: "response.output_item.done"). Emitted when an
   * output item (message or tool call) completes.
   */
  export interface OutputItemDoneEvent {
    /**
     * One item in the response output: an assistant message, retrieved tool results,
     * or a record of a tool call.
     */
    item: ResponsesAPI.OutputItem;

    output_index: number;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.output_item.done")
     */
    type: 'response.output_item.done';
  }

  /**
   * Text delta event (type: "response.output_text.delta"). Contains incremental text
   * content.
   */
  export interface TextDeltaEvent {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.output_text.delta")
     */
    type: 'response.output_text.delta';
  }

  /**
   * Text done event (type: "response.output_text.done"). Contains the final text
   * content.
   */
  export interface TextDoneEvent {
    content_index: number;

    item_id: string;

    output_index: number;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    text: string;

    /**
     * SSE event type discriminator (always "response.output_text.done")
     */
    type: 'response.output_text.done';
  }

  /**
   * Reasoning started event (type: "response.reasoning.started"). Signals the model
   * has started reasoning/searching.
   */
  export interface ReasoningStartedEvent {
    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.reasoning.started")
     */
    type: 'response.reasoning.started';

    thought?: string;
  }

  /**
   * Search queries event (type: "response.reasoning.search_queries"). Contains
   * search queries being executed.
   */
  export interface SearchQueriesEvent {
    queries: Array<string>;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.reasoning.search_queries")
     */
    type: 'response.reasoning.search_queries';

    thought?: string;
  }

  /**
   * Search results event (type: "response.reasoning.search_results"). Contains
   * search results returned.
   */
  export interface SearchResultsEvent {
    results: Array<Shared.SearchResult>;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.reasoning.search_results")
     */
    type: 'response.reasoning.search_results';

    thought?: string;

    usage?: ResponsesAPI.ResponsesUsage;
  }

  /**
   * URL fetch queries event (type: "response.reasoning.fetch_url_queries"). Contains
   * URLs being fetched.
   */
  export interface FetchURLQueriesEvent {
    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.reasoning.fetch_url_queries")
     */
    type: 'response.reasoning.fetch_url_queries';

    urls: Array<string>;

    thought?: string;
  }

  /**
   * URL fetch results event (type: "response.reasoning.fetch_url_results"). Contains
   * fetched URL contents.
   */
  export interface FetchURLResultsEvent {
    contents: Array<FetchURLResultsEvent.Content>;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.reasoning.fetch_url_results")
     */
    type: 'response.reasoning.fetch_url_results';

    thought?: string;
  }

  export namespace FetchURLResultsEvent {
    /**
     * Content fetched from a URL
     */
    export interface Content {
      /**
       * The fetched content snippet
       */
      snippet: string;

      /**
       * The title of the page
       */
      title: string;

      /**
       * The URL from which content was fetched
       */
      url: string;
    }
  }

  /**
   * Reasoning stopped event (type: "response.reasoning.stopped"). Signals the model
   * has finished reasoning/searching.
   */
  export interface ReasoningStoppedEvent {
    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.reasoning.stopped")
     */
    type: 'response.reasoning.stopped';

    thought?: string;
  }

  /**
   * Skill loaded event (type: "response.skill.loaded"). Fires when load_skill
   * resolves a known skill. The skill body stays in the model conversation prefix;
   * this event carries only the name for client rendering.
   */
  export interface ResponseSkillLoadedEvent {
    /**
     * Name of the skill that was loaded.
     */
    name: string;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator (always "response.skill.loaded")
     */
    type: 'response.skill.loaded';
  }
}

export interface ResponsesCreateParams {
  /**
   * Input content - either a string or array of input items
   */
  input: string | Array<InputItem>;

  /**
   * Run the response asynchronously. When true, the request is queued and the
   * response object's `status` will be `queued` or `in_progress`. Poll GET
   * /v1/responses/{response_id} to retrieve the final result.
   */
  background?: boolean | null;

  /**
   * System instructions for the model
   */
  instructions?: string;

  /**
   * ISO 639-1 language code for response language
   */
  language_preference?: string;

  /**
   * Maximum tokens to generate
   */
  max_output_tokens?: number;

  /**
   * Maximum number of research loop steps. If provided, overrides the preset's
   * max_steps value. Must be >= 1 if specified. Maximum allowed is 100.
   */
  max_steps?: number;

  /**
   * Model ID in provider/model format (e.g., "xai/grok-4-1", "openai/gpt-4o"). If
   * models is also provided, models takes precedence. Required if neither models nor
   * preset is provided.
   */
  model?: string;

  /**
   * Model fallback chain. Each model is in provider/model format. Models are tried
   * in order until one succeeds. Max 5 models allowed. If set, takes precedence over
   * single model field. The response.model will reflect the model that actually
   * succeeded.
   */
  models?: Array<string>;

  /**
   * Preset configuration name (e.g., "sonar-pro", "sonar-reasoning"). Pre-configured
   * model with system prompt and search parameters. Required if model is not
   * provided.
   */
  preset?: string;

  /**
   * OpenAI-compatible previous response id for multi-turn response chains. When set,
   * the new response continues from the completed prior response using its durable
   * continuation snapshot. The prior response must belong to the same account and
   * have completed.
   */
  previous_response_id?: string;

  reasoning?: ResponsesCreateParams.Reasoning;

  /**
   * Specifies the desired output format for the model response
   */
  response_format?: Shared.ResponseFormat;

  /**
   * Built-in and request-scoped inline skills available to the model. Skill metadata
   * is disclosed to the model up front; full instructions are loaded on demand
   * through the `load_skill` tool. Selecting any skill enables the sandbox tool for
   * the request. Requests with skills run on the durable backend and skills are not
   * echoed back on Response objects.
   */
  skills?: Array<ResponsesCreateParams.BuiltinSkill | ResponsesCreateParams.InlineSkill>;

  /**
   * OpenAI-compatible storage toggle. When false, the response is hidden from later
   * retrieve calls, and the echoed response reports `store: false`. It can still be
   * used as a `previous_response_id` continuation source.
   */
  store?: boolean;

  /**
   * If true, returns SSE stream instead of JSON
   */
  stream?: boolean;

  /**
   * Tools available to the model
   */
  tools?: Array<
    | ResponsesCreateParams.WebSearchTool
    | ResponsesCreateParams.FetchURLTool
    | ResponsesCreateParams.PeopleSearchTool
    | FunctionTool
    | ResponsesCreateParams.FinanceSearchTool
    | ResponsesCreateParams.SandboxTool
    | ResponsesCreateParams.McpTool
  >;
}

export namespace ResponsesCreateParams {
  export interface Reasoning {
    /**
     * How much effort the model should spend on reasoning
     */
    effort?: 'minimal' | 'low' | 'medium' | 'high' | 'xhigh';
  }

  /**
   * Selects a built-in skill from the catalog by name.
   */
  export interface BuiltinSkill {
    /**
     * Built-in skill to make available to the model. office is the full Office bundle
     * (enables all four leaves). office/docx, office/pdf, office/pptx, office/xlsx
     * each create polished documents of that type from scratch, with structural
     * validation and visual QA.
     */
    name: 'office' | 'office/docx' | 'office/pdf' | 'office/pptx' | 'office/xlsx';

    type: 'builtin';
  }

  /**
   * Request-scoped skill defined inline. Inline skills have no files or sandbox
   * mounts and are never echoed back in the response.
   */
  export interface InlineSkill {
    /**
     * Short discovery description, limited to 1,024 UTF-8 bytes.
     */
    description: string;

    /**
     * Instructions returned by `load_skill`, limited to 65,536 UTF-8 bytes per skill
     * and 262,144 bytes across the request.
     */
    instructions: string;

    /**
     * Request-scoped lowercase ASCII name separated by single hyphens.
     */
    name: string;

    type: 'inline';
  }

  export interface WebSearchTool {
    type: 'web_search';

    filters?: WebSearchTool.Filters;

    max_tokens?: number;

    max_tokens_per_page?: number;

    /**
     * Search context size (low, medium, high). Omit when supplying explicit max_tokens
     * / max_tokens_per_page.
     */
    search_context_size?: 'low' | 'medium' | 'high';

    /**
     * User's geographic location for search personalization
     */
    user_location?: WebSearchTool.UserLocation;
  }

  export namespace WebSearchTool {
    export interface Filters {
      /**
       * Input: MM/DD/YYYY, Output: YYYY-MM-DD
       */
      last_updated_after_filter?: string;

      /**
       * Input: MM/DD/YYYY, Output: YYYY-MM-DD
       */
      last_updated_before_filter?: string;

      /**
       * Input: MM/DD/YYYY, Output: YYYY-MM-DD
       */
      search_after_date_filter?: string;

      /**
       * Input: MM/DD/YYYY, Output: YYYY-MM-DD
       */
      search_before_date_filter?: string;

      search_domain_filter?: Array<string>;

      search_recency_filter?: 'hour' | 'day' | 'week' | 'month' | 'year';
    }

    /**
     * User's geographic location for search personalization
     */
    export interface UserLocation {
      city?: string;

      /**
       * ISO 3166-1 alpha-2 country code
       */
      country?: string;

      latitude?: number;

      longitude?: number;

      region?: string;
    }
  }

  export interface FetchURLTool {
    type: 'fetch_url';

    /**
     * Maximum number of URLs to fetch per tool call
     */
    max_urls?: number;
  }

  export interface PeopleSearchTool {
    /**
     * Enables the `people_search` tool.
     */
    type: 'people_search';
  }

  export interface FinanceSearchTool {
    /**
     * Enables the `finance_search` tool. The model can request structured financial
     * data (quotes, financials, segments, earnings transcripts, etc.) via
     * category-based fan-out to FMP, Finchat, and Quartr.
     */
    type: 'finance_search';
  }

  export interface SandboxTool {
    /**
     * Enables the `sandbox` tool. The model can execute code in an isolated container
     * during the request and use the result in its final answer.
     */
    type: 'sandbox';
  }

  /**
   * Connects a user-supplied remote MCP server. The worker discovers the server's
   * tools at boot and calls them like native tools. Matches OpenAI's mcp tool.
   * `require_approval`, `connector_id`, and `defer_loading` are not supported in v1
   * and are ignored if sent: every call auto-runs, and only bring-your-own
   * `server_url` is honored.
   */
  export interface McpTool {
    /**
     * Unique per request, ^[a-zA-Z0-9_-]{1,64}$. Namespaces the server's tools.
     */
    server_label: string;

    /**
     * HTTPS URL of the remote MCP server.
     */
    server_url: string;

    type: 'mcp';

    /**
     * Optional allowlist of tool names. Empty exposes all discovered tools.
     */
    allowed_tools?: Array<string>;

    /**
     * An OAuth access token that can be used with a remote MCP server, with a custom
     * MCP server URL. Never logged or echoed.
     */
    authorization?: string;

    /**
     * Extra request headers. Never logged or echoed.
     */
    headers?: { [key: string]: string };
  }
}

export interface ResponsesUsage {
  input_tokens: number;

  output_tokens: number;

  total_tokens: number;

  cost?: ResponsesUsage.Cost;

  input_tokens_details?: ResponsesUsage.InputTokensDetails;

  tool_calls_details?: { [key: string]: ResponsesUsage.ToolCallsDetails };
}

export namespace ResponsesUsage {
  export interface Cost {
    /**
     * Currency code for cost values
     */
    currency: 'USD';

    input_cost: number;

    output_cost: number;

    total_cost: number;

    cache_creation_cost?: number;

    cache_read_cost?: number;

    tool_calls_cost?: number;
  }

  export interface InputTokensDetails {
    cache_creation_input_tokens?: number;

    cache_read_input_tokens?: number;
  }

  export interface ToolCallsDetails {
    /**
     * Number of times this tool was invoked
     */
    invocation?: number;
  }
}

/**
 * Non-streaming response returned when stream is false
 */
export interface ResponseCreateResponse {
  id: string;

  created_at: number;

  model: string;

  /**
   * Object type in API responses
   */
  object: 'response';

  output: Array<OutputItem>;

  /**
   * Status of a response or output item
   */
  status: 'completed' | 'failed' | 'in_progress' | 'queued' | 'cancelled' | 'requires_action';

  /**
   * Whether the response was created in background mode.
   */
  background?: boolean;

  error?: ErrorInfo;

  /**
   * ID of the previous response in the chain, when the response was created with
   * previous_response_id.
   */
  previous_response_id?: string | null;

  /**
   * Whether the response is stored and visible to later retrieve calls. A response
   * created with store=false can still be used as a previous_response_id
   * continuation source.
   */
  store?: boolean;

  usage?: ResponsesUsage;
}

/**
 * Non-streaming response returned when stream is false
 */
export interface ResponseRetrieveResponse {
  id: string;

  created_at: number;

  model: string;

  /**
   * Object type in API responses
   */
  object: 'response';

  output: Array<OutputItem>;

  /**
   * Status of a response or output item
   */
  status: 'completed' | 'failed' | 'in_progress' | 'queued' | 'cancelled' | 'requires_action';

  /**
   * Whether the response was created in background mode.
   */
  background?: boolean;

  error?: ErrorInfo;

  /**
   * ID of the previous response in the chain, when the response was created with
   * previous_response_id.
   */
  previous_response_id?: string | null;

  /**
   * Whether the response is stored and visible to later retrieve calls. A response
   * created with store=false can still be used as a previous_response_id
   * continuation source.
   */
  store?: boolean;

  usage?: ResponsesUsage;
}

export interface ResponseCancelResponse {
  /**
   * The response id (resp\_...).
   */
  response_id: string;

  /**
   * Always `cancelling`: the cancel was accepted and the run stops asynchronously.
   * An already terminal run returns 400 instead, so no terminal status appears here.
   */
  status: 'cancelling';
}

export type ResponseCreateParams = ResponseCreateParamsNonStreaming | ResponseCreateParamsStreaming;

export interface ResponseCreateParamsBase {
  /**
   * Input content - either a string or array of input items
   */
  input: string | Array<InputItem>;

  /**
   * Run the response asynchronously. When true, the request is queued and the
   * response object's `status` will be `queued` or `in_progress`. Poll GET
   * /v1/responses/{response_id} to retrieve the final result.
   */
  background?: boolean | null;

  /**
   * System instructions for the model
   */
  instructions?: string;

  /**
   * ISO 639-1 language code for response language
   */
  language_preference?: string;

  /**
   * Maximum tokens to generate
   */
  max_output_tokens?: number;

  /**
   * Maximum number of research loop steps. If provided, overrides the preset's
   * max_steps value. Must be >= 1 if specified. Maximum allowed is 100.
   */
  max_steps?: number;

  /**
   * Model ID in provider/model format (e.g., "xai/grok-4-1", "openai/gpt-4o"). If
   * models is also provided, models takes precedence. Required if neither models nor
   * preset is provided.
   */
  model?: string;

  /**
   * Model fallback chain. Each model is in provider/model format. Models are tried
   * in order until one succeeds. Max 5 models allowed. If set, takes precedence over
   * single model field. The response.model will reflect the model that actually
   * succeeded.
   */
  models?: Array<string>;

  /**
   * Preset configuration name (e.g., "sonar-pro", "sonar-reasoning"). Pre-configured
   * model with system prompt and search parameters. Required if model is not
   * provided.
   */
  preset?: string;

  /**
   * OpenAI-compatible previous response id for multi-turn response chains. When set,
   * the new response continues from the completed prior response using its durable
   * continuation snapshot. The prior response must belong to the same account and
   * have completed.
   */
  previous_response_id?: string;

  reasoning?: ResponseCreateParams.Reasoning;

  /**
   * Specifies the desired output format for the model response
   */
  response_format?: Shared.ResponseFormat;

  /**
   * Built-in and request-scoped inline skills available to the model. Skill metadata
   * is disclosed to the model up front; full instructions are loaded on demand
   * through the `load_skill` tool. Selecting any skill enables the sandbox tool for
   * the request. Requests with skills run on the durable backend and skills are not
   * echoed back on Response objects.
   */
  skills?: Array<ResponseCreateParams.BuiltinSkill | ResponseCreateParams.InlineSkill>;

  /**
   * OpenAI-compatible storage toggle. When false, the response is hidden from later
   * retrieve calls, and the echoed response reports `store: false`. It can still be
   * used as a `previous_response_id` continuation source.
   */
  store?: boolean;

  /**
   * If true, returns SSE stream instead of JSON
   */
  stream?: boolean;

  /**
   * Tools available to the model
   */
  tools?: Array<
    | ResponseCreateParams.WebSearchTool
    | ResponseCreateParams.FetchURLTool
    | ResponseCreateParams.PeopleSearchTool
    | FunctionTool
    | ResponseCreateParams.FinanceSearchTool
    | ResponseCreateParams.SandboxTool
    | ResponseCreateParams.McpTool
  >;
}

export namespace ResponseCreateParams {
  export interface Reasoning {
    /**
     * How much effort the model should spend on reasoning
     */
    effort?: 'minimal' | 'low' | 'medium' | 'high' | 'xhigh';
  }

  /**
   * Selects a built-in skill from the catalog by name.
   */
  export interface BuiltinSkill {
    /**
     * Built-in skill to make available to the model. office is the full Office bundle
     * (enables all four leaves). office/docx, office/pdf, office/pptx, office/xlsx
     * each create polished documents of that type from scratch, with structural
     * validation and visual QA.
     */
    name: 'office' | 'office/docx' | 'office/pdf' | 'office/pptx' | 'office/xlsx';

    type: 'builtin';
  }

  /**
   * Request-scoped skill defined inline. Inline skills have no files or sandbox
   * mounts and are never echoed back in the response.
   */
  export interface InlineSkill {
    /**
     * Short discovery description, limited to 1,024 UTF-8 bytes.
     */
    description: string;

    /**
     * Instructions returned by `load_skill`, limited to 65,536 UTF-8 bytes per skill
     * and 262,144 bytes across the request.
     */
    instructions: string;

    /**
     * Request-scoped lowercase ASCII name separated by single hyphens.
     */
    name: string;

    type: 'inline';
  }

  export interface WebSearchTool {
    type: 'web_search';

    filters?: WebSearchTool.Filters;

    max_tokens?: number;

    max_tokens_per_page?: number;

    /**
     * Search context size (low, medium, high). Omit when supplying explicit max_tokens
     * / max_tokens_per_page.
     */
    search_context_size?: 'low' | 'medium' | 'high';

    /**
     * User's geographic location for search personalization
     */
    user_location?: WebSearchTool.UserLocation;
  }

  export namespace WebSearchTool {
    export interface Filters {
      /**
       * Input: MM/DD/YYYY, Output: YYYY-MM-DD
       */
      last_updated_after_filter?: string;

      /**
       * Input: MM/DD/YYYY, Output: YYYY-MM-DD
       */
      last_updated_before_filter?: string;

      /**
       * Input: MM/DD/YYYY, Output: YYYY-MM-DD
       */
      search_after_date_filter?: string;

      /**
       * Input: MM/DD/YYYY, Output: YYYY-MM-DD
       */
      search_before_date_filter?: string;

      search_domain_filter?: Array<string>;

      search_recency_filter?: 'hour' | 'day' | 'week' | 'month' | 'year';
    }

    /**
     * User's geographic location for search personalization
     */
    export interface UserLocation {
      city?: string;

      /**
       * ISO 3166-1 alpha-2 country code
       */
      country?: string;

      latitude?: number;

      longitude?: number;

      region?: string;
    }
  }

  export interface FetchURLTool {
    type: 'fetch_url';

    /**
     * Maximum number of URLs to fetch per tool call
     */
    max_urls?: number;
  }

  export interface PeopleSearchTool {
    /**
     * Enables the `people_search` tool.
     */
    type: 'people_search';
  }

  export interface FinanceSearchTool {
    /**
     * Enables the `finance_search` tool. The model can request structured financial
     * data (quotes, financials, segments, earnings transcripts, etc.) via
     * category-based fan-out to FMP, Finchat, and Quartr.
     */
    type: 'finance_search';
  }

  export interface SandboxTool {
    /**
     * Enables the `sandbox` tool. The model can execute code in an isolated container
     * during the request and use the result in its final answer.
     */
    type: 'sandbox';
  }

  /**
   * Connects a user-supplied remote MCP server. The worker discovers the server's
   * tools at boot and calls them like native tools. Matches OpenAI's mcp tool.
   * `require_approval`, `connector_id`, and `defer_loading` are not supported in v1
   * and are ignored if sent: every call auto-runs, and only bring-your-own
   * `server_url` is honored.
   */
  export interface McpTool {
    /**
     * Unique per request, ^[a-zA-Z0-9_-]{1,64}$. Namespaces the server's tools.
     */
    server_label: string;

    /**
     * HTTPS URL of the remote MCP server.
     */
    server_url: string;

    type: 'mcp';

    /**
     * Optional allowlist of tool names. Empty exposes all discovered tools.
     */
    allowed_tools?: Array<string>;

    /**
     * An OAuth access token that can be used with a remote MCP server, with a custom
     * MCP server URL. Never logged or echoed.
     */
    authorization?: string;

    /**
     * Extra request headers. Never logged or echoed.
     */
    headers?: { [key: string]: string };
  }

  export type ResponseCreateParamsNonStreaming = ResponsesAPI.ResponseCreateParamsNonStreaming;
  export type ResponseCreateParamsStreaming = ResponsesAPI.ResponseCreateParamsStreaming;
}

export interface ResponseCreateParamsNonStreaming extends ResponseCreateParamsBase {
  /**
   * If true, returns SSE stream instead of JSON
   */
  stream?: false;
}

export interface ResponseCreateParamsStreaming extends ResponseCreateParamsBase {
  /**
   * If true, returns SSE stream instead of JSON
   */
  stream: true;
}

Responses.Files = Files;

export declare namespace Responses {
  export {
    type Annotation as Annotation,
    type ContentPart as ContentPart,
    type ErrorInfo as ErrorInfo,
    type FunctionCallOutputItem as FunctionCallOutputItem,
    type FunctionTool as FunctionTool,
    type InputItem as InputItem,
    type OutputItem as OutputItem,
    type ResponseFile as ResponseFile,
    type ResponseFileList as ResponseFileList,
    type ResponseStreamChunk as ResponseStreamChunk,
    type ResponsesCreateParams as ResponsesCreateParams,
    type ResponsesUsage as ResponsesUsage,
    type ResponseCreateResponse as ResponseCreateResponse,
    type ResponseRetrieveResponse as ResponseRetrieveResponse,
    type ResponseCancelResponse as ResponseCancelResponse,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
  };

  export { Files as Files, type FileContentParams as FileContentParams };
}
