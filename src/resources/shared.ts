// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';

export interface APIPublicSearchResult {
  title: string;

  url: string;

  date?: string | null;

  last_updated?: string | null;

  snippet?: string;

  source?: 'web' | 'attachment';
}

/**
 * Response containing browser session details
 */
export interface BrowserSessionResponse {
  /**
   * Unique identifier for the browser session
   */
  session_id?: string;

  /**
   * Current status of the session
   */
  status?: 'running' | 'stopped';
}

export interface ChatMessageInput {
  content:
    | string
    | Array<
        | ChatMessageInput.ChatMessageContentTextChunk
        | ChatMessageInput.ChatMessageContentImageChunk
        | ChatMessageInput.ChatMessageContentFileChunk
        | ChatMessageInput.ChatMessageContentPdfChunk
        | ChatMessageInput.ChatMessageContentVideoChunk
      >
    | null;

  /**
   * Chat roles enum
   */
  role: 'system' | 'user' | 'assistant' | 'tool';

  reasoning_steps?: Array<ChatMessageInput.ReasoningStep> | null;

  tool_call_id?: string | null;

  tool_calls?: Array<ChatMessageInput.ToolCall> | null;
}

export namespace ChatMessageInput {
  export interface ChatMessageContentTextChunk {
    text: string;

    type: 'text';
  }

  export interface ChatMessageContentImageChunk {
    image_url: ChatMessageContentImageChunk.URL | string;

    type: 'image_url';
  }

  export namespace ChatMessageContentImageChunk {
    export interface URL {
      url: string;
    }
  }

  export interface ChatMessageContentFileChunk {
    file_url: ChatMessageContentFileChunk.URL | string;

    type: 'file_url';

    file_name?: string | null;
  }

  export namespace ChatMessageContentFileChunk {
    export interface URL {
      url: string;
    }
  }

  export interface ChatMessageContentPdfChunk {
    pdf_url: ChatMessageContentPdfChunk.URL | string;

    type: 'pdf_url';
  }

  export namespace ChatMessageContentPdfChunk {
    export interface URL {
      url: string;
    }
  }

  export interface ChatMessageContentVideoChunk {
    type: 'video_url';

    video_url: ChatMessageContentVideoChunk.VideoURL | string;
  }

  export namespace ChatMessageContentVideoChunk {
    export interface VideoURL {
      url: string;

      frame_interval?: string | number;
    }
  }

  /**
   * Reasoning step wrapper class
   */
  export interface ReasoningStep {
    thought: string;

    /**
     * Code generation step details wrapper class
     */
    execute_python?: ReasoningStep.ExecutePython | null;

    /**
     * Fetch url content step details wrapper class
     */
    fetch_url_content?: ReasoningStep.FetchURLContent | null;

    type?: string | null;

    /**
     * Web search step details wrapper class
     */
    web_search?: ReasoningStep.WebSearch | null;
  }

  export namespace ReasoningStep {
    /**
     * Code generation step details wrapper class
     */
    export interface ExecutePython {
      code: string;

      result: string;
    }

    /**
     * Fetch url content step details wrapper class
     */
    export interface FetchURLContent {
      contents: Array<Shared.APIPublicSearchResult>;
    }

    /**
     * Web search step details wrapper class
     */
    export interface WebSearch {
      search_keywords: Array<string>;

      search_results: Array<Shared.APIPublicSearchResult>;
    }
  }

  export interface ToolCall {
    id?: string | null;

    function?: ToolCall.Function | null;

    type?: 'function' | null;
  }

  export namespace ToolCall {
    export interface Function {
      arguments?: string | null;

      name?: string | null;
    }
  }
}

export interface ChatMessageOutput {
  content:
    | string
    | Array<
        | ChatMessageOutput.ChatMessageContentTextChunk
        | ChatMessageOutput.ChatMessageContentImageChunk
        | ChatMessageOutput.ChatMessageContentFileChunk
        | ChatMessageOutput.ChatMessageContentPdfChunk
        | ChatMessageOutput.ChatMessageContentVideoChunk
      >
    | null;

  /**
   * Chat roles enum
   */
  role: 'system' | 'user' | 'assistant' | 'tool';

  reasoning_steps?: Array<ChatMessageOutput.ReasoningStep> | null;

  tool_call_id?: string | null;

  tool_calls?: Array<ChatMessageOutput.ToolCall> | null;
}

export namespace ChatMessageOutput {
  export interface ChatMessageContentTextChunk {
    text: string;

    type: 'text';
  }

  export interface ChatMessageContentImageChunk {
    image_url: ChatMessageContentImageChunk.URL | string;

    type: 'image_url';
  }

