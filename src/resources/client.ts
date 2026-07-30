import * as API from '../generated/api.js';
import type { SdkTransport } from '../generated/api.js';
export interface ClientResources {
    readonly async: API.Async;
    readonly browser: API.Browser;
    readonly chat: API.Chat;
    readonly contextualizedEmbeddings: API.ContextualizedEmbeddings;
    readonly embeddings: API.Embeddings;
    readonly responses: API.Responses;
    readonly search: API.Search;
}
export const clientResourceClasses = {
    Async: API.Async,
    Browser: API.Browser,
    Chat: API.Chat,
    ContextualizedEmbeddings: API.ContextualizedEmbeddings,
    Embeddings: API.Embeddings,
    Responses: API.Responses,
    Search: API.Search
};
export function createClientResources(client: SdkTransport): ClientResources {
    return {
        async: new API.Async(client),
        browser: new API.Browser(client),
        chat: new API.Chat(client),
        contextualizedEmbeddings: new API.ContextualizedEmbeddings(client),
        embeddings: new API.Embeddings(client),
        responses: new API.Responses(client),
        search: new API.Search(client)
    };
}
declare module '../client.js' {
    interface Perplexity extends ClientResources {
    }
    namespace Perplexity {
        export import Async = API.Async;
        export import Browser = API.Browser;
        export type SessionCreateParams = API.Browser.SessionCreateParams;
        export import Chat = API.Chat;
        export type CompletionCreateParams = API.Chat.CompletionCreateParams;
        export type CompletionCreateParamsNonStreaming = API.Chat.CompletionCreateParamsNonStreaming;
        export type CompletionCreateParamsStreaming = API.Chat.CompletionCreateParamsStreaming;
        export type StreamChunk = API.Chat.StreamChunk;
        export import ContextualizedEmbeddings = API.ContextualizedEmbeddings;
        export type ContextualizedEmbeddingCreateParams = API.ContextualizedEmbeddings.ContextualizedEmbeddingCreateParams;
        export type ContextualizedEmbeddingCreateResponse = API.ContextualizedEmbeddings.ContextualizedEmbeddingCreateResponse;
        export import Embeddings = API.Embeddings;
        export type EmbeddingCreateParams = API.Embeddings.EmbeddingCreateParams;
        export type EmbeddingCreateResponse = API.Embeddings.EmbeddingCreateResponse;
        export import Responses = API.Responses;
        export type Annotation = API.Responses.Annotation;
        export type ContentPart = API.Responses.ContentPart;
        export type ErrorInfo = API.Responses.ErrorInfo;
        export type FileContentParams = API.Responses.FileContentParams;
        export type FunctionCallOutputItem = API.Responses.FunctionCallOutputItem;
        export type FunctionTool = API.Responses.FunctionTool;
        export type InputItem = API.Responses.InputItem;
        export type OutputItem = API.Responses.OutputItem;
        export type ResponseCancelResponse = API.Responses.ResponseCancelResponse;
        export type ResponseCreateParams = API.Responses.ResponseCreateParams;
        export type ResponseCreateParamsNonStreaming = API.Responses.ResponseCreateParamsNonStreaming;
        export type ResponseCreateParamsStreaming = API.Responses.ResponseCreateParamsStreaming;
        export type ResponseCreateResponse = API.Responses.ResponseCreateResponse;
        export type ResponseFile = API.Responses.ResponseFile;
        export type ResponseFileList = API.Responses.ResponseFileList;
        export type ResponseRetrieveResponse = API.Responses.ResponseRetrieveResponse;
        export type ResponsesCreateParams = API.Responses.ResponsesCreateParams;
        export type ResponseStreamChunk = API.Responses.ResponseStreamChunk;
        export type ResponsesUsage = API.Responses.ResponsesUsage;
        export import Search = API.Search;
        export type SearchCreateParams = API.Search.SearchCreateParams;
        export type SearchCreateResponse = API.Search.SearchCreateResponse;
        export type APIPublicSearchResult = API.APIPublicSearchResult;
        export type BrowserSessionResponse = API.BrowserSessionResponse;
        export type ChatMessageInput = API.ChatMessageInput;
        export type ChatMessageOutput = API.ChatMessageOutput;
        export type Choice = API.Choice;
        export type ContextualizedEmbeddingObject = API.ContextualizedEmbeddingObject;
        export type EmbeddingObject = API.EmbeddingObject;
        export type EmbeddingsUsage = API.EmbeddingsUsage;
        export type JsonSchemaFormat = API.JsonSchemaFormat;
        export type ResponseFormat = API.ResponseFormat;
        export type SearchResult = API.SearchResult;
        export type UsageInfo = API.UsageInfo;
        export type UserLocation = API.UserLocation;
        export type WebSearchOptions = API.WebSearchOptions;
    }
}
