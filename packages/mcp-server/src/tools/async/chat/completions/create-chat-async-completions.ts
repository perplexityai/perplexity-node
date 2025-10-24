// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@perplexity-ai/perplexity_ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Perplexity from '@perplexity-ai/perplexity_ai';

export const metadata: Metadata = {
  resource: 'async.chat.completions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/async/chat/completions',
  operationId: 'create_async_chat_completions_async_chat_completions_post',
};

export const tool: Tool = {
  name: 'create_chat_async_completions',
  description: 'Submit an asynchronous chat completion request.',
  inputSchema: {
    type: 'object',
    properties: {
      request: {
        type: 'object',
        title: 'ApiChatCompletionsRequest',
        properties: {
          messages: {
            type: 'array',
            title: 'Messages',
            items: {
              $ref: '#/$defs/chat_message_input',
            },
          },
          model: {
            type: 'string',
            title: 'Model',
          },
          _debug_pro_search: {
            type: 'boolean',
            title: 'Debug Pro Search',
          },
          _inputs: {
            type: 'array',
            title: 'Inputs',
            items: {
              type: 'integer',
            },
          },
          _is_browser_agent: {
            type: 'boolean',
            title: 'Is Browser Agent',
          },
          _prompt_token_length: {
            type: 'integer',
            title: 'Prompt Token Length',
          },
          best_of: {
            type: 'integer',
            title: 'Best Of',
          },
          country: {
            type: 'string',
            title: 'Country',
          },
          cum_logprobs: {
            type: 'boolean',
            title: 'Cum Logprobs',
          },
          debug_params: {
            type: 'object',
            title: 'DebugParams',
            properties: {
              summarizer_model_override: {
                type: 'string',
                title: 'Summarizer Model Override',
              },
              summarizer_prompt_override: {
                type: 'string',
                title: 'Summarizer Prompt Override',
              },
            },
          },
          disable_search: {
            type: 'boolean',
            title: 'Disable Search',
          },
          diverse_first_token: {
            type: 'boolean',
            title: 'Diverse First Token',
          },
          enable_search_classifier: {
            type: 'boolean',
            title: 'Enable Search Classifier',
          },
          file_workspace_id: {
            type: 'string',
            title: 'File Workspace Id',
          },
          frequency_penalty: {
            type: 'number',
            title: 'Frequency Penalty',
          },
          has_image_url: {
            type: 'boolean',
            title: 'Has Image Url',
          },
          image_domain_filter: {
            type: 'array',
            title: 'Image Domain Filter',
            items: {
              type: 'string',
            },
          },
          image_format_filter: {
            type: 'array',
            title: 'Image Format Filter',
            items: {
              type: 'string',
            },
          },
          language_preference: {
            type: 'string',
            title: 'Language Preference',
          },
          last_updated_after_filter: {
            type: 'string',
            title: 'Last Updated After Filter',
          },
          last_updated_before_filter: {
            type: 'string',
            title: 'Last Updated Before Filter',
          },
          latitude: {
            type: 'number',
            title: 'Latitude',
          },
          logprobs: {
            type: 'boolean',
            title: 'Logprobs',
          },
          longitude: {
            type: 'number',
            title: 'Longitude',
          },
          max_tokens: {
            type: 'integer',
            title: 'Max Tokens',
          },
          n: {
            type: 'integer',
            title: 'N',
          },
          num_images: {
            type: 'integer',
            title: 'Num Images',
          },
          num_search_results: {
            type: 'integer',
            title: 'Num Search Results',
          },
          parallel_tool_calls: {
            type: 'boolean',
            title: 'Parallel Tool Calls',
          },
          presence_penalty: {
            type: 'number',
            title: 'Presence Penalty',
          },
          ranking_model: {
            type: 'string',
            title: 'Ranking Model',
          },
          reasoning_effort: {
            type: 'string',
            title: 'Reasoning Effort',
            enum: ['minimal', 'low', 'medium', 'high'],
          },
          response_format: {
            anyOf: [
              {
                type: 'object',
                title: 'ResponseFormatText',
                properties: {
                  type: {
                    type: 'string',
                    title: 'Type',
                    enum: ['text'],
                  },
                },
                required: ['type'],
              },
              {
                type: 'object',
                title: 'ResponseFormatJSONSchema',
                properties: {
                  json_schema: {
                    type: 'object',
                    title: 'JSONSchema',
                    properties: {
                      schema: {
                        type: 'object',
                        title: 'Schema',
                        additionalProperties: true,
                      },
                      description: {
                        type: 'string',
                        title: 'Description',
                      },
                      name: {
                        type: 'string',
                        title: 'Name',
                      },
                      strict: {
                        type: 'boolean',
                        title: 'Strict',
                      },
                    },
                    required: ['schema'],
                  },
                  type: {
                    type: 'string',
                    title: 'Type',
                    enum: ['json_schema'],
                  },
                },
                required: ['json_schema', 'type'],
              },
              {
                type: 'object',
                title: 'ResponseFormatRegex',
                properties: {
                  regex: {
                    type: 'object',
                    title: 'RegexSchema',
                    properties: {
                      regex: {
                        type: 'string',
                        title: 'Regex',
                      },
                      description: {
                        type: 'string',
                        title: 'Description',
                      },
                      name: {
                        type: 'string',
                        title: 'Name',
                      },
                      strict: {
                        type: 'boolean',
                        title: 'Strict',
                      },
                    },
                    required: ['regex'],
                  },
                  type: {
                    type: 'string',
                    title: 'Type',
                    enum: ['regex'],
                  },
                },
                required: ['regex', 'type'],
              },
            ],
            title: 'Response Format',
          },
          response_metadata: {
            type: 'object',
            title: 'Response Metadata',
            additionalProperties: true,
          },
          return_images: {
            type: 'boolean',
            title: 'Return Images',
          },
          return_related_questions: {
            type: 'boolean',
            title: 'Return Related Questions',
          },
          safe_search: {
            type: 'boolean',
            title: 'Safe Search',
          },
          search_after_date_filter: {
            type: 'string',
            title: 'Search After Date Filter',
          },
          search_before_date_filter: {
            type: 'string',
            title: 'Search Before Date Filter',
          },
          search_domain_filter: {
            type: 'array',
            title: 'Search Domain Filter',
            items: {
              type: 'string',
            },
          },
          search_internal_properties: {
            type: 'object',
            title: 'Search Internal Properties',
            additionalProperties: true,
          },
          search_mode: {
            type: 'string',
            title: 'Search Mode',
            enum: ['web', 'academic', 'sec'],
          },
          search_recency_filter: {
            type: 'string',
            title: 'Search Recency Filter',
            enum: ['hour', 'day', 'week', 'month', 'year'],
          },
          search_tenant: {
            type: 'string',
            title: 'Search Tenant',
          },
          stop: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            ],
            title: 'Stop',
          },
          stream: {
            type: 'boolean',
            title: 'Stream',
          },
          stream_mode: {
            type: 'string',
            title: 'Stream Mode',
            enum: ['full', 'concise'],
          },
          temperature: {
            type: 'number',
            title: 'Temperature',
          },
          thread_id: {
            type: 'string',
            title: 'Thread Id',
          },
          tool_choice: {
            type: 'string',
            title: 'Tool Choice',
            enum: ['none', 'auto', 'required'],
          },
          tools: {
            type: 'array',
            title: 'Tools',
            items: {
              type: 'object',
              title: 'ToolSpec',
              properties: {
                function: {
                  type: 'object',
                  title: 'FunctionSpec',
                  properties: {
                    description: {
                      type: 'string',
                      title: 'Description',
                    },
                    name: {
                      type: 'string',
                      title: 'Name',
                    },
                    parameters: {
                      type: 'object',
                      title: 'ParameterSpec',
                      properties: {
                        properties: {
                          type: 'object',
                          title: 'Properties',
                          additionalProperties: true,
                        },
                        type: {
                          type: 'string',
                          title: 'Type',
                        },
                        additional_properties: {
                          type: 'boolean',
                          title: 'Additional Properties',
                        },
                        required: {
                          type: 'array',
                          title: 'Required',
                          items: {
                            type: 'string',
                          },
                        },
                      },
                      required: ['properties', 'type'],
                    },
                    strict: {
                      type: 'boolean',
                      title: 'Strict',
                    },
                  },
                  required: ['description', 'name', 'parameters'],
                },
                type: {
                  type: 'string',
                  title: 'Type',
                  enum: ['function'],
                },
              },
              required: ['function', 'type'],
            },
          },
          top_k: {
            type: 'integer',
            title: 'Top K',
          },
          top_logprobs: {
            type: 'integer',
            title: 'Top Logprobs',
          },
          top_p: {
            type: 'number',
            title: 'Top P',
          },
          updated_after_timestamp: {
            type: 'integer',
            title: 'Updated After Timestamp',
          },
          updated_before_timestamp: {
            type: 'integer',
            title: 'Updated Before Timestamp',
          },
          use_threads: {
            type: 'boolean',
            title: 'Use Threads',
          },
          web_search_options: {
            type: 'object',
            title: 'WebSearchOptions',
            properties: {
              image_results_enhanced_relevance: {
                type: 'boolean',
                title: 'Image Results Enhanced Relevance',
              },
              search_context_size: {
                type: 'string',
                title: 'Search Context Size',
                enum: ['low', 'medium', 'high'],
              },
              search_type: {
                type: 'string',
                title: 'Search Type',
                enum: ['fast', 'pro', 'auto'],
              },
              user_location: {
                type: 'object',
                title: 'UserLocation',
                properties: {
                  city: {
                    type: 'string',
                    title: 'City',
                  },
                  country: {
                    type: 'string',
                    title: 'Country',
                  },
                  latitude: {
                    type: 'number',
                    title: 'Latitude',
                  },
                  longitude: {
                    type: 'number',
                    title: 'Longitude',
                  },
                  region: {
                    type: 'string',
                    title: 'Region',
                  },
                },
              },
            },
          },
        },
        required: ['messages', 'model'],
      },
      idempotency_key: {
        type: 'string',
        title: 'Idempotency Key',
      },
    },
    required: ['request'],
    $defs: {
      chat_message_input: {
        type: 'object',
        title: 'ChatMessage',
        properties: {
          content: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'array',
                title: 'Structured Content',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      title: 'ChatMessageContentTextChunk',
                      properties: {
                        text: {
                          type: 'string',
                          title: 'Text',
                        },
                        type: {
                          type: 'string',
                          title: 'Type',
                          enum: ['text'],
                        },
                      },
                      required: ['text', 'type'],
                    },
                    {
                      type: 'object',
                      title: 'ChatMessageContentImageChunk',
                      properties: {
                        image_url: {
                          anyOf: [
                            {
                              type: 'object',
                              title: 'URL',
                              properties: {
                                url: {
                                  type: 'string',
                                  title: 'Url',
                                },
                              },
                              required: ['url'],
                            },
                            {
                              type: 'string',
                            },
                          ],
                          title: 'Image Url',
                        },
                        type: {
                          type: 'string',
                          title: 'Type',
                          enum: ['image_url'],
                        },
                      },
                      required: ['image_url', 'type'],
                    },
                    {
                      type: 'object',
                      title: 'ChatMessageContentFileChunk',
                      properties: {
                        file_url: {
                          anyOf: [
                            {
                              type: 'object',
                              title: 'URL',
                              properties: {
                                url: {
                                  type: 'string',
                                  title: 'Url',
                                },
                              },
                              required: ['url'],
                            },
                            {
                              type: 'string',
                            },
                          ],
                          title: 'File Url',
                        },
                        type: {
                          type: 'string',
                          title: 'Type',
                          enum: ['file_url'],
                        },
                        file_name: {
                          type: 'string',
                          title: 'File Name',
                        },
                      },
                      required: ['file_url', 'type'],
                    },
                    {
                      type: 'object',
                      title: 'ChatMessageContentPDFChunk',
                      properties: {
                        pdf_url: {
                          anyOf: [
                            {
                              type: 'object',
                              title: 'URL',
                              properties: {
                                url: {
                                  type: 'string',
                                  title: 'Url',
                                },
                              },
                              required: ['url'],
                            },
                            {
                              type: 'string',
                            },
                          ],
                          title: 'Pdf Url',
                        },
                        type: {
                          type: 'string',
                          title: 'Type',
                          enum: ['pdf_url'],
                        },
                      },
                      required: ['pdf_url', 'type'],
                    },
                    {
                      type: 'object',
                      title: 'ChatMessageContentVideoChunk',
                      properties: {
                        type: {
                          type: 'string',
                          title: 'Type',
                          enum: ['video_url'],
                        },
                        video_url: {
                          anyOf: [
                            {
                              type: 'object',
                              title: 'VideoURL',
                              properties: {
                                url: {
                                  type: 'string',
                                  title: 'Url',
                                },
                                frame_interval: {
                                  anyOf: [
                                    {
                                      type: 'string',
                                    },
                                    {
                                      type: 'integer',
                                    },
                                  ],
                                  title: 'Frame Interval',
                                },
                              },
                              required: ['url'],
                            },
                            {
                              type: 'string',
                            },
                          ],
                          title: 'Video Url',
                        },
                      },
                      required: ['type', 'video_url'],
                    },
                  ],
                },
              },
            ],
            title: 'Content',
          },
          role: {
            type: 'string',
            title: 'ChatMessageRole',
            description: 'Chat roles enum',
            enum: ['system', 'user', 'assistant', 'tool'],
          },
          reasoning_steps: {
            type: 'array',
            title: 'Reasoning Steps',
            items: {
              type: 'object',
              title: 'ReasoningStep',
              description: 'Reasoning step wrapper class',
              properties: {
                thought: {
                  type: 'string',
                  title: 'Thought',
                },
                type: {
                  type: 'string',
                  title: 'Type',
                  enum: [
                    'web_search',
                    'fetch_url_content',
                    'execute_python',
                    'agent_progress',
                    'browser_agent',
                    'browser_tool_execution',
                    'file_attachment_search',
                  ],
                },
                agent_progress: {
                  type: 'object',
                  title: 'AgentProgressStepDetails',
                  description: 'Agent progress class for live-browsing updates',
                  properties: {
                    action: {
                      type: 'string',
                      title: 'Action',
                    },
                    screenshot: {
                      type: 'string',
                      title: 'Screenshot',
                    },
                    url: {
                      type: 'string',
                      title: 'Url',
                    },
                  },
                  required: ['action', 'screenshot', 'url'],
                },
                browser_agent: {
                  type: 'object',
                  title: 'BrowserAgentStepDetails',
                  description: 'Browser agent step summary class',
                  properties: {
                    result: {
                      type: 'string',
                      title: 'Result',
                    },
                    url: {
                      type: 'string',
                      title: 'Url',
                    },
                  },
                  required: ['result', 'url'],
                },
                browser_tool_execution: {
                  type: 'object',
                  title: 'BrowserToolExecutionDetails',
                  description: 'Tool input for kicking off browser tool automation',
                  properties: {
                    tool: {
                      type: 'object',
                      title: 'Tool',
                      additionalProperties: true,
                    },
                  },
                  required: ['tool'],
                },
                execute_python: {
                  type: 'object',
                  title: 'ExecutePythonStepDetails',
                  description: 'Code generation step details wrapper class',
                  properties: {
                    code: {
                      type: 'string',
                      title: 'Code',
                    },
                    result: {
                      type: 'string',
                      title: 'Result',
                    },
                  },
                  required: ['code', 'result'],
                },
                fetch_url_content: {
                  type: 'object',
                  title: 'FetchUrlContentStepDetails',
                  description: 'Fetch url content step details wrapper class',
                  properties: {
                    contents: {
                      type: 'array',
                      title: 'Contents',
                      items: {
                        $ref: '#/$defs/api_public_search_result',
                      },
                    },
                  },
                  required: ['contents'],
                },
                file_attachment_search: {
                  type: 'object',
                  title: 'FileAttachmentSearchStepDetails',
                  description: 'File attachment search step details wrapper class',
                  properties: {
                    attachment_urls: {
                      type: 'array',
                      title: 'Attachment Urls',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  required: ['attachment_urls'],
                },
                web_search: {
                  type: 'object',
                  title: 'WebSearchStepDetails',
                  description: 'Web search step details wrapper class',
                  properties: {
                    search_keywords: {
                      type: 'array',
                      title: 'Search Keywords',
                      items: {
                        type: 'string',
                      },
                    },
                    search_results: {
                      type: 'array',
                      title: 'Search Results',
                      items: {
                        $ref: '#/$defs/api_public_search_result',
                      },
                    },
                  },
                  required: ['search_keywords', 'search_results'],
                },
              },
              required: ['thought', 'type'],
            },
          },
          tool_calls: {
            type: 'array',
            title: 'Tool Calls',
            items: {
              type: 'object',
              title: 'ToolCall',
              properties: {
                id: {
                  type: 'string',
                  title: 'Id',
                },
                function: {
                  type: 'object',
                  title: 'ToolCallFunction',
                  properties: {
                    arguments: {
                      type: 'string',
                      title: 'Arguments',
                    },
                    name: {
                      type: 'string',
                      title: 'Name',
                    },
                  },
                },
                type: {
                  type: 'string',
                  title: 'Type',
                  enum: ['function'],
                },
              },
            },
          },
        },
        required: ['content', 'role'],
      },
      api_public_search_result: {
        type: 'object',
        title: 'ApiPublicSearchResult',
        properties: {
          title: {
            type: 'string',
            title: 'Title',
          },
          url: {
            type: 'string',
            title: 'Url',
          },
          date: {
            type: 'string',
            title: 'Date',
          },
          last_updated: {
            type: 'string',
            title: 'Last Updated',
          },
          snippet: {
            type: 'string',
            title: 'Snippet',
          },
          source: {
            type: 'string',
            title: 'Source',
            enum: ['web', 'attachment'],
          },
        },
        required: ['title', 'url'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Perplexity, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.async.chat.completions.create(body));
};

export default { metadata, tool, handler };
