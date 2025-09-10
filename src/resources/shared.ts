// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface ChatChoice {
  index: number;

  message: ChatMessage;

  finish_reason?: 'stop' | 'length' | null;
}

export interface ChatMessage {
  /**
   * The content of the message
   */
  content: string | Array<ChatMessage.MultipartContent>;

  /**
   * The role of the message author
   */
  role: 'system' | 'user' | 'assistant';
}

export namespace ChatMessage {
  export interface MultipartContent {
    /**
     * The type of content
     */
    type: 'text' | 'image_url';

    image_url?: MultipartContent.ImageURL | null;

    /**
     * Text content
     */
    text?: string | null;
  }

  export namespace MultipartContent {
    export interface ImageURL {
      /**
       * URL of the image (base64 or HTTPS)
       */
      url: string;
    }
  }
}

export interface SearchResult {
  title: string;

  url: string;

  date?: string | null;
}

export interface UsageInfo {
  completion_tokens: number;

  prompt_tokens: number;

  total_tokens: number;

  citation_tokens?: number | null;

  num_search_queries?: number | null;

  reasoning_tokens?: number | null;

  search_context_size?: string | null;
}
