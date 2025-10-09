// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@perplexity-ai/mcp-server/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Perplexity from '@perplexity-ai/perplexity_ai';

export const metadata: Metadata = {
  resource: 'async.chat.completions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/async/chat/completions/{api_request}',
  operationId: 'get_async_chat_completion_response_async_chat_completions__api_request__get',
};

export const tool: Tool = {
  name: 'get_chat_async_completions',
  description: 'Retrieve the response for a given asynchronous chat completion request.',
  inputSchema: {
    type: 'object',
    properties: {
      api_request: {
        type: 'string',
        title: 'Api Request',
      },
      local_mode: {
        type: 'boolean',
        title: 'Local Mode',
      },
      'x-client-env': {
        type: 'string',
        title: 'X-Client-Env',
      },
      'x-client-name': {
        type: 'string',
        title: 'X-Client-Name',
      },
      'x-created-at-epoch-seconds': {
        type: 'string',
        title: 'X-Created-At-Epoch-Seconds',
      },
      'x-request-time': {
        type: 'string',
        title: 'X-Request-Time',
      },
      'x-usage-tier': {
        type: 'string',
        title: 'X-Usage-Tier',
      },
      'x-user-id': {
        type: 'string',
        title: 'X-User-Id',
      },
    },
    required: ['api_request'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Perplexity, args: Record<string, unknown> | undefined) => {
  const { api_request, ...body } = args as any;
  return asTextContentResult(await client.async.chat.completions.get(api_request, body));
};

export default { metadata, tool, handler };