  export namespace ChatMessageContentImageChunk {
    export interface URL {
      url: string;
    }
  }

  export interface ChatMessageContentFileChunk {
    file_url: ChatMessageContentFileChunk.URL | string;

    type: 'file_url';

    file_name?: string | null;
  }

  export namespace ChatMessageContentFileChunk {
    export interface URL {
      url: string;
    }
  }

  export interface ChatMessageContentPdfChunk {
    pdf_url: ChatMessageContentPdfChunk.URL | string;

    type: 'pdf_url';
  }

  export namespace ChatMessageContentPdfChunk {
    export interface URL {
      url: string;
    }
  }

  export interface ChatMessageContentVideoChunk {
    type: 'video_url';

    video_url: ChatMessageContentVideoChunk.VideoURL | string;
  }

  export namespace ChatMessageContentVideoChunk {
    export interface VideoURL {
      url: string;

      frame_interval?: string | number;
    }
  }

  /**
   * Reasoning step wrapper class
   */
  export interface ReasoningStep {
    thought: string;

    /**
     * Code generation step details wrapper class
     */
    execute_python?: ReasoningStep.ExecutePython | null;

    /**
     * Fetch url content step details wrapper class
     */
    fetch_url_content?: ReasoningStep.FetchURLContent | null;

    type?: string | null;

    /**
     * Web search step details wrapper class
     */
    web_search?: ReasoningStep.WebSearch | null;
  }

  export namespace ReasoningStep {
    /**
     * Code generation step details wrapper class
     */
    export interface ExecutePython {
      code: string;

      result: string;
    }

    /**
     * Fetch url content step details wrapper class
     */
    export interface FetchURLContent {
      contents: Array<Shared.APIPublicSearchResult>;
    }

    /**
     * Web search step details wrapper class
     */
    export interface WebSearch {
      search_keywords: Array<string>;

      search_results: Array<Shared.APIPublicSearchResult>;
    }
  }

  export interface ToolCall {
    id?: string | null;

    function?: ToolCall.Function | null;

    type?: 'function' | null;
  }

  export namespace ToolCall {
    export interface Function {
      arguments?: string | null;

      name?: string | null;
    }
  }
}

export interface Choice {
  delta: ChatMessageOutput;

  index: number;

  message: ChatMessageOutput;

  finish_reason?: 'stop' | 'length' | null;
}

/**
 * A single contextualized embedding result
 */
export interface ContextualizedEmbeddingObject {
  /**
   * List of embedding objects for chunks in this document
   */
  data?: Array<EmbeddingObject>;

  /**
   * The index of the document this chunk belongs to
   */
  index?: number;

  /**
   * The object type
   */
  object?: string;
}

/**
 * A single embedding result
 */
export interface EmbeddingObject {
  /**
   * Base64-encoded embedding vector. For base64_int8: decode to signed int8 array
   * (length = dimensions). For base64_binary: decode to packed bits (length =
   * dimensions / 8 bytes).
   */
  embedding?: string;

  /**
   * The index of the input text this embedding corresponds to
   */
  index?: number;

  /**
   * The object type
   */
  object?: string;
}

/**
 * Token usage for the embeddings request
 */
export interface EmbeddingsUsage {
  /**
   * Cost breakdown for the request
   */
  cost?: EmbeddingsUsage.Cost;

  /**
   * Number of tokens in the input texts
   */
  prompt_tokens?: number;

  /**
   * Total number of tokens processed
   */
  total_tokens?: number;
}

export namespace EmbeddingsUsage {
  /**
   * Cost breakdown for the request
   */
  export interface Cost {
    /**
     * Currency of the cost values
     */
    currency?: 'USD';

    /**
     * Cost for input tokens in USD
     */
    input_cost?: number;

    /**
     * Total cost for the request in USD
     */
    total_cost?: number;
  }
}

/**
 * Response from code execution
 */
export interface ExecuteCodeResponse {
  /**
   * Error message if execution failed
   */
  error?: string;

  /**
   * Time taken to execute the code in milliseconds
   */
  execution_time_ms?: number;

  /**
   * Process exit code (0 for success)
   */
  exit_code?: number;

  /**
   * Whether this was a background execution
   */
  is_background?: boolean;

  /**
   * Structured output from the execution
   */
  output?: Array<ExecuteCodeResponse.Output>;

  /**
   * PID of the background process (only for background execution)
   */
  process_id?: number;

  /**
   * Standard error from the execution
   */
  stderr?: string;

  /**
   * Standard output from the execution
   */
  stdout?: string;

  /**
   * Whether the execution completed successfully
   */
  success?: boolean;
}

export namespace ExecuteCodeResponse {
  export interface Output {
    /**
     * Output content
     */
    content?: string;

