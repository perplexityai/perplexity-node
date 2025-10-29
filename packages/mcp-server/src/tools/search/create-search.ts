// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@perplexity-ai/mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Perplexity from '@perplexity-ai/perplexity_ai';

export const metadata: Metadata = {
  resource: 'search',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/search',
  operationId: 'search_search_post',
};

export const tool: Tool = {
  name: 'create_search',
  description: 'Search the web and retrieve relevant web page contents.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
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
        title: 'Query',
      },
      display_server_time: {
        type: 'boolean',
        title: 'Display Server Time',
      },
      max_results: {
        type: 'integer',
        title: 'Max Results',
      },
      max_tokens: {
        type: 'integer',
        title: 'Max Tokens',
      },
      max_tokens_per_page: {
        type: 'integer',
        title: 'Max Tokens Per Page',
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
    },
    required: ['query'],
  },
  annotations: {},
};

export const handler = async (client: Perplexity, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.search.create(body));
};

export default { metadata, tool, handler };
