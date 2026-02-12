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
- <code><a href="./src/resources/shared.ts">ExecuteCodeResponse</a></code>
- <code><a href="./src/resources/shared.ts">FileEntry</a></code>
- <code><a href="./src/resources/shared.ts">JsonSchemaFormat</a></code>
- <code><a href="./src/resources/shared.ts">ListFilesResponse</a></code>
- <code><a href="./src/resources/shared.ts">ListProcessesResponse</a></code>
- <code><a href="./src/resources/shared.ts">ModifiedFilesResponse</a></code>
- <code><a href="./src/resources/shared.ts">PauseSandboxResponse</a></code>
- <code><a href="./src/resources/shared.ts">ProcessInfo</a></code>
- <code><a href="./src/resources/shared.ts">ReadFileResponse</a></code>
- <code><a href="./src/resources/shared.ts">ResponseFormat</a></code>
- <code><a href="./src/resources/shared.ts">SandboxSessionResponse</a></code>
- <code><a href="./src/resources/shared.ts">SearchResult</a></code>
- <code><a href="./src/resources/shared.ts">UsageInfo</a></code>
- <code><a href="./src/resources/shared.ts">UserLocation</a></code>
- <code><a href="./src/resources/shared.ts">WebSearchOptions</a></code>
- <code><a href="./src/resources/shared.ts">WriteFileResponse</a></code>

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
- <code><a href="./src/resources/responses.ts">FunctionCallOutputItem</a></code>
- <code><a href="./src/resources/responses.ts">FunctionTool</a></code>
- <code><a href="./src/resources/responses.ts">InputItem</a></code>
- <code><a href="./src/resources/responses.ts">OutputItem</a></code>
- <code><a href="./src/resources/responses.ts">ResponseStreamChunk</a></code>
- <code><a href="./src/resources/responses.ts">ResponsesCreateParams</a></code>
- <code><a href="./src/resources/responses.ts">ResponsesUsage</a></code>
- <code><a href="./src/resources/responses.ts">ResponseCreateResponse</a></code>

Methods:

- <code title="post /v1/responses">client.responses.<a href="./src/resources/responses.ts">create</a>({ ...params }) -> ResponseCreateResponse</code>

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

# Sandbox

## Sessions

Methods:

- <code title="post /v1/sandbox/sessions">client.sandbox.sessions.<a href="./src/resources/sandbox/sessions/sessions.ts">create</a>({ ...params }) -> SandboxSessionResponse</code>
- <code title="delete /v1/sandbox/sessions/{session_id}">client.sandbox.sessions.<a href="./src/resources/sandbox/sessions/sessions.ts">delete</a>(sessionID) -> void</code>
- <code title="get /v1/sandbox/sessions/{session_id}">client.sandbox.sessions.<a href="./src/resources/sandbox/sessions/sessions.ts">get</a>(sessionID) -> SandboxSessionResponse</code>

### Execute

Methods:

- <code title="post /v1/sandbox/sessions/{session_id}/execute">client.sandbox.sessions.execute.<a href="./src/resources/sandbox/sessions/execute.ts">create</a>(sessionID, { ...params }) -> ExecuteCodeResponse</code>

### Pause

Methods:

- <code title="post /v1/sandbox/sessions/{session_id}/pause">client.sandbox.sessions.pause.<a href="./src/resources/sandbox/sessions/pause.ts">create</a>(sessionID) -> PauseSandboxResponse</code>

### Resume

Methods:

- <code title="post /v1/sandbox/sessions/{session_id}/resume">client.sandbox.sessions.resume.<a href="./src/resources/sandbox/sessions/resume.ts">create</a>(sessionID, { ...params }) -> SandboxSessionResponse</code>

### Files

Methods:

- <code title="get /v1/sandbox/sessions/{session_id}/files/list">client.sandbox.sessions.files.<a href="./src/resources/sandbox/sessions/files.ts">list</a>(sessionID, { ...params }) -> ListFilesResponse</code>
- <code title="get /v1/sandbox/sessions/{session_id}/files/modified">client.sandbox.sessions.files.<a href="./src/resources/sandbox/sessions/files.ts">modified</a>(sessionID) -> ModifiedFilesResponse</code>
- <code title="get /v1/sandbox/sessions/{session_id}/files">client.sandbox.sessions.files.<a href="./src/resources/sandbox/sessions/files.ts">read</a>(sessionID, { ...params }) -> ReadFileResponse</code>
- <code title="post /v1/sandbox/sessions/{session_id}/files">client.sandbox.sessions.files.<a href="./src/resources/sandbox/sessions/files.ts">write</a>(sessionID, { ...params }) -> WriteFileResponse</code>

### Processes

Methods:

- <code title="get /v1/sandbox/sessions/{session_id}/processes">client.sandbox.sessions.processes.<a href="./src/resources/sandbox/sessions/processes.ts">list</a>(sessionID) -> ListProcessesResponse</code>
- <code title="delete /v1/sandbox/sessions/{session_id}/processes/{pid}">client.sandbox.sessions.processes.<a href="./src/resources/sandbox/sessions/processes.ts">delete</a>(pid, { ...params }) -> void</code>
- <code title="get /v1/sandbox/sessions/{session_id}/processes/{pid}">client.sandbox.sessions.processes.<a href="./src/resources/sandbox/sessions/processes.ts">get</a>(pid, { ...params }) -> ProcessInfo</code>

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