    /**
     * Output type (stdout, stderr)
     */
    type?: string;
  }
}

/**
 * A file or directory entry
 */
export interface FileEntry {
  /**
   * Absolute path of the entry
   */
  path?: string;

  /**
   * Size in bytes (0 for directories)
   */
  size?: number;

  /**
   * Entry type
   */
  type?: 'file' | 'directory';
}

/**
 * Defines a JSON schema for structured output validation
 */
export interface JsonSchemaFormat {
  /**
   * Name of the schema (1-64 alphanumeric chars)
   */
  name: string;

  /**
   * The JSON schema object
   */
  schema: { [key: string]: unknown };

  /**
   * Optional description of the schema
   */
  description?: string;

  /**
   * Whether to enforce strict schema validation
   */
  strict?: boolean;
}

/**
 * Response containing directory listing
 */
export interface ListFilesResponse {
  /**
   * List of file and directory entries
   */
  entries?: Array<FileEntry>;
}

/**
 * Response containing list of running processes
 */
export interface ListProcessesResponse {
  /**
   * List of running processes
   */
  processes?: Array<ProcessInfo>;
}

/**
 * Response containing list of modified files since session start
 */
export interface ModifiedFilesResponse {
  /**
   * List of modified file paths
   */
  files?: Array<string>;
}

/**
 * Response from pausing a sandbox session
 */
export interface PauseSandboxResponse {
  /**
   * Number of files in the snapshot
   */
  file_count?: number;

  /**
   * List of files included in the snapshot
   */
  file_list?: Array<string>;

  /**
   * S3 bucket containing the snapshot
   */
  s3_bucket?: string;

  /**
   * S3 object key for the snapshot
   */
  s3_key?: string;

  /**
   * Whether the snapshot was uploaded to S3
   */
  s3_uploaded?: boolean;

  /**
   * Whether the pause was successful
   */
  success?: boolean;

  /**
   * Size of the snapshot in bytes
   */
  tarball_size?: number;
}

/**
 * Information about a running process
 */
export interface ProcessInfo {
  /**
   * Command that started the process
   */
  command?: string;

  /**
   * Process ID
   */
  pid?: number;

  /**
   * Current status of the process
   */
  status?: string;
}

/**
 * Response containing file content
 */
export interface ReadFileResponse {
  /**
   * Base64 encoded file content
   */
  content?: string;

  /**
   * Path of the file
   */
  path?: string;

  /**
   * File size in bytes
   */
  size?: number;
}

/**
 * Specifies the desired output format for the model response
 */
export interface ResponseFormat {
  /**
   * The type of response format
   */
  type: 'json_schema';

  /**
   * Defines a JSON schema for structured output validation
   */
  json_schema?: JsonSchemaFormat;
}

/**
 * Response containing sandbox session details
 */
export interface SandboxSessionResponse {
  /**
   * URL endpoint for executing code in this session
   */
  execute_url?: string;

  /**
   * Whether network access is enabled
   */
  network_enabled?: boolean;

  /**
   * Unique identifier for the sandbox session
   */
  session_id?: string;

  /**
   * Current status of the session
   */
  status?: 'running' | 'pending' | 'failed' | 'succeeded' | 'unknown' | 'paused';
}

/**
 * A single search result used in LLM responses
 */
export interface SearchResult {
  id: number;

  snippet: string;

  title: string;

  url: string;

  date?: string;

  last_updated?: string;

  /**
   * Source of search results
   */
  source?: 'web';
}

export interface UsageInfo {
  completion_tokens: number;

  cost: UsageInfo.Cost;

  prompt_tokens: number;

  total_tokens: number;

  citation_tokens?: number | null;

  num_search_queries?: number | null;

  reasoning_tokens?: number | null;

  search_context_size?: string | null;
}

export namespace UsageInfo {
  export interface Cost {
    input_tokens_cost: number;

    output_tokens_cost: number;

    total_cost: number;

    citation_tokens_cost?: number | null;

    reasoning_tokens_cost?: number | null;

    request_cost?: number | null;

    search_queries_cost?: number | null;
  }
}

export interface UserLocation {
  city?: string | null;

  country?: string | null;

  latitude?: number | null;

  longitude?: number | null;

  region?: string | null;
}

export interface WebSearchOptions {
  image_results_enhanced_relevance?: boolean;

  search_context_size?: 'low' | 'medium' | 'high';

  search_type?: 'fast' | 'pro' | 'auto' | null;

  user_location?: UserLocation | null;
}

/**
 * Response from writing a file
 */
export interface WriteFileResponse {
  /**
   * Path where the file was written
   */
  path?: string;

  /**
   * Whether the file was written successfully
   */
  success?: boolean;
}
