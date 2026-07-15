# Shared

Types:

- <code><a href="./src/resources/shared.ts">APIPublicSearchResult</a></code>
- <code><a href="./src/resources/shared.ts">BrowserSessionResponse</a></code>
- <code><a href="./src/resources/shared.ts">ChatMessageInput</a></code>
- <code><a href="./src/resources/shared.ts">ChatMessageOutput</a></code>
- <code><a href="./src/resources/shared.ts">Choice</a></code>
- <code><a href="./src/resources/shared.ts">ContextualizedEmbeddingObject</a></code>
- <code><a href="./src/resources/shared.ts">EmbeddingObject</a></code>
- <code><a href="./src/resources/shared.ts">EmbeddingsUsage</a></code>
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

- <code><a href="./src/resources/responses/responses.ts">Annotation</a></code>
- <code><a href="./src/resources/responses/responses.ts">ContentPart</a></code>
- <code><a href="./src/resources/responses/responses.ts">ErrorInfo</a></code>
- <code><a href="./src/resources/responses/responses.ts">FunctionCallOutputItem</a></code>
- <code><a href="./src/resources/responses/responses.ts">FunctionTool</a></code>
- <code><a href="./src/resources/responses/responses.ts">InputItem</a></code>
- <code><a href="./src/resources/responses/responses.ts">OutputItem</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseFile</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseFileList</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseStreamChunk</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponsesCreateParams</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponsesUsage</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseCreateResponse</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseRetrieveResponse</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseCancelResponse</a></code>

Methods:

- <code title="post /v1/responses">client.responses.<a href="./src/resources/responses/responses.ts">create</a>({ ...params }) -> ResponseCreateResponse</code>
- <code title="get /v1/responses/{response_id}">client.responses.<a href="./src/resources/responses/responses.ts">retrieve</a>(responseID) -> ResponseRetrieveResponse</code>
- <code title="post /v1/responses/{response_id}/cancel">client.responses.<a href="./src/resources/responses/responses.ts">cancel</a>(responseID) -> ResponseCancelResponse</code>

## Files

Methods:

- <code title="get /v1/responses/{response_id}/files">client.responses.files.<a href="./src/resources/responses/files.ts">list</a>(responseID) -> ResponseFileList</code>
- <code title="get /v1/responses/{response_id}/files/{file_id}/content">client.responses.files.<a href="./src/resources/responses/files.ts">content</a>(fileID, { ...params }) -> Response</code>

# Embeddings

Types:

- <code><a href="./src/resources/embeddings.ts">EmbeddingCreateResponse</a></code>

Methods:

- <code title="post /v1/embeddings">client.embeddings.<a href="./src/resources/embeddings.ts">create</a>({ ...params }) -> EmbeddingCreateResponse</code>

# ContextualizedEmbeddings

Types:

- <code><a href="./src/resources/contextualized-embeddings.ts">ContextualizedEmbeddingCreateResponse</a></code>

Methods:

- <code title="post /v1/contextualizedembeddings">client.contextualizedEmbeddings.<a href="./src/resources/contextualized-embeddings.ts">create</a>({ ...params }) -> ContextualizedEmbeddingCreateResponse</code>

# Browser

## Sessions

Methods:

- <code title="post /v1/browser/sessions">client.browser.sessions.<a href="./src/resources/browser/sessions.ts">create</a>() -> BrowserSessionResponse</code>
- <code title="delete /v1/browser/sessions/{session_id}">client.browser.sessions.<a href="./src/resources/browser/sessions.ts">delete</a>(sessionID) -> void</code>

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
