# API

Endpoint resources and request/response models are generated from Perplexity OpenAPI contract.
All generated classes and types are exported from package root and available under `API` namespace.
See [`src/generated/api.ts`](./src/generated/api.ts) for full contract.

## Chat completions

```ts
client.chat.completions.create(body: ApiChatCompletionsRequestInput)
  : APIPromise<CompletionResponseOutput>

client.chat.completions.create({ ...body, stream: true })
  : APIPromise<Stream<CompletionResponseOutput>>
```

## Search

```ts
client.search.create(body: ApiSearchRequestInput)
  : APIPromise<ApiSearchResponseOutput>
```

## Responses

```ts
client.responses.create(body: ResponsesRequestInput)
  : APIPromise<ResponsesResponseOutput | Stream<ResponseStreamEventOutput>>

client.responses.retrieve(responseID: string)
  : APIPromise<ResponsesResponseOutput>

client.responses.cancel(responseID: string)
  : APIPromise<{ response_id: string; status: 'cancelling' }>

client.responses.files.list(responseID: string)
  : APIPromise<ResponseFileListOutput>

client.responses.files.content(fileID: string, { response_id: string })
  : APIPromise<Response>
```

## Embeddings

```ts
client.embeddings.create(body: EmbeddingsRequestInput)
  : APIPromise<EmbeddingsResponseOutput>

client.contextualizedEmbeddings.create(body: ContextualizedEmbeddingsRequestInput)
  : APIPromise<ContextualizedEmbeddingsResponseOutput>
```

## Browser sessions

```ts
client.browser.sessions.create(body?: CreateBrowserSessionRequestInput)
  : APIPromise<BrowserSessionResponseOutput>

client.browser.sessions.delete(sessionID: string)
  : APIPromise<void>
```

## Async chat completions

```ts
client.async.chat.completions.create(body: AsyncApiChatCompletionsRequestInput)
  : APIPromise<AsyncApiChatCompletionsResponseOutput>

client.async.chat.completions.list()
  : APIPromise<ListAsyncApiChatCompletionsResponseOutput>

client.async.chat.completions.get(apiRequest: string, params?)
  : APIPromise<AsyncApiChatCompletionsResponseOutput>
```
