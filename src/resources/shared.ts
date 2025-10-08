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
      >;

  /**
   * Chat roles enum
   */
  role: 'system' | 'user' | 'assistant' | 'tool';

  reasoning_steps?: Array<ChatMessageInput.ReasoningStep> | null;

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

    type:
      | 'web_search'
      | 'fetch_url_content'
      | 'execute_python'
      | 'agent_progress'
      | 'browser_agent'
      | 'browser_tool_execution'
      | 'file_attachment_search';

    /**
     * Agent progress class for live-browsing updates
     */
    agent_progress?: ReasoningStep.AgentProgress | null;

    /**
     * Browser agent step summary class
     */
    browser_agent?: ReasoningStep.BrowserAgent | null;

    /**
     * Tool input for kicking off browser tool automation
     */
    browser_tool_execution?: ReasoningStep.BrowserToolExecution | null;

    /**
     * Code generation step details wrapper class
     */
    execute_python?: ReasoningStep.ExecutePython | null;

    /**
     * Fetch url content step details wrapper class
     */
    fetch_url_content?: ReasoningStep.FetchURLContent | null;

    /**
     * File attachment search step details wrapper class
     */
    file_attachment_search?: ReasoningStep.FileAttachmentSearch | null;

    /**
     * Web search step details wrapper class
     */
    web_search?: ReasoningStep.WebSearch | null;
  }

  export namespace ReasoningStep {
    /**
     * Agent progress class for live-browsing updates
     */
    export interface AgentProgress {
      action: string | null;

      screenshot: string | null;

      url: string | null;
    }

    /**
     * Browser agent step summary class
     */
    export interface BrowserAgent {
      result: string;

      url: string;
    }

    /**
     * Tool input for kicking off browser tool automation
     */
    export interface BrowserToolExecution {
      tool: { [key: string]: unknown };
    }

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
     * File attachment search step details wrapper class
     */
    export interface FileAttachmentSearch {
      attachment_urls: Array<string>;
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
      >;

  /**
   * Chat roles enum
   */
  role: 'system' | 'user' | 'assistant' | 'tool';

  reasoning_steps?: Array<ChatMessageOutput.ReasoningStep> | null;

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

    type:
      | 'web_search'
      | 'fetch_url_content'
      | 'execute_python'
      | 'agent_progress'
      | 'browser_agent'
      | 'browser_tool_execution'
      | 'file_attachment_search';

    /**
     * Agent progress class for live-browsing updates
     */
    agent_progress?: ReasoningStep.AgentProgress | null;

    /**
     * Browser agent step summary class
     */
    browser_agent?: ReasoningStep.BrowserAgent | null;

    /**
     * Tool input for kicking off browser tool automation
     */
    browser_tool_execution?: ReasoningStep.BrowserToolExecution | null;

    /**
     * Code generation step details wrapper class
     */
    execute_python?: ReasoningStep.ExecutePython | null;

    /**
     * Fetch url content step details wrapper class
     */
    fetch_url_content?: ReasoningStep.FetchURLContent | null;

    /**
     * File attachment search step details wrapper class
     */
    file_attachment_search?: ReasoningStep.FileAttachmentSearch | null;

    /**
     * Web search step details wrapper class
     */
    web_search?: ReasoningStep.WebSearch | null;
  }

  export namespace ReasoningStep {
    /**
     * Agent progress class for live-browsing updates
     */
    export interface AgentProgress {
      action: string | null;

      screenshot: string | null;

      url: string | null;
    }

    /**
     * Browser agent step summary class
     */
    export interface BrowserAgent {
      result: string;

      url: string;
    }

    /**
     * Tool input for kicking off browser tool automation
     */
    export interface BrowserToolExecution {
      tool: { [key: string]: unknown };
    }

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
     * File attachment search step details wrapper class
     */
    export interface FileAttachmentSearch {
      attachment_urls: Array<string>;
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
