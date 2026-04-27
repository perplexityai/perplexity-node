// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ResponsesAPI from './responses';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { RequestOptions } from '../internal/request-options';
import { addOutputText } from '../lib/add-output-text';

export class Responses extends APIResource {
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
    const promise = this._client.post('/v1/responses', { body, ...options, stream: body.stream ?? false });

    // For non-streaming responses, automatically add output_text property
    if (!body.stream) {
      return (promise as APIPromise<ResponseCreateResponse>)._thenUnwrap((rsp) => {
        if ('object' in rsp && rsp.object === 'response') {
          addOutputText(rsp as ResponseCreateResponse);
        }
        return rsp;
      }) as APIPromise<ResponseCreateResponse>;
    }

    return promise as APIPromise<Stream<ResponseStreamChunk>>;
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
  status: 'completed' | 'failed' | 'in_progress' | 'requires_action';

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

export type OutputItem =
  | OutputItem.MessageOutputItem
  | OutputItem.SearchResultsOutputItem
  | OutputItem.FetchURLResultsOutputItem
  | FunctionCallOutputItem;

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
    status: 'completed' | 'failed' | 'in_progress' | 'requires_action';

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
  | ResponseStreamChunk.ReasoningStoppedEvent;

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

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
      status: 'completed' | 'failed' | 'in_progress' | 'requires_action';

      error?: ResponsesAPI.ErrorInfo;

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

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
      status: 'completed' | 'failed' | 'in_progress' | 'requires_action';

      error?: ResponsesAPI.ErrorInfo;

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

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
      status: 'completed' | 'failed' | 'in_progress' | 'requires_action';

      error?: ResponsesAPI.ErrorInfo;

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';
  }

  /**
   * Output item added event (type: "response.output_item.added"). Emitted when a new
   * output item (message or tool call) starts.
   */
  export interface OutputItemAddedEvent {
    item: ResponsesAPI.OutputItem;

    output_index: number;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';
  }

  /**
   * Output item done event (type: "response.output_item.done"). Emitted when an
   * output item (message or tool call) completes.
   */
  export interface OutputItemDoneEvent {
    item: ResponsesAPI.OutputItem;

    output_index: number;

    /**
     * Monotonically increasing sequence number for event ordering
     */
    sequence_number: number;

    /**
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';
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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';
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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';
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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

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
     * SSE event type discriminator
     */
    type:
      | 'response.created'
      | 'response.in_progress'
      | 'response.completed'
      | 'response.failed'
      | 'response.output_item.added'
      | 'response.output_item.done'
      | 'response.output_text.delta'
      | 'response.output_text.done'
      | 'response.reasoning.started'
      | 'response.reasoning.search_queries'
      | 'response.reasoning.search_results'
      | 'response.reasoning.fetch_url_queries'
      | 'response.reasoning.fetch_url_results'
      | 'response.reasoning.stopped';

    thought?: string;
  }
}

export interface ResponsesCreateParams {
  /**
   * Input content - either a string or array of input items
   */
  input: string | Array<InputItem>;

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
   * max_steps value. Must be >= 1 if specified. Maximum allowed is 10.
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

  reasoning?: ResponsesCreateParams.Reasoning;

  /**
   * Specifies the desired output format for the model response
   */
  response_format?: Shared.ResponseFormat;

  /**
   * If true, returns SSE stream instead of JSON
   */
  stream?: boolean;

  /**
   * Tools available to the model
   */
  tools?: Array<ResponsesCreateParams.WebSearchTool | ResponsesCreateParams.FetchURLTool | FunctionTool>;
}

export namespace ResponsesCreateParams {
  export interface Reasoning {
    /**
     * How much effort the model should spend on reasoning
     */
    effort?: 'low' | 'medium' | 'high';
  }

  export interface WebSearchTool {
    type: 'web_search';

    filters?: WebSearchTool.Filters;

    max_tokens?: number;

    max_tokens_per_page?: number;

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
  status: 'completed' | 'failed' | 'in_progress' | 'requires_action';

  error?: ErrorInfo;

  usage?: ResponsesUsage;

  /**
   * Convenience property that aggregates all `output_text` items from the `output` list.
   * If no `output_text` content blocks exist, then an empty string is returned.
   */
  output_text?: string;
}

export type ResponseCreateParams = ResponseCreateParamsNonStreaming | ResponseCreateParamsStreaming;

export interface ResponseCreateParamsBase {
  /**
   * Input content - either a string or array of input items
   */
  input: string | Array<InputItem>;

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
   * max_steps value. Must be >= 1 if specified. Maximum allowed is 10.
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

  reasoning?: ResponseCreateParams.Reasoning;

  /**
   * Specifies the desired output format for the model response
   */
  response_format?: Shared.ResponseFormat;

  /**
   * If true, returns SSE stream instead of JSON
   */
  stream?: boolean;

  /**
   * Tools available to the model
   */
  tools?: Array<ResponseCreateParams.WebSearchTool | ResponseCreateParams.FetchURLTool | FunctionTool>;
}

export namespace ResponseCreateParams {
  export interface Reasoning {
    /**
     * How much effort the model should spend on reasoning
     */
    effort?: 'low' | 'medium' | 'high';
  }

  export interface WebSearchTool {
    type: 'web_search';

    filters?: WebSearchTool.Filters;

    max_tokens?: number;

    max_tokens_per_page?: number;

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

export declare namespace Responses {
  export {
    type Annotation as Annotation,
    type ContentPart as ContentPart,
    type ErrorInfo as ErrorInfo,
    type FunctionCallOutputItem as FunctionCallOutputItem,
    type FunctionTool as FunctionTool,
    type InputItem as InputItem,
    type OutputItem as OutputItem,
    type ResponseStreamChunk as ResponseStreamChunk,
    type ResponsesCreateParams as ResponsesCreateParams,
    type ResponsesUsage as ResponsesUsage,
    type ResponseCreateResponse as ResponseCreateResponse,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
  };
}
