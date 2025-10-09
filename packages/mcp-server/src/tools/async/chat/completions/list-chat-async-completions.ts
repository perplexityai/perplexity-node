// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@perplexity-ai/perplexity_ai-mcp/filtering';
import { Metadata, asTextContentResult } from '@perplexity-ai/perplexity_ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Perplexity from '@perplexity-ai/perplexity_ai';

export const metadata: Metadata = {
  resource: 'async.chat.completions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/async/chat/completions',
  operationId: 'list_async_chat_completions_async_chat_completions_get',
};

export const tool: Tool = {
  name: 'list_chat_async_completions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a list of all asynchronous chat completion requests for a given user.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'ListAsyncApiChatCompletionsResponse',\n  properties: {\n    requests: {\n      type: 'array',\n      title: 'Requests',\n      items: {\n        type: 'object',\n        title: 'AsyncApiChatCompletionsResponseSummary',\n        properties: {\n          id: {\n            type: 'string',\n            title: 'Id'\n          },\n          created_at: {\n            type: 'integer',\n            title: 'Created At'\n          },\n          model: {\n            type: 'string',\n            title: 'Model'\n          },\n          status: {\n            type: 'string',\n            title: 'AsyncProcessingStatus',\n            description: 'Status enum for async processing.',\n            enum: [              'CREATED',\n              'IN_PROGRESS',\n              'COMPLETED',\n              'FAILED'\n            ]\n          },\n          completed_at: {\n            type: 'integer',\n            title: 'Completed At'\n          },\n          failed_at: {\n            type: 'integer',\n            title: 'Failed At'\n          },\n          started_at: {\n            type: 'integer',\n            title: 'Started At'\n          }\n        },\n        required: [          'id',\n          'created_at',\n          'model',\n          'status'\n        ]\n      }\n    },\n    next_token: {\n      type: 'string',\n      title: 'Next Token'\n    }\n  },\n  required: [    'requests'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Perplexity, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.async.chat.completions.list()));
};

export default { metadata, tool, handler };
