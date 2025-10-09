// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@perplexity-ai/perplexity_ai-mcp/filtering';
import { Metadata, asTextContentResult } from '@perplexity-ai/perplexity_ai-mcp/tools/types';

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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSearch the web and retrieve relevant web page contents.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'ApiSearchResponse',\n  properties: {\n    id: {\n      type: 'string',\n      title: 'Id'\n    },\n    results: {\n      type: 'array',\n      title: 'Results',\n      items: {\n        type: 'object',\n        title: 'ApiSearchPage',\n        properties: {\n          snippet: {\n            type: 'string',\n            title: 'Snippet'\n          },\n          title: {\n            type: 'string',\n            title: 'Title'\n          },\n          url: {\n            type: 'string',\n            title: 'Url'\n          },\n          date: {\n            type: 'string',\n            title: 'Date'\n          },\n          last_updated: {\n            type: 'string',\n            title: 'Last Updated'\n          }\n        },\n        required: [          'snippet',\n          'title',\n          'url'\n        ]\n      }\n    },\n    server_time: {\n      type: 'string',\n      title: 'Server Time'\n    }\n  },\n  required: [    'id',\n    'results'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['query'],
  },
  annotations: {},
};

export const handler = async (client: Perplexity, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.search.create(body)));
};

export default { metadata, tool, handler };
