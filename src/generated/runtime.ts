export type HeaderValue = string | null | undefined;
export type HeadersLike =
  | Headers
  | readonly HeaderValue[][]
  | Record<string, HeaderValue | readonly HeaderValue[]>
  | null;

export type RequestOptions = {
  method?: 'delete' | 'get' | 'patch' | 'post' | 'put';
  path?: string;
  query?: object | null;
  body?: unknown;
  headers?: HeadersLike;
  maxRetries?: number;
  stream?: boolean;
  timeout?: number;
  fetchOptions?: Omit<RequestInit, 'body' | 'headers' | 'method' | 'signal'>;
  signal?: AbortSignal | null;
  idempotencyKey?: string;
  defaultBaseURL?: string;
  __binaryResponse?: boolean;
};

export type APIPromise<T> = Promise<T> & {
  _thenUnwrap<U>(transform: (data: T) => U): APIPromise<U>;
  asResponse(): Promise<Response>;
  withResponse(): Promise<{ data: T; response: Response }>;
};

export type Stream<Item> = AsyncIterable<Item> & {
  tee(): [Stream<Item>, Stream<Item>];
  toReadableStream(): ReadableStream<Item>;
};

export type SdkTransport = {
  get<ResponseType>(
    path: string,
    options?: RequestOptions | Promise<RequestOptions>,
  ): APIPromise<ResponseType>;
  post<ResponseType>(
    path: string,
    options?: RequestOptions | Promise<RequestOptions>,
  ): APIPromise<ResponseType>;
  patch<ResponseType>(
    path: string,
    options?: RequestOptions | Promise<RequestOptions>,
  ): APIPromise<ResponseType>;
  put<ResponseType>(
    path: string,
    options?: RequestOptions | Promise<RequestOptions>,
  ): APIPromise<ResponseType>;
  delete<ResponseType>(
    path: string,
    options?: RequestOptions | Promise<RequestOptions>,
  ): APIPromise<ResponseType>;
};

export function normalizeHeaders(
  headers: HeadersLike | undefined,
): Record<string, HeaderValue | readonly HeaderValue[]> {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers) as Record<string, HeaderValue | readonly HeaderValue[]>;
  }
  return headers as Record<string, HeaderValue | readonly HeaderValue[]>;
}

export function addOutputText(response: {
  output: { type: string }[];
  output_text?: string;
}): void {
  const texts: string[] = [];
  for (const item of response.output) {
    if (item.type !== 'message') continue;
    for (const part of (item as { content?: { type: string; text?: string }[] }).content ?? []) {
      if (part.type === 'output_text' && part.text) texts.push(part.text);
    }
  }
  response.output_text = texts.join('');
}
