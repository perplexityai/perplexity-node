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
