# Shared

Types:

- <code><a href="./src/resources/shared.ts">APIPublicSearchResult</a></code>
- <code><a href="./src/resources/shared.ts">ChatMessageInput</a></code>
- <code><a href="./src/resources/shared.ts">ChatMessageOutput</a></code>
- <code><a href="./src/resources/shared.ts">Choice</a></code>
- <code><a href="./src/resources/shared.ts">JsonSchemaFormat</a></code>
- <code><a href="./src/resources/shared.ts">ResponseFormat</a></code>
- <code><a href="./src/resources/shared.ts">SearchResult</a></code>
- <code><a href="./src/resources/shared.ts">UsageInfo</a></code>
- <code><a href="./src/resources/shared.ts">UserLocation</a></code>
- <code><a href="./src/resources/shared.ts">WebSearchOptions</a></code>

# Chat

Types:

- <code><a href="./src/resources/chat/chat.ts">StreamChunk</a></code>

## Completions

Methods:

- <code title="post /chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> StreamChunk</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchCreateResponse</a></code>

Methods:

- <code title="post /search">client.search.<a href="./src/resources/search.ts">create</a>({ ...params }) -> SearchCreateResponse</code>

# Responses

Types:

- <code><a href="./src/resources/responses.ts">Annotation</a></code>
- <code><a href="./src/resources/responses.ts">ContentPart</a></code>
- <code><a href="./src/resources/responses.ts">ErrorInfo</a></code>
- <code><a href="./src/resources/responses.ts">OutputItem</a></code>
- <code><a href="./src/resources/responses.ts">ResponseStreamChunk</a></code>
- <code><a href="./src/resources/responses.ts">ResponsesCreateParams</a></code>
- <code><a href="./src/resources/responses.ts">ResponsesUsage</a></code>
- <code><a href="./src/resources/responses.ts">ResponseCreateResponse</a></code>

Methods:

- <code title="post /v2/responses">client.responses.<a href="./src/resources/responses.ts">create</a>({ ...params }) -> ResponseCreateResponse</code>

# Async

## Chat

### Completions

Types:

- <code><a href="./src/resources/async/chat/completions.ts">CompletionCreateResponse</a></code>
- <code><a href="./src/resources/async/chat/completions.ts">CompletionListResponse</a></code>
- <code><a href="./src/resources/async/chat/completions.ts">CompletionGetResponse</a></code>

Methods:

- <code title="post /async/chat/completions">client.async.chat.completions.<a href="./src/resources/async/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>
- <code title="get /async/chat/completions">client.async.chat.completions.<a href="./src/resources/async/chat/completions.ts">list</a>() -> CompletionListResponse</code>
- <code title="get /async/chat/completions/{api_request}">client.async.chat.completions.<a href="./src/resources/async/chat/completions.ts">get</a>(apiRequest, { ...params }) -> CompletionGetResponse</code>
