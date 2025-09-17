# Shared

Types:

- <code><a href="./src/resources/shared.ts">APIPublicSearchResult</a></code>
- <code><a href="./src/resources/shared.ts">ChatMessageInput</a></code>
- <code><a href="./src/resources/shared.ts">ChatMessageOutput</a></code>
- <code><a href="./src/resources/shared.ts">Choice</a></code>
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
- <code title="get /async/chat/completions">client.async.chat.completions.<a href="./src/resources/async/chat/completions.ts">list</a>() -> CompletionListResponse</code>
- <code title="get /async/chat/completions/{api_request}">client.async.chat.completions.<a href="./src/resources/async/chat/completions.ts">get</a>(apiRequest, { ...params }) -> CompletionGetResponse</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchCreateResponse</a></code>

Methods:

- <code title="post /search">client.search.<a href="./src/resources/search.ts">create</a>({ ...params }) -> SearchCreateResponse</code>
