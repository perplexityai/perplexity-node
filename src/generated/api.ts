import { addOutputText, normalizeHeaders } from "./runtime.js";
import type { APIPromise, RequestOptions, SdkTransport, Stream } from "./runtime.js";
export type { APIPromise, HeaderValue, HeadersLike, RequestOptions, SdkTransport, Stream } from "./runtime.js";
export type AdvisorResultOutputItemInput = {
    advice?: string;
    arguments?: string;
    call_id: string;
    error_code?: string;
    error_message?: string;
    question?: string;
    status: StatusInput;
    type: "advisor_result";
};
export type AdvisorResultOutputItemOutput = {
    advice?: string;
    arguments?: string;
    call_id: string;
    error_code?: string;
    error_message?: string;
    question?: string;
    status: StatusOutput;
    type: "advisor_result";
};
export type AnnotationInput = {
    end_index?: number;
    start_index?: number;
    title?: string;
    type?: string;
    url?: string;
};
export type AnnotationOutput = {
    end_index?: number;
    start_index?: number;
    title?: string;
    type?: string;
    url?: string;
};
export type ApiChatCompletionsRequestInput = {
    _debug_pro_search?: boolean;
    _force_new_agent?: boolean | null;
    _inputs?: number[] | null;
    _prompt_token_length?: number | null;
    best_of?: number | null;
    country?: string | null;
    cum_logprobs?: boolean | null;
    disable_search?: boolean | null;
    diverse_first_token?: boolean | null;
    enable_search_classifier?: boolean | null;
    file_workspace_id?: string | null;
    frequency_penalty?: number | null;
    has_image_url?: boolean;
    image_domain_filter?: string[] | null;
    image_format_filter?: string[] | null;
    language_preference?: string | null;
    last_updated_after_filter?: string | null;
    last_updated_before_filter?: string | null;
    latitude?: number | null;
    logprobs?: boolean | null;
    longitude?: number | null;
    max_tokens?: number | null;
    messages: ChatMessageInputInput[];
    model: string;
    n?: number | null;
    num_images?: number;
    num_search_results?: number;
    parallel_tool_calls?: boolean | null;
    presence_penalty?: number | null;
    ranking_model?: string | null;
    reasoning_effort?: ("minimal" | "low" | "medium" | "high") | null;
    response_format?: ResponseFormatTextInput | ResponseFormatJSONSchemaInput | ResponseFormatRegexInput | null;
    response_formatting_locale?: string | null;
    response_metadata?: ({} & Record<string, unknown>) | null;
    return_images?: boolean | null;
    return_related_questions?: boolean | null;
    safe_search?: boolean | null;
    search_after_date_filter?: string | null;
    search_before_date_filter?: string | null;
    search_domain_filter?: string[] | null;
    search_internal_properties?: ({} & Record<string, unknown>) | null;
    search_language_filter?: string[] | null;
    search_mode?: ("web" | "academic" | "sec") | null;
    search_recency_filter?: ("hour" | "day" | "week" | "month" | "year") | null;
    search_tenant?: string | null;
    stop?: string | string[] | null;
    stream?: boolean | null;
    stream_mode?: "full" | "concise";
    temperature?: number | null;
    thread_id?: string | null;
    tool_choice?: ("none" | "auto" | "required") | null;
    tools?: ToolSpecInput[] | null;
    top_k?: number | null;
    top_logprobs?: number | null;
    top_p?: number | null;
    updated_after_timestamp?: number | null;
    updated_before_timestamp?: number | null;
    use_threads?: boolean | null;
    user_original_query?: string | null;
    web_search_options?: WebSearchOptionsInput;
};
export type ApiChatCompletionsRequestOutput = {
    _debug_pro_search?: boolean;
    _force_new_agent?: boolean | null;
    _inputs?: number[] | null;
    _prompt_token_length?: number | null;
    best_of?: number | null;
    country?: string | null;
    cum_logprobs?: boolean | null;
    disable_search?: boolean | null;
    diverse_first_token?: boolean | null;
    enable_search_classifier?: boolean | null;
    file_workspace_id?: string | null;
    frequency_penalty?: number | null;
    has_image_url?: boolean;
    image_domain_filter?: string[] | null;
    image_format_filter?: string[] | null;
    language_preference?: string | null;
    last_updated_after_filter?: string | null;
    last_updated_before_filter?: string | null;
    latitude?: number | null;
    logprobs?: boolean | null;
    longitude?: number | null;
    max_tokens?: number | null;
    messages: ChatMessageInputOutput[];
    model: string;
    n?: number | null;
    num_images?: number;
    num_search_results?: number;
    parallel_tool_calls?: boolean | null;
    presence_penalty?: number | null;
    ranking_model?: string | null;
    reasoning_effort?: ("minimal" | "low" | "medium" | "high") | null;
    response_format?: ResponseFormatTextOutput | ResponseFormatJSONSchemaOutput | ResponseFormatRegexOutput | null;
    response_formatting_locale?: string | null;
    response_metadata?: ({} & Record<string, unknown>) | null;
    return_images?: boolean | null;
    return_related_questions?: boolean | null;
    safe_search?: boolean | null;
    search_after_date_filter?: string | null;
    search_before_date_filter?: string | null;
    search_domain_filter?: string[] | null;
    search_internal_properties?: ({} & Record<string, unknown>) | null;
    search_language_filter?: string[] | null;
    search_mode?: ("web" | "academic" | "sec") | null;
    search_recency_filter?: ("hour" | "day" | "week" | "month" | "year") | null;
    search_tenant?: string | null;
    stop?: string | string[] | null;
    stream?: boolean | null;
    stream_mode?: "full" | "concise";
    temperature?: number | null;
    thread_id?: string | null;
    tool_choice?: ("none" | "auto" | "required") | null;
    tools?: ToolSpecOutput[] | null;
    top_k?: number | null;
    top_logprobs?: number | null;
    top_p?: number | null;
    updated_after_timestamp?: number | null;
    updated_before_timestamp?: number | null;
    use_threads?: boolean | null;
    user_original_query?: string | null;
    web_search_options?: WebSearchOptionsOutput;
};
export type ApiPublicSearchResultInput = {
    date?: string | null;
    last_updated?: string | null;
    snippet?: string;
    source?: "web" | "attachment";
    title: string;
    url: string;
};
export type ApiPublicSearchResultOutput = {
    date?: string | null;
    last_updated?: string | null;
    snippet?: string;
    source?: "web" | "attachment";
    title: string;
    url: string;
};
export type ApiSearchPageInput = {
    date?: string | null;
    last_updated?: string | null;
    snippet: string;
    title: string;
    url: string;
};
export type ApiSearchPageOutput = {
    date?: string | null;
    last_updated?: string | null;
    snippet: string;
    title: string;
    url: string;
};
export type ApiSearchRequestInput = {
    country?: string | null;
    display_server_time?: boolean;
    last_updated_after_filter?: string | null;
    last_updated_before_filter?: string | null;
    max_results?: number;
    max_tokens?: number;
    max_tokens_per_page?: number;
    query: string | string[];
    search_after_date_filter?: string | null;
    search_before_date_filter?: string | null;
    search_context_size?: "low" | "medium" | "high";
    search_domain_filter?: string[] | null;
    search_language_filter?: string[] | null;
    search_mode?: ("web" | "academic" | "sec") | null;
    search_recency_filter?: ("hour" | "day" | "week" | "month" | "year") | null;
    search_type?: ("web" | "people") | null;
};
export type ApiSearchRequestOutput = {
    country?: string | null;
    display_server_time?: boolean;
    last_updated_after_filter?: string | null;
    last_updated_before_filter?: string | null;
    max_results?: number;
    max_tokens?: number;
    max_tokens_per_page?: number;
    query: string | string[];
    search_after_date_filter?: string | null;
    search_before_date_filter?: string | null;
    search_context_size?: "low" | "medium" | "high";
    search_domain_filter?: string[] | null;
    search_language_filter?: string[] | null;
    search_mode?: ("web" | "academic" | "sec") | null;
    search_recency_filter?: ("hour" | "day" | "week" | "month" | "year") | null;
    search_type?: ("web" | "people") | null;
};
export type ApiSearchResponseInput = {
    id: string;
    results: ApiSearchPageInput[];
    server_time?: string | null;
};
export type ApiSearchResponseOutput = {
    id: string;
    results: ApiSearchPageOutput[];
    server_time?: string | null;
};
export type AsyncApiChatCompletionsRequestInput = {
    idempotency_key?: string | null;
    request: ApiChatCompletionsRequestInput;
};
export type AsyncApiChatCompletionsRequestOutput = {
    idempotency_key?: string | null;
    request: ApiChatCompletionsRequestOutput;
};
export type AsyncApiChatCompletionsResponseInput = {
    completed_at?: number | null;
    created_at: number;
    error_message?: string | null;
    failed_at?: number | null;
    id: string;
    model: string;
    response?: CompletionResponseInput | null;
    started_at?: number | null;
    status: AsyncProcessingStatusInput;
};
export type AsyncApiChatCompletionsResponseOutput = {
    completed_at?: number | null;
    created_at: number;
    error_message?: string | null;
    failed_at?: number | null;
    id: string;
    model: string;
    response?: CompletionResponseOutput | null;
    started_at?: number | null;
    status: AsyncProcessingStatusOutput;
};
export type AsyncApiChatCompletionsResponseSummaryInput = {
    completed_at?: number | null;
    created_at: number;
    failed_at?: number | null;
    id: string;
    model: string;
    started_at?: number | null;
    status: AsyncProcessingStatusInput;
};
export type AsyncApiChatCompletionsResponseSummaryOutput = {
    completed_at?: number | null;
    created_at: number;
    failed_at?: number | null;
    id: string;
    model: string;
    started_at?: number | null;
    status: AsyncProcessingStatusOutput;
};
export type AsyncProcessingStatusInput = "CREATED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
export type AsyncProcessingStatusOutput = "CREATED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
export type BrowserSessionResponseInput = {
    session_id?: string;
    status?: "running" | "stopped";
};
export type BrowserSessionResponseOutput = {
    session_id?: string;
    status?: "running" | "stopped";
};
export type BuiltinSkillInput = {
    name: "office" | "office/docx" | "office/pdf" | "office/pptx" | "office/xlsx";
    type: "builtin";
};
export type BuiltinSkillOutput = {
    name: "office" | "office/docx" | "office/pdf" | "office/pptx" | "office/xlsx";
    type: "builtin";
};
export type ChatMessageInputInput = {
    content: string | (ChatMessageContentTextChunkInput | ChatMessageContentImageChunkInput | ChatMessageContentFileChunkInput | ChatMessageContentPDFChunkInput | ChatMessageContentVideoChunkInput)[] | null;
    reasoning_steps?: ReasoningStepInputInput[] | null;
    role: ChatMessageRoleInput;
    tool_call_id?: string | null;
    tool_calls?: ToolCallInput[] | null;
};
export type ChatMessageInputOutput = {
    content: string | (ChatMessageContentTextChunkOutput | ChatMessageContentImageChunkOutput | ChatMessageContentFileChunkOutput | ChatMessageContentPDFChunkOutput | ChatMessageContentVideoChunkOutput)[] | null;
    reasoning_steps?: ReasoningStepInputOutput[] | null;
    role: ChatMessageRoleOutput;
    tool_call_id?: string | null;
    tool_calls?: ToolCallOutput[] | null;
};
export type ChatMessageOutputInput = {
    content: string | (ChatMessageContentTextChunkInput | ChatMessageContentImageChunkInput | ChatMessageContentFileChunkInput | ChatMessageContentPDFChunkInput | ChatMessageContentVideoChunkInput)[] | null;
    reasoning_steps?: ReasoningStepOutputInput[] | null;
    role: ChatMessageRoleInput;
    tool_call_id?: string | null;
    tool_calls?: ToolCallInput[] | null;
};
export type ChatMessageOutputOutput = {
    content: string | (ChatMessageContentTextChunkOutput | ChatMessageContentImageChunkOutput | ChatMessageContentFileChunkOutput | ChatMessageContentPDFChunkOutput | ChatMessageContentVideoChunkOutput)[] | null;
    reasoning_steps?: ReasoningStepOutputOutput[] | null;
    role: ChatMessageRoleOutput;
    tool_call_id?: string | null;
    tool_calls?: ToolCallOutput[] | null;
};
export type ChatMessageContentFileChunkInput = {
    file_name?: string | null;
    file_url: URLInput | string;
    type: "file_url";
};
export type ChatMessageContentFileChunkOutput = {
    file_name?: string | null;
    file_url: URLOutput | string;
    type: "file_url";
};
export type ChatMessageContentImageChunkInput = {
    image_url: URLInput | string;
    type: "image_url";
};
export type ChatMessageContentImageChunkOutput = {
    image_url: URLOutput | string;
    type: "image_url";
};
export type ChatMessageContentPDFChunkInput = {
    pdf_url: URLInput | string;
    type: "pdf_url";
};
export type ChatMessageContentPDFChunkOutput = {
    pdf_url: URLOutput | string;
    type: "pdf_url";
};
export type ChatMessageContentTextChunkInput = {
    text: string;
    type: "text";
};
export type ChatMessageContentTextChunkOutput = {
    text: string;
    type: "text";
};
export type ChatMessageContentVideoChunkInput = {
    type: "video_url";
    video_url: VideoURLInput | string;
};
export type ChatMessageContentVideoChunkOutput = {
    type: "video_url";
    video_url: VideoURLOutput | string;
};
export type ChatMessageRoleInput = "system" | "user" | "assistant" | "tool";
export type ChatMessageRoleOutput = "system" | "user" | "assistant" | "tool";
export type ChoiceInput = {
    delta: ChatMessageOutputInput;
    finish_reason?: ("stop" | "length") | null;
    index: number;
    message: ChatMessageOutputInput;
};
export type ChoiceOutput = {
    delta: ChatMessageOutputOutput;
    finish_reason?: ("stop" | "length") | null;
    index: number;
    message: ChatMessageOutputOutput;
};
export type CompletionResponseInput = {
    choices: ChoiceInput[];
    citations?: string[] | null;
    created: number;
    id: string;
    model: string;
    object?: string;
    search_results?: ApiPublicSearchResultInput[] | null;
    status?: CompletionResponseStatusInput | null;
    type?: CompletionResponseTypeInput | null;
    usage?: UsageInfoInput | null;
};
export type CompletionResponseOutput = {
    choices: ChoiceOutput[];
    citations?: string[] | null;
    created: number;
    id: string;
    model: string;
    object?: string;
    search_results?: ApiPublicSearchResultOutput[] | null;
    status?: CompletionResponseStatusOutput | null;
    type?: CompletionResponseTypeOutput | null;
    usage?: UsageInfoOutput | null;
};
export type CompletionResponseStatusInput = "PENDING" | "COMPLETED";
export type CompletionResponseStatusOutput = "PENDING" | "COMPLETED";
export type CompletionResponseTypeInput = "message" | "info" | "end_of_stream";
export type CompletionResponseTypeOutput = "message" | "info" | "end_of_stream";
export type ContentPartInput = {
    annotations?: AnnotationInput[];
    text: string;
    type: ContentPartTypeInput;
};
export type ContentPartOutput = {
    annotations?: AnnotationOutput[];
    text: string;
    type: ContentPartTypeOutput;
};
export type ContentPartTypeInput = "output_text";
export type ContentPartTypeOutput = "output_text";
export type ContextualizedEmbeddingObjectInput = {
    data?: EmbeddingObjectInput[];
    index?: number;
    object?: string;
};
export type ContextualizedEmbeddingObjectOutput = {
    data?: EmbeddingObjectOutput[];
    index?: number;
    object?: string;
};
export type ContextualizedEmbeddingsRequestInput = {
    dimensions?: number;
    encoding_format?: "base64_int8" | "base64_binary";
    input: string[][];
    model: "pplx-embed-context-v1-0.6b" | "pplx-embed-context-v1-4b";
};
export type ContextualizedEmbeddingsRequestOutput = {
    dimensions?: number;
    encoding_format?: "base64_int8" | "base64_binary";
    input: string[][];
    model: "pplx-embed-context-v1-0.6b" | "pplx-embed-context-v1-4b";
};
export type ContextualizedEmbeddingsResponseInput = {
    data?: ContextualizedEmbeddingObjectInput[];
    model?: string;
    object?: string;
    usage?: EmbeddingsUsageInput;
};
export type ContextualizedEmbeddingsResponseOutput = {
    data?: ContextualizedEmbeddingObjectOutput[];
    model?: string;
    object?: string;
    usage?: EmbeddingsUsageOutput;
};
export type CostInput = {
    citation_tokens_cost?: number | null;
    input_tokens_cost: number;
    output_tokens_cost: number;
    reasoning_tokens_cost?: number | null;
    request_cost?: number | null;
    search_queries_cost?: number | null;
    total_cost: number;
};
export type CostOutput = {
    citation_tokens_cost?: number | null;
    input_tokens_cost: number;
    output_tokens_cost: number;
    reasoning_tokens_cost?: number | null;
    request_cost?: number | null;
    search_queries_cost?: number | null;
    total_cost: number;
};
export type CreateBrowserSessionRequestInput = {};
export type CreateBrowserSessionRequestOutput = {};
export type CurrencyInput = "USD";
export type CurrencyOutput = "USD";
export type DateInput = string;
export type DateOutput = string;
export type DateFiltersInput = {
    last_updated_after_filter?: DateInput;
    last_updated_before_filter?: DateInput;
    search_after_date_filter?: DateInput;
    search_before_date_filter?: DateInput;
    search_recency_filter?: SearchRecencyFilterInput;
};
export type DateFiltersOutput = {
    last_updated_after_filter?: DateOutput;
    last_updated_before_filter?: DateOutput;
    search_after_date_filter?: DateOutput;
    search_before_date_filter?: DateOutput;
    search_recency_filter?: SearchRecencyFilterOutput;
};
export type EmbeddingObjectInput = {
    embedding?: string;
    index?: number;
    object?: string;
};
export type EmbeddingObjectOutput = {
    embedding?: string;
    index?: number;
    object?: string;
};
export type EmbeddingsRequestInput = {
    dimensions?: number;
    encoding_format?: "base64_int8" | "base64_binary";
    input: string | string[];
    model: "pplx-embed-v1-0.6b" | "pplx-embed-v1-4b";
};
export type EmbeddingsRequestOutput = {
    dimensions?: number;
    encoding_format?: "base64_int8" | "base64_binary";
    input: string | string[];
    model: "pplx-embed-v1-0.6b" | "pplx-embed-v1-4b";
};
export type EmbeddingsResponseInput = {
    data?: EmbeddingObjectInput[];
    model?: string;
    object?: string;
    usage?: EmbeddingsUsageInput;
};
export type EmbeddingsResponseOutput = {
    data?: EmbeddingObjectOutput[];
    model?: string;
    object?: string;
    usage?: EmbeddingsUsageOutput;
};
export type EmbeddingsUsageInput = {
    cost?: {
        currency?: "USD";
        input_cost?: number;
        total_cost?: number;
    };
    prompt_tokens?: number;
    total_tokens?: number;
};
export type EmbeddingsUsageOutput = {
    cost?: {
        currency?: "USD";
        input_cost?: number;
        total_cost?: number;
    };
    prompt_tokens?: number;
    total_tokens?: number;
};
export type ErrorInfoInput = {
    code?: string;
    message: string;
    type?: string;
};
export type ErrorInfoOutput = {
    code?: string;
    message: string;
    type?: string;
};
export type EventTypeInput = "response.created" | "response.in_progress" | "response.completed" | "response.failed" | "response.output_item.added" | "response.output_item.done" | "response.output_text.delta" | "response.output_text.done" | "response.reasoning.started" | "response.reasoning.search_queries" | "response.reasoning.search_results" | "response.reasoning.fetch_url_queries" | "response.reasoning.fetch_url_results" | "response.reasoning.stopped" | "response.skill.loaded";
export type EventTypeOutput = "response.created" | "response.in_progress" | "response.completed" | "response.failed" | "response.output_item.added" | "response.output_item.done" | "response.output_text.delta" | "response.output_text.done" | "response.reasoning.started" | "response.reasoning.search_queries" | "response.reasoning.search_results" | "response.reasoning.fetch_url_queries" | "response.reasoning.fetch_url_results" | "response.reasoning.stopped" | "response.skill.loaded";
export type ExecutePythonStepDetailsInput = {
    code: string;
    result: string;
};
export type ExecutePythonStepDetailsOutput = {
    code: string;
    result: string;
};
export type FetchUrlContentStepDetailsInput = {
    contents: ApiPublicSearchResultInput[];
};
export type FetchUrlContentStepDetailsOutput = {
    contents: ApiPublicSearchResultOutput[];
};
export type FetchUrlQueriesEventInput = {
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.fetch_url_queries";
    urls: string[];
};
export type FetchUrlQueriesEventOutput = {
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.fetch_url_queries";
    urls: string[];
};
export type FetchUrlResultsEventInput = {
    contents: UrlContentInput[];
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.fetch_url_results";
};
export type FetchUrlResultsEventOutput = {
    contents: UrlContentOutput[];
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.fetch_url_results";
};
export type FetchUrlResultsOutputItemInput = {
    contents: UrlContentInput[];
    type: "fetch_url_results";
};
export type FetchUrlResultsOutputItemOutput = {
    contents: UrlContentOutput[];
    type: "fetch_url_results";
};
export type FetchUrlToolInput = {
    max_urls?: number;
    type: "fetch_url";
};
export type FetchUrlToolOutput = {
    max_urls?: number;
    type: "fetch_url";
};
export type FinanceSearchToolInput = {
    type: "finance_search";
};
export type FinanceSearchToolOutput = {
    type: "finance_search";
};
export type FunctionCallInputInput = {
    arguments: string;
    call_id: string;
    name: string;
    thought_signature?: string;
    type: "function_call";
};
export type FunctionCallInputOutput = {
    arguments: string;
    call_id: string;
    name: string;
    thought_signature?: string;
    type: "function_call";
};
export type FunctionCallOutputInputInput = {
    call_id: string;
    name?: string;
    output: string;
    thought_signature?: string;
    type: "function_call_output";
};
export type FunctionCallOutputInputOutput = {
    call_id: string;
    name?: string;
    output: string;
    thought_signature?: string;
    type: "function_call_output";
};
export type FunctionCallOutputItemInput = {
    arguments: string;
    call_id: string;
    id: string;
    name: string;
    status: StatusInput;
    thought_signature?: string;
    type: "function_call";
};
export type FunctionCallOutputItemOutput = {
    arguments: string;
    call_id: string;
    id: string;
    name: string;
    status: StatusOutput;
    thought_signature?: string;
    type: "function_call";
};
export type FunctionSpecInput = {
    description: string;
    name: string;
    parameters: ParameterSpecInput;
    strict?: boolean | null;
};
export type FunctionSpecOutput = {
    description: string;
    name: string;
    parameters: ParameterSpecOutput;
    strict?: boolean | null;
};
export type FunctionToolInput = {
    description?: string;
    name: string;
    parameters?: {} & Record<string, unknown>;
    strict?: boolean;
    type: "function";
};
export type FunctionToolOutput = {
    description?: string;
    name: string;
    parameters?: {} & Record<string, unknown>;
    strict?: boolean;
    type: "function";
};
export type HTTPValidationErrorInput = {
    detail?: ValidationErrorInput[];
};
export type HTTPValidationErrorOutput = {
    detail?: ValidationErrorOutput[];
};
export type InlineSkillInput = {
    description: string;
    instructions: string;
    name: string;
    type: "inline";
};
export type InlineSkillOutput = {
    description: string;
    instructions: string;
    name: string;
    type: "inline";
};
export type InputInput = string | InputItemInput[];
export type InputOutput = string | InputItemOutput[];
export type InputContentInput = string | InputContentPartInput[];
export type InputContentOutput = string | InputContentPartOutput[];
export type InputContentPartInput = {
    image_url?: string;
    text?: string;
    type: "input_text" | "input_image";
};
export type InputContentPartOutput = {
    image_url?: string;
    text?: string;
    type: "input_text" | "input_image";
};
export type InputItemInput = InputMessageInput | FunctionCallOutputInputInput | FunctionCallInputInput;
export type InputItemOutput = InputMessageOutput | FunctionCallOutputInputOutput | FunctionCallInputOutput;
export type InputMessageInput = {
    content: InputContentInput;
    role: "user" | "assistant" | "system" | "developer";
    type: "message";
};
export type InputMessageOutput = {
    content: InputContentOutput;
    role: "user" | "assistant" | "system" | "developer";
    type: "message";
};
export type JSONSchemaInput = {
    description?: string | null;
    name?: string | null;
    schema: {} & Record<string, unknown>;
    strict?: boolean | null;
};
export type JSONSchemaOutput = {
    description?: string | null;
    name?: string | null;
    schema: {} & Record<string, unknown>;
    strict?: boolean | null;
};
export type JSONSchemaFormatInput = {
    description?: string;
    name: string;
    schema: {} & Record<string, unknown>;
    strict?: boolean;
};
export type JSONSchemaFormatOutput = {
    description?: string;
    name: string;
    schema: {} & Record<string, unknown>;
    strict?: boolean;
};
export type ListAsyncApiChatCompletionsResponseInput = {
    next_token?: string | null;
    requests: AsyncApiChatCompletionsResponseSummaryInput[];
};
export type ListAsyncApiChatCompletionsResponseOutput = {
    next_token?: string | null;
    requests: AsyncApiChatCompletionsResponseSummaryOutput[];
};
export type McpCallOutputItemInput = {
    arguments: string;
    error?: string | null;
    id: string;
    name: string;
    output?: string;
    server_label: string;
    type: "mcp_call";
};
export type McpCallOutputItemOutput = {
    arguments: string;
    error?: string | null;
    id: string;
    name: string;
    output?: string;
    server_label: string;
    type: "mcp_call";
};
export type McpListToolsOutputItemInput = {
    error?: string;
    id: string;
    server_label: string;
    tools: McpToolDefInput[];
    type: "mcp_list_tools";
};
export type McpListToolsOutputItemOutput = {
    error?: string;
    id: string;
    server_label: string;
    tools: McpToolDefOutput[];
    type: "mcp_list_tools";
};
export type McpToolInput = {
    allowed_tools?: string[];
    authorization?: string;
    defer_loading?: boolean;
    headers?: {} & Record<string, string>;
    server_label: string;
    server_url: string;
    type: "mcp";
};
export type McpToolOutput = {
    allowed_tools?: string[];
    authorization?: string;
    defer_loading?: boolean;
    headers?: {} & Record<string, string>;
    server_label: string;
    server_url: string;
    type: "mcp";
};
export type McpToolDefInput = {
    description?: string;
    input_schema: {} & Record<string, unknown>;
    name: string;
};
export type McpToolDefOutput = {
    description?: string;
    input_schema: {} & Record<string, unknown>;
    name: string;
};
export type MessageOutputItemInput = {
    content: ContentPartInput[];
    id: string;
    role: RoleTypeInput;
    status: StatusInput;
    type: "message";
};
export type MessageOutputItemOutput = {
    content: ContentPartOutput[];
    id: string;
    role: RoleTypeOutput;
    status: StatusOutput;
    type: "message";
};
export type OutputItemInput = MessageOutputItemInput | SearchResultsOutputItemInput | FetchUrlResultsOutputItemInput | FunctionCallOutputItemInput | McpListToolsOutputItemInput | McpCallOutputItemInput | SkillLoadedOutputItemInput | AdvisorResultOutputItemInput | SandboxResultsOutputItemInput | SandboxWriteFileOutputItemInput | SandboxReadFileOutputItemInput | SandboxEditFileOutputItemInput | SandboxGrepOutputItemInput | SandboxGlobOutputItemInput | SandboxApplyPatchOutputItemInput | ShareFileOutputItemInput | UnknownOutputItemInput;
export type OutputItemOutput = MessageOutputItemOutput | SearchResultsOutputItemOutput | FetchUrlResultsOutputItemOutput | FunctionCallOutputItemOutput | McpListToolsOutputItemOutput | McpCallOutputItemOutput | SkillLoadedOutputItemOutput | AdvisorResultOutputItemOutput | SandboxResultsOutputItemOutput | SandboxWriteFileOutputItemOutput | SandboxReadFileOutputItemOutput | SandboxEditFileOutputItemOutput | SandboxGrepOutputItemOutput | SandboxGlobOutputItemOutput | SandboxApplyPatchOutputItemOutput | ShareFileOutputItemOutput | UnknownOutputItemOutput;
export type OutputItemAddedEventInput = {
    item: OutputItemInput;
    output_index: number;
    sequence_number: number;
    type: "response.output_item.added";
};
export type OutputItemAddedEventOutput = {
    item: OutputItemOutput;
    output_index: number;
    sequence_number: number;
    type: "response.output_item.added";
};
export type OutputItemDoneEventInput = {
    item: OutputItemInput;
    output_index: number;
    sequence_number: number;
    type: "response.output_item.done";
};
export type OutputItemDoneEventOutput = {
    item: OutputItemOutput;
    output_index: number;
    sequence_number: number;
    type: "response.output_item.done";
};
export type ParameterSpecInput = {
    additional_properties?: boolean | null;
    properties: {} & Record<string, unknown>;
    required?: string[] | null;
    type: string;
};
export type ParameterSpecOutput = {
    additional_properties?: boolean | null;
    properties: {} & Record<string, unknown>;
    required?: string[] | null;
    type: string;
};
export type PeopleSearchToolInput = {
    type: "people_search";
};
export type PeopleSearchToolOutput = {
    type: "people_search";
};
export type ReasoningConfigInput = {
    effort?: "minimal" | "low" | "medium" | "high" | "xhigh";
};
export type ReasoningConfigOutput = {
    effort?: "minimal" | "low" | "medium" | "high" | "xhigh";
};
export type ReasoningStartedEventInput = {
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.started";
};
export type ReasoningStartedEventOutput = {
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.started";
};
export type ReasoningStepInputInput = {
    execute_python?: ExecutePythonStepDetailsInput | null;
    fetch_url_content?: FetchUrlContentStepDetailsInput | null;
    thought: string;
    type?: string | null;
    web_search?: WebSearchStepDetailsInput | null;
};
export type ReasoningStepInputOutput = {
    execute_python?: ExecutePythonStepDetailsOutput | null;
    fetch_url_content?: FetchUrlContentStepDetailsOutput | null;
    thought: string;
    type?: string | null;
    web_search?: WebSearchStepDetailsOutput | null;
};
export type ReasoningStepOutputInput = {
    execute_python?: ExecutePythonStepDetailsInput | null;
    fetch_url_content?: FetchUrlContentStepDetailsInput | null;
    thought: string;
    type?: string | null;
    web_search?: WebSearchStepDetailsInput | null;
};
export type ReasoningStepOutputOutput = {
    execute_python?: ExecutePythonStepDetailsOutput | null;
    fetch_url_content?: FetchUrlContentStepDetailsOutput | null;
    thought: string;
    type?: string | null;
    web_search?: WebSearchStepDetailsOutput | null;
};
export type ReasoningStoppedEventInput = {
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.stopped";
};
export type ReasoningStoppedEventOutput = {
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.stopped";
};
export type RegexSchemaInput = {
    description?: string | null;
    name?: string | null;
    regex: string;
    strict?: boolean | null;
};
export type RegexSchemaOutput = {
    description?: string | null;
    name?: string | null;
    regex: string;
    strict?: boolean | null;
};
export type ResponseCompletedEventInput = {
    response?: ResponsesResponseInput;
    sequence_number: number;
    type: "response.completed";
};
export type ResponseCompletedEventOutput = {
    response?: ResponsesResponseOutput;
    sequence_number: number;
    type: "response.completed";
};
export type ResponseCreatedEventInput = {
    response?: ResponsesResponseInput;
    sequence_number: number;
    type: "response.created";
};
export type ResponseCreatedEventOutput = {
    response?: ResponsesResponseOutput;
    sequence_number: number;
    type: "response.created";
};
export type ResponseFailedEventInput = {
    error: ErrorInfoInput;
    sequence_number: number;
    type: "response.failed";
};
export type ResponseFailedEventOutput = {
    error: ErrorInfoOutput;
    sequence_number: number;
    type: "response.failed";
};
export type ResponseFileInput = {
    bytes: number;
    created_at: number;
    filename: string;
    id: string;
    object: "file";
};
export type ResponseFileOutput = {
    bytes: number;
    created_at: number;
    filename: string;
    id: string;
    object: "file";
};
export type ResponseFileListInput = {
    data: ResponseFileInput[];
    object: "list";
};
export type ResponseFileListOutput = {
    data: ResponseFileOutput[];
    object: "list";
};
export type ResponseFormatInput = {
    json_schema?: JSONSchemaFormatInput;
    type: "json_schema";
};
export type ResponseFormatOutput = {
    json_schema?: JSONSchemaFormatOutput;
    type: "json_schema";
};
export type ResponseFormatJSONSchemaInput = {
    json_schema: JSONSchemaInput;
    type: "json_schema";
};
export type ResponseFormatJSONSchemaOutput = {
    json_schema: JSONSchemaOutput;
    type: "json_schema";
};
export type ResponseFormatRegexInput = {
    regex: RegexSchemaInput;
    type: "regex";
};
export type ResponseFormatRegexOutput = {
    regex: RegexSchemaOutput;
    type: "regex";
};
export type ResponseFormatTextInput = {
    type: "text";
};
export type ResponseFormatTextOutput = {
    type: "text";
};
export type ResponseInProgressEventInput = {
    response?: ResponsesResponseInput;
    sequence_number: number;
    type: "response.in_progress";
};
export type ResponseInProgressEventOutput = {
    response?: ResponsesResponseOutput;
    sequence_number: number;
    type: "response.in_progress";
};
export type ResponsesCostInput = {
    cache_creation_cost?: number;
    cache_read_cost?: number;
    currency: CurrencyInput;
    input_cost: number;
    output_cost: number;
    tool_calls_cost?: number;
    total_cost: number;
};
export type ResponsesCostOutput = {
    cache_creation_cost?: number;
    cache_read_cost?: number;
    currency: CurrencyOutput;
    input_cost: number;
    output_cost: number;
    tool_calls_cost?: number;
    total_cost: number;
};
export type ResponseSkillLoadedEventInput = {
    name: string;
    sequence_number: number;
    type: "response.skill.loaded";
};
export type ResponseSkillLoadedEventOutput = {
    name: string;
    sequence_number: number;
    type: "response.skill.loaded";
};
export type ResponsesObjectTypeInput = "response";
export type ResponsesObjectTypeOutput = "response";
export type ResponsesRequestInput = {
    background?: boolean | null;
    input: InputInput;
    instructions?: string;
    language_preference?: string;
    max_output_tokens?: number;
    max_steps?: number;
    model?: string;
    models?: string[];
    preset?: string;
    previous_response_id?: string;
    reasoning?: ReasoningConfigInput;
    response_format?: ResponseFormatInput;
    skills?: SkillInput[];
    store?: boolean;
    stream?: boolean;
    temperature?: number;
    tools?: ToolInput[];
    top_p?: number;
};
export type ResponsesRequestOutput = {
    background?: boolean | null;
    input: InputOutput;
    instructions?: string;
    language_preference?: string;
    max_output_tokens?: number;
    max_steps?: number;
    model?: string;
    models?: string[];
    preset?: string;
    previous_response_id?: string;
    reasoning?: ReasoningConfigOutput;
    response_format?: ResponseFormatOutput;
    skills?: SkillOutput[];
    store?: boolean;
    stream?: boolean;
    temperature?: number;
    tools?: ToolOutput[];
    top_p?: number;
};
export type ResponsesResponseInput = {
    background?: boolean;
    created_at: number;
    error?: ErrorInfoInput;
    id: string;
    model: string;
    object: ResponsesObjectTypeInput;
    output: OutputItemInput[];
    previous_response_id?: string | null;
    status: StatusInput;
    store?: boolean;
    usage?: ResponsesUsageInput;
};
export type ResponsesResponseOutput = {
    background?: boolean;
    created_at: number;
    error?: ErrorInfoOutput;
    id: string;
    model: string;
    object: ResponsesObjectTypeOutput;
    output: OutputItemOutput[];
    previous_response_id?: string | null;
    status: StatusOutput;
    store?: boolean;
    usage?: ResponsesUsageOutput;
};
export type ResponseStreamEventInput = ResponseCreatedEventInput | ResponseInProgressEventInput | ResponseCompletedEventInput | ResponseFailedEventInput | OutputItemAddedEventInput | OutputItemDoneEventInput | TextDeltaEventInput | TextDoneEventInput | ReasoningStartedEventInput | SearchQueriesEventInput | SearchResultsEventInput | FetchUrlQueriesEventInput | FetchUrlResultsEventInput | ReasoningStoppedEventInput | ResponseSkillLoadedEventInput;
export type ResponseStreamEventOutput = ResponseCreatedEventOutput | ResponseInProgressEventOutput | ResponseCompletedEventOutput | ResponseFailedEventOutput | OutputItemAddedEventOutput | OutputItemDoneEventOutput | TextDeltaEventOutput | TextDoneEventOutput | ReasoningStartedEventOutput | SearchQueriesEventOutput | SearchResultsEventOutput | FetchUrlQueriesEventOutput | FetchUrlResultsEventOutput | ReasoningStoppedEventOutput | ResponseSkillLoadedEventOutput;
export type ResponsesUsageInput = {
    cost?: ResponsesCostInput;
    input_tokens: number;
    input_tokens_details?: {
        cache_creation_input_tokens?: number;
        cache_read_input_tokens?: number;
    };
    output_tokens: number;
    tool_calls_details?: {} & Record<string, ToolCallDetailsInput>;
    total_tokens: number;
};
export type ResponsesUsageOutput = {
    cost?: ResponsesCostOutput;
    input_tokens: number;
    input_tokens_details?: {
        cache_creation_input_tokens?: number;
        cache_read_input_tokens?: number;
    };
    output_tokens: number;
    tool_calls_details?: {} & Record<string, ToolCallDetailsOutput>;
    total_tokens: number;
};
export type RoleTypeInput = "assistant";
export type RoleTypeOutput = "assistant";
export type SandboxApplyPatchOutputItemInput = {
    added?: string[];
    call_id: string;
    deleted?: string[];
    error?: string;
    modified?: string[];
    type: "sandbox_apply_patch";
};
export type SandboxApplyPatchOutputItemOutput = {
    added?: string[];
    call_id: string;
    deleted?: string[];
    error?: string;
    modified?: string[];
    type: "sandbox_apply_patch";
};
export type SandboxEditFileOutputItemInput = {
    call_id: string;
    error?: string;
    file_path?: string;
    message?: string;
    type: "sandbox_edit_file";
};
export type SandboxEditFileOutputItemOutput = {
    call_id: string;
    error?: string;
    file_path?: string;
    message?: string;
    type: "sandbox_edit_file";
};
export type SandboxGlobOutputItemInput = {
    call_id: string;
    count?: number;
    error?: string;
    files?: string[];
    truncated?: boolean;
    type: "sandbox_glob";
};
export type SandboxGlobOutputItemOutput = {
    call_id: string;
    count?: number;
    error?: string;
    files?: string[];
    truncated?: boolean;
    type: "sandbox_glob";
};
export type SandboxGrepOutputItemInput = {
    call_id: string;
    count?: number;
    error?: string;
    files?: string[];
    truncated?: boolean;
    type: "sandbox_grep";
};
export type SandboxGrepOutputItemOutput = {
    call_id: string;
    count?: number;
    error?: string;
    files?: string[];
    truncated?: boolean;
    type: "sandbox_grep";
};
export type SandboxReadFileOutputItemInput = {
    call_id: string;
    content?: string;
    error?: string;
    file_path: string;
    start_line?: number;
    total_lines?: number;
    type: "sandbox_read_file";
};
export type SandboxReadFileOutputItemOutput = {
    call_id: string;
    content?: string;
    error?: string;
    file_path: string;
    start_line?: number;
    total_lines?: number;
    type: "sandbox_read_file";
};
export type SandboxResultInput = {
    duration_ms: number;
    exit_code: number;
    status: "in_progress" | "completed" | "failed" | "timed_out";
    stderr: string;
    stdout: string;
};
export type SandboxResultOutput = {
    duration_ms: number;
    exit_code: number;
    status: "in_progress" | "completed" | "failed" | "timed_out";
    stderr: string;
    stdout: string;
};
export type SandboxResultsOutputItemInput = {
    call_id: string;
    code: string;
    container_id?: string;
    language: "python" | "bash";
    results: SandboxResultInput[];
    status: "in_progress" | "completed" | "failed" | "timed_out";
    type: "sandbox_results";
};
export type SandboxResultsOutputItemOutput = {
    call_id: string;
    code: string;
    container_id?: string;
    language: "python" | "bash";
    results: SandboxResultOutput[];
    status: "in_progress" | "completed" | "failed" | "timed_out";
    type: "sandbox_results";
};
export type SandboxToolInput = {
    type: "sandbox";
};
export type SandboxToolOutput = {
    type: "sandbox";
};
export type SandboxWriteFileOutputItemInput = {
    call_id: string;
    error?: string;
    file_path: string;
    size_bytes?: number;
    type: "sandbox_write_file";
};
export type SandboxWriteFileOutputItemOutput = {
    call_id: string;
    error?: string;
    file_path: string;
    size_bytes?: number;
    type: "sandbox_write_file";
};
export type SearchDomainFilterInput = {
    search_domain_filter?: string[];
};
export type SearchDomainFilterOutput = {
    search_domain_filter?: string[];
};
export type SearchQueriesEventInput = {
    queries: string[];
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.search_queries";
};
export type SearchQueriesEventOutput = {
    queries: string[];
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.search_queries";
};
export type SearchRecencyFilterInput = "hour" | "day" | "week" | "month" | "year";
export type SearchRecencyFilterOutput = "hour" | "day" | "week" | "month" | "year";
export type SearchResultInput = {
    date?: string;
    id: number;
    last_updated?: string;
    snippet: string;
    source?: SearchSourceInput;
    title: string;
    url: string;
};
export type SearchResultOutput = {
    date?: string;
    id: number;
    last_updated?: string;
    snippet: string;
    source?: SearchSourceOutput;
    title: string;
    url: string;
};
export type SearchResultsEventInput = {
    results: SearchResultInput[];
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.search_results";
    usage?: ResponsesUsageInput;
};
export type SearchResultsEventOutput = {
    results: SearchResultOutput[];
    sequence_number: number;
    thought?: string;
    type: "response.reasoning.search_results";
    usage?: ResponsesUsageOutput;
};
export type SearchResultsOutputItemInput = {
    queries?: string[];
    results: SearchResultInput[];
    type: "search_results";
};
export type SearchResultsOutputItemOutput = {
    queries?: string[];
    results: SearchResultOutput[];
    type: "search_results";
};
export type SearchSourceInput = "web";
export type SearchSourceOutput = "web";
export type ShareFileOutputItemInput = {
    call_id: string;
    error?: string;
    file_id?: string;
    filename?: string;
    size_bytes?: number;
    type: "share_file";
    url?: string;
};
export type ShareFileOutputItemOutput = {
    call_id: string;
    error?: string;
    file_id?: string;
    filename?: string;
    size_bytes?: number;
    type: "share_file";
    url?: string;
};
export type SkillInput = BuiltinSkillInput | InlineSkillInput;
export type SkillOutput = BuiltinSkillOutput | InlineSkillOutput;
export type SkillLoadedOutputItemInput = {
    name: string;
    type: "skill_loaded";
};
export type SkillLoadedOutputItemOutput = {
    name: string;
    type: "skill_loaded";
};
export type StatusInput = "completed" | "failed" | "in_progress" | "queued" | "cancelled" | "requires_action";
export type StatusOutput = "completed" | "failed" | "in_progress" | "queued" | "cancelled" | "requires_action";
export type TextDeltaEventInput = {
    content_index: number;
    delta: string;
    item_id: string;
    output_index: number;
    sequence_number: number;
    type: "response.output_text.delta";
};
export type TextDeltaEventOutput = {
    content_index: number;
    delta: string;
    item_id: string;
    output_index: number;
    sequence_number: number;
    type: "response.output_text.delta";
};
export type TextDoneEventInput = {
    content_index: number;
    item_id: string;
    output_index: number;
    sequence_number: number;
    text: string;
    type: "response.output_text.done";
};
export type TextDoneEventOutput = {
    content_index: number;
    item_id: string;
    output_index: number;
    sequence_number: number;
    text: string;
    type: "response.output_text.done";
};
export type ToolInput = WebSearchToolInput | FetchUrlToolInput | PeopleSearchToolInput | FunctionToolInput | FinanceSearchToolInput | SandboxToolInput | McpToolInput;
export type ToolOutput = WebSearchToolOutput | FetchUrlToolOutput | PeopleSearchToolOutput | FunctionToolOutput | FinanceSearchToolOutput | SandboxToolOutput | McpToolOutput;
export type ToolCallInput = {
    function?: ToolCallFunctionInput | null;
    id?: string | null;
    type?: "function" | null;
};
export type ToolCallOutput = {
    function?: ToolCallFunctionOutput | null;
    id?: string | null;
    type?: "function" | null;
};
export type ToolCallDetailsInput = {
    invocation?: number;
};
export type ToolCallDetailsOutput = {
    invocation?: number;
};
export type ToolCallFunctionInput = {
    arguments?: string | null;
    name?: string | null;
};
export type ToolCallFunctionOutput = {
    arguments?: string | null;
    name?: string | null;
};
export type ToolSpecInput = {
    function: FunctionSpecInput;
    type: "function";
};
export type ToolSpecOutput = {
    function: FunctionSpecOutput;
    type: "function";
};
export type ToolUserLocationInput = {
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    region?: string;
};
export type ToolUserLocationOutput = {
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    region?: string;
};
export type UnknownOutputItemInput = {
    item_name: string;
    payload: {} & Record<string, unknown>;
    type: "unknown";
};
export type UnknownOutputItemOutput = {
    item_name: string;
    payload: {} & Record<string, unknown>;
    type: "unknown";
};
export type URLInput = {
    url: string;
};
export type URLOutput = {
    url: string;
};
export type UrlContentInput = {
    snippet: string;
    title: string;
    url: string;
};
export type UrlContentOutput = {
    snippet: string;
    title: string;
    url: string;
};
export type UsageInfoInput = {
    citation_tokens?: number | null;
    completion_tokens: number;
    cost: CostInput;
    num_search_queries?: number | null;
    prompt_tokens: number;
    reasoning_tokens?: number | null;
    search_context_size?: string | null;
    total_tokens: number;
};
export type UsageInfoOutput = {
    citation_tokens?: number | null;
    completion_tokens: number;
    cost: CostOutput;
    num_search_queries?: number | null;
    prompt_tokens: number;
    reasoning_tokens?: number | null;
    search_context_size?: string | null;
    total_tokens: number;
};
export type UserLocationInput = {
    city?: string | null;
    country?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    region?: string | null;
};
export type UserLocationOutput = {
    city?: string | null;
    country?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    region?: string | null;
};
export type ValidationErrorInput = {
    loc: (string | number)[];
    msg: string;
    type: string;
};
export type ValidationErrorOutput = {
    loc: (string | number)[];
    msg: string;
    type: string;
};
export type VideoURLInput = {
    frame_interval?: string | number;
    url: string;
};
export type VideoURLOutput = {
    frame_interval?: string | number;
    url: string;
};
export type WebSearchFiltersInput = SearchDomainFilterInput & DateFiltersInput;
export type WebSearchFiltersOutput = SearchDomainFilterOutput & DateFiltersOutput;
export type WebSearchOptionsInput = {
    image_results_enhanced_relevance?: boolean;
    search_context_size?: "low" | "medium" | "high";
    search_type?: ("fast" | "pro" | "auto") | null;
    user_location?: UserLocationInput | null;
};
export type WebSearchOptionsOutput = {
    image_results_enhanced_relevance?: boolean;
    search_context_size?: "low" | "medium" | "high";
    search_type?: ("fast" | "pro" | "auto") | null;
    user_location?: UserLocationOutput | null;
};
export type WebSearchStepDetailsInput = {
    search_keywords: string[];
    search_results: ApiPublicSearchResultInput[];
};
export type WebSearchStepDetailsOutput = {
    search_keywords: string[];
    search_results: ApiPublicSearchResultOutput[];
};
export type WebSearchToolInput = {
    filters?: WebSearchFiltersInput;
    max_tokens?: number;
    max_tokens_per_page?: number;
    search_context_size?: "low" | "medium" | "high";
    type: "web_search";
    user_location?: ToolUserLocationInput;
};
export type WebSearchToolOutput = {
    filters?: WebSearchFiltersOutput;
    max_tokens?: number;
    max_tokens_per_page?: number;
    search_context_size?: "low" | "medium" | "high";
    type: "web_search";
    user_location?: ToolUserLocationOutput;
};
export class AsyncChatCompletionsResource {
    private readonly _client: SdkTransport;
    constructor(client: SdkTransport) {
        this._client = client;
    }
    create(body: AsyncApiChatCompletionsRequestInput, options?: RequestOptions): APIPromise<AsyncApiChatCompletionsResponseOutput> {
        return this._client.post<AsyncApiChatCompletionsResponseOutput>("/async/chat/completions", {
            ...options,
            body: body
        });
    }
    get(apiRequest: string, params?: {
        local_mode?: boolean;
        "x-client-env"?: string;
        "x-client-name"?: string;
        "x-created-at-epoch-seconds"?: string;
        "x-request-time"?: string;
        "x-usage-tier"?: string;
        "x-user-id"?: string;
    }, options?: RequestOptions): APIPromise<AsyncApiChatCompletionsResponseOutput> {
        return this._client.get<AsyncApiChatCompletionsResponseOutput>(`/async/chat/completions/${encodeURIComponent(String(apiRequest))}`, {
            ...options,
            query: {
                local_mode: params?.local_mode,
                ...options?.query
            },
            headers: {
                "x-client-env": params?.["x-client-env"],
                "x-client-name": params?.["x-client-name"],
                "x-created-at-epoch-seconds": params?.["x-created-at-epoch-seconds"],
                "x-request-time": params?.["x-request-time"],
                "x-usage-tier": params?.["x-usage-tier"],
                "x-user-id": params?.["x-user-id"],
                ...normalizeHeaders(options?.headers)
            }
        });
    }
    list(options?: RequestOptions): APIPromise<ListAsyncApiChatCompletionsResponseOutput> {
        return this._client.get<ListAsyncApiChatCompletionsResponseOutput>("/async/chat/completions", {
            ...options
        });
    }
}
export class AsyncChatResource {
    readonly completions: AsyncChatCompletionsResource;
    constructor(client: SdkTransport) {
        this.completions = new AsyncChatCompletionsResource(client);
    }
}
export class BrowserSessionsResource {
    private readonly _client: SdkTransport;
    constructor(client: SdkTransport) {
        this._client = client;
    }
    create(body?: CreateBrowserSessionRequestInput, options?: RequestOptions): APIPromise<BrowserSessionResponseOutput> {
        return this._client.post<BrowserSessionResponseOutput>("/v1/browser/sessions", {
            ...options,
            body: body
        });
    }
    delete(sessionID: string, options?: RequestOptions): APIPromise<void> {
        return this._client.delete<void>(`/v1/browser/sessions/${encodeURIComponent(String(sessionID))}`, {
            ...options,
            headers: {
                "Accept": "*/*",
                ...normalizeHeaders(options?.headers)
            }
        });
    }
}
export class ChatCompletionsResource {
    private readonly _client: SdkTransport;
    constructor(client: SdkTransport) {
        this._client = client;
    }
    create(body: Omit<ApiChatCompletionsRequestInput, "stream"> & {
        stream?: false;
    }, options?: RequestOptions): APIPromise<CompletionResponseOutput>;
    create(body: Omit<ApiChatCompletionsRequestInput, "stream"> & {
        stream: true;
    }, options?: RequestOptions): APIPromise<Stream<CompletionResponseOutput>>;
    create(body: ApiChatCompletionsRequestInput, options?: RequestOptions): APIPromise<CompletionResponseOutput | Stream<CompletionResponseOutput>>;
    create(body: ApiChatCompletionsRequestInput, options?: RequestOptions): APIPromise<CompletionResponseOutput | Stream<CompletionResponseOutput>> {
        return this._client.post<CompletionResponseOutput | Stream<CompletionResponseOutput>>("/chat/completions", {
            ...options,
            body: body,
            stream: body?.stream ?? false
        });
    }
}
export class ResponsesFilesResource {
    private readonly _client: SdkTransport;
    constructor(client: SdkTransport) {
        this._client = client;
    }
    content(fileID: string, params: {
        response_id: string;
    }, options?: RequestOptions): APIPromise<Response> {
        return this._client.get<Response>(`/v1/responses/${encodeURIComponent(String(params.response_id))}/files/${encodeURIComponent(String(fileID))}/content`, {
            ...options,
            headers: {
                "Accept": "application/octet-stream",
                ...normalizeHeaders(options?.headers)
            },
            __binaryResponse: true
        });
    }
    list(responseID: string, options?: RequestOptions): APIPromise<ResponseFileListOutput> {
        return this._client.get<ResponseFileListOutput>(`/v1/responses/${encodeURIComponent(String(responseID))}/files`, {
            ...options
        });
    }
}
export class AsyncResource {
    readonly chat: AsyncChatResource;
    constructor(client: SdkTransport) {
        this.chat = new AsyncChatResource(client);
    }
}
export class BrowserResource {
    readonly sessions: BrowserSessionsResource;
    constructor(client: SdkTransport) {
        this.sessions = new BrowserSessionsResource(client);
    }
}
export class ChatResource {
    readonly completions: ChatCompletionsResource;
    constructor(client: SdkTransport) {
        this.completions = new ChatCompletionsResource(client);
    }
}
export class ContextualizedEmbeddingsResource {
    private readonly _client: SdkTransport;
    constructor(client: SdkTransport) {
        this._client = client;
    }
    create(body: ContextualizedEmbeddingsRequestInput, options?: RequestOptions): APIPromise<ContextualizedEmbeddingsResponseOutput> {
        return this._client.post<ContextualizedEmbeddingsResponseOutput>("/v1/contextualizedembeddings", {
            ...options,
            body: body
        });
    }
}
export class EmbeddingsResource {
    private readonly _client: SdkTransport;
    constructor(client: SdkTransport) {
        this._client = client;
    }
    create(body: EmbeddingsRequestInput, options?: RequestOptions): APIPromise<EmbeddingsResponseOutput> {
        return this._client.post<EmbeddingsResponseOutput>("/v1/embeddings", {
            ...options,
            body: body
        });
    }
}
export class ResponsesResource {
    private readonly _client: SdkTransport;
    readonly files: ResponsesFilesResource;
    constructor(client: SdkTransport) {
        this._client = client;
        this.files = new ResponsesFilesResource(client);
    }
    cancel(responseID: string, options?: RequestOptions): APIPromise<{
        response_id: string;
        status: "cancelling";
    }> {
        return this._client.post<{
            response_id: string;
            status: "cancelling";
        }>(`/v1/responses/${encodeURIComponent(String(responseID))}/cancel`, {
            ...options
        });
    }
    create(body: Omit<ResponsesRequestInput, "stream"> & {
        stream?: false;
    }, options?: RequestOptions): APIPromise<ResponsesResponseOutput>;
    create(body: Omit<ResponsesRequestInput, "stream"> & {
        stream: true;
    }, options?: RequestOptions): APIPromise<Stream<ResponseStreamEventOutput>>;
    create(body: ResponsesRequestInput, options?: RequestOptions): APIPromise<ResponsesResponseOutput | Stream<ResponseStreamEventOutput>>;
    create(body: ResponsesRequestInput, options?: RequestOptions): APIPromise<ResponsesResponseOutput | Stream<ResponseStreamEventOutput>> {
        const promise = this._client.post<ResponsesResponseOutput | Stream<ResponseStreamEventOutput>>("/v1/responses", {
            ...options,
            body: body,
            stream: body?.stream ?? false
        });
        if (!body?.stream) {
            return promise._thenUnwrap(response => {
                if ("object" in response && response.object === "response") {
                    addOutputText(response as ResponsesResponseOutput);
                }
                return response;
            });
        }
        return promise;
    }
    retrieve(responseID: string, options?: RequestOptions): APIPromise<ResponsesResponseOutput> {
        return this._client.get<ResponsesResponseOutput>(`/v1/responses/${encodeURIComponent(String(responseID))}`, {
            ...options
        });
    }
}
export class SearchResource {
    private readonly _client: SdkTransport;
    constructor(client: SdkTransport) {
        this._client = client;
    }
    create(body: ApiSearchRequestInput, options?: RequestOptions): APIPromise<ApiSearchResponseOutput> {
        return this._client.post<ApiSearchResponseOutput>("/search", {
            ...options,
            body: body
        });
    }
}
export class PerplexitySdk {
    readonly async: AsyncResource;
    readonly browser: BrowserResource;
    readonly chat: ChatResource;
    readonly contextualizedEmbeddings: ContextualizedEmbeddingsResource;
    readonly embeddings: EmbeddingsResource;
    readonly responses: ResponsesResource;
    readonly search: SearchResource;
    constructor(client: SdkTransport) {
        this.async = new AsyncResource(client);
        this.browser = new BrowserResource(client);
        this.chat = new ChatResource(client);
        this.contextualizedEmbeddings = new ContextualizedEmbeddingsResource(client);
        this.embeddings = new EmbeddingsResource(client);
        this.responses = new ResponsesResource(client);
        this.search = new SearchResource(client);
    }
}
export class Async extends AsyncResource {
}
export class Browser extends BrowserResource {
}
export class Chat extends ChatResource {
}
export class ContextualizedEmbeddings extends ContextualizedEmbeddingsResource {
}
export class Embeddings extends EmbeddingsResource {
}
export class Responses extends ResponsesResource {
}
export class Search extends SearchResource {
}
export type Annotation = AnnotationOutput;
export type APIPublicSearchResult = ApiPublicSearchResultOutput;
export type BrowserSessionResponse = BrowserSessionResponseOutput;
export type ChatMessageInput = ChatMessageInputInput;
export type ChatMessageOutput = ChatMessageOutputOutput;
export type Choice = ChoiceOutput;
export type ContentPart = ContentPartOutput;
export type ContextualizedEmbeddingCreateParams = ContextualizedEmbeddingsRequestInput;
export type ContextualizedEmbeddingCreateResponse = ContextualizedEmbeddingsResponseOutput;
export type ContextualizedEmbeddingObject = ContextualizedEmbeddingObjectOutput;
export type EmbeddingCreateParams = EmbeddingsRequestInput;
export type EmbeddingCreateResponse = EmbeddingsResponseOutput;
export type EmbeddingObject = EmbeddingObjectOutput;
export type EmbeddingsUsage = EmbeddingsUsageOutput;
export type ErrorInfo = ErrorInfoOutput;
export type FunctionCallOutputItem = FunctionCallOutputItemOutput;
export type FunctionTool = FunctionToolInput;
export type InputItem = InputItemInput;
export type JsonSchemaFormat = JSONSchemaFormatInput;
export type OutputItem = OutputItemOutput;
export type ResponseCancelResponse = Awaited<ReturnType<ResponsesResource["cancel"]>>;
export type ResponseCreateParams = ResponsesRequestInput;
export type ResponseCreateResponse = ResponsesResponseOutput;
export type ResponseFile = ResponseFileOutput;
export type ResponseFileList = ResponseFileListOutput;
export type ResponseFormat = ResponseFormatInput;
export type ResponseRetrieveResponse = ResponsesResponseOutput;
export type ResponsesCreateParams = ResponsesRequestInput;
export type ResponseStreamChunk = ResponseStreamEventOutput;
export type ResponsesUsage = ResponsesUsageOutput;
export type SearchCreateParams = ApiSearchRequestInput;
export type SearchCreateResponse = ApiSearchResponseOutput;
export type SearchResult = SearchResultOutput;
export type StreamChunk = CompletionResponseOutput;
export type UsageInfo = UsageInfoOutput;
export type UserLocation = UserLocationInput;
export type WebSearchOptions = WebSearchOptionsInput;
export namespace Async {
    export class Chat extends AsyncChatResource {
    }
    export namespace Chat {
        export class Completions extends AsyncChatCompletionsResource {
        }
        export type CompletionCreateParams = AsyncApiChatCompletionsRequestInput;
        export type CompletionCreateResponse = AsyncApiChatCompletionsResponseOutput;
        export type CompletionGetParams = NonNullable<Parameters<AsyncChatCompletionsResource["get"]>[1]>;
        export type CompletionGetResponse = AsyncApiChatCompletionsResponseOutput;
        export type CompletionListResponse = ListAsyncApiChatCompletionsResponseOutput;
        export namespace Completions {
            export type CompletionCreateParams = AsyncApiChatCompletionsRequestInput;
            export type CompletionCreateResponse = AsyncApiChatCompletionsResponseOutput;
            export type CompletionGetParams = NonNullable<Parameters<AsyncChatCompletionsResource["get"]>[1]>;
            export type CompletionGetResponse = AsyncApiChatCompletionsResponseOutput;
            export type CompletionListResponse = ListAsyncApiChatCompletionsResponseOutput;
        }
    }
}
export namespace Browser {
    export class Sessions extends BrowserSessionsResource {
    }
    export type SessionCreateParams = CreateBrowserSessionRequestInput;
    export namespace Sessions {
        export type SessionCreateParams = CreateBrowserSessionRequestInput;
    }
}
export namespace Chat {
    export class Completions extends ChatCompletionsResource {
    }
    export type CompletionCreateParams = ApiChatCompletionsRequestInput;
    export type CompletionCreateParamsNonStreaming = Omit<ApiChatCompletionsRequestInput, "stream"> & {
        stream?: false | null;
    };
    export type CompletionCreateParamsStreaming = Omit<ApiChatCompletionsRequestInput, "stream"> & {
        stream: true;
    };
    export type StreamChunk = CompletionResponseOutput;
    export namespace Completions {
        export type CompletionCreateParams = ApiChatCompletionsRequestInput;
        export type CompletionCreateParamsNonStreaming = Omit<ApiChatCompletionsRequestInput, "stream"> & {
            stream?: false | null;
        };
        export type CompletionCreateParamsStreaming = Omit<ApiChatCompletionsRequestInput, "stream"> & {
            stream: true;
        };
    }
}
export namespace ContextualizedEmbeddings {
    export type ContextualizedEmbeddingCreateParams = ContextualizedEmbeddingsRequestInput;
    export type ContextualizedEmbeddingCreateResponse = ContextualizedEmbeddingsResponseOutput;
}
export namespace Embeddings {
    export type EmbeddingCreateParams = EmbeddingsRequestInput;
    export type EmbeddingCreateResponse = EmbeddingsResponseOutput;
}
export namespace Responses {
    export class Files extends ResponsesFilesResource {
    }
    export type Annotation = AnnotationOutput;
    export type ContentPart = ContentPartOutput;
    export type ErrorInfo = ErrorInfoOutput;
    export type FileContentParams = NonNullable<Parameters<ResponsesFilesResource["content"]>[1]>;
    export type FunctionCallOutputItem = FunctionCallOutputItemOutput;
    export type FunctionTool = FunctionToolInput;
    export type InputItem = InputItemInput;
    export type OutputItem = OutputItemOutput;
    export type ResponseCancelResponse = Awaited<ReturnType<ResponsesResource["cancel"]>>;
    export type ResponseCreateParams = ResponsesRequestInput;
    export type ResponseCreateParamsNonStreaming = Omit<ResponsesRequestInput, "stream"> & {
        stream?: false;
    };
    export type ResponseCreateParamsStreaming = Omit<ResponsesRequestInput, "stream"> & {
        stream: true;
    };
    export type ResponseCreateResponse = ResponsesResponseOutput;
    export type ResponseFile = ResponseFileOutput;
    export type ResponseFileList = ResponseFileListOutput;
    export type ResponseRetrieveResponse = ResponsesResponseOutput;
    export type ResponsesCreateParams = ResponsesRequestInput;
    export type ResponseStreamChunk = ResponseStreamEventOutput;
    export type ResponsesUsage = ResponsesUsageOutput;
    export namespace Files {
        export type FileContentParams = NonNullable<Parameters<ResponsesFilesResource["content"]>[1]>;
    }
}
export namespace Search {
    export type SearchCreateParams = ApiSearchRequestInput;
    export type SearchCreateResponse = ApiSearchResponseOutput;
}
