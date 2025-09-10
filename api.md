# Shared

Types:

- <code><a href="./src/resources/shared.ts">ChatChoice</a></code>
- <code><a href="./src/resources/shared.ts">ChatMessage</a></code>
- <code><a href="./src/resources/shared.ts">SearchResult</a></code>
- <code><a href="./src/resources/shared.ts">UsageInfo</a></code>

# Chat

## Completions

Types:

- <code><a href="./src/resources/chat/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>

# Async

## Chat

### Completions

Types:

- <code><a href="./src/resources/async/chat/completions.ts">CompletionCreateResponse</a></code>
- <code><a href="./src/resources/async/chat/completions.ts">CompletionListResponse</a></code>
- <code><a href="./src/resources/async/chat/completions.ts">CompletionGetResponse</a></code>

Methods:

- <code title="post /async/chat/completions">client.async.chat.completions.<a href="./src/resources/async/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>
- <code title="get /async/chat/completions">client.async.chat.completions.<a href="./src/resources/async/chat/completions.ts">list</a>({ ...params }) -> CompletionListResponse</code>
- <code title="get /async/chat/completions/{request_id}">client.async.chat.completions.<a href="./src/resources/async/chat/completions.ts">get</a>(requestID) -> CompletionGetResponse</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchCreateResponse</a></code>

Methods:

- <code title="post /search">client.search.<a href="./src/resources/search.ts">create</a>({ ...params }) -> SearchCreateResponse</code>

# Content

Types:

- <code><a href="./src/resources/content.ts">ContentCreateResponse</a></code>

Methods:

- <code title="post /content">client.content.<a href="./src/resources/content.ts">create</a>({ ...params }) -> ContentCreateResponse</code>
