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

const legacyRequestOptionKeys = [
  'headers',
  'maxRetries',
  'timeout',
  'signal',
  'idempotencyKey',
] as const;
// Preserve legacy fetch settings without allowing request fields to override
// the generated method, body, or headers.
const legacyFetchOptionKeys = [
  'cache',
  'credentials',
  'dispatcher',
  'integrity',
  'keepalive',
  'mode',
  'priority',
  'redirect',
  'referrer',
  'referrerPolicy',
] as const;

function ownValue(value: object, key: string): unknown {
  return Object.prototype.hasOwnProperty.call(value, key)
    ? (value as Record<string, unknown>)[key]
    : undefined;
}

// Reads an operation parameter only when the caller set it directly.
export function ownParameter(value: object | null | undefined, name: string): unknown {
  return value ? ownValue(value, name) : undefined;
}

export function ownBoolean(value: object | null | undefined, name: string): boolean | undefined {
  const flag = ownParameter(value, name);
  if (flag === undefined || flag === null) return undefined;
  if (typeof flag !== 'boolean') throw new TypeError(`${name} must be a boolean`);
  return flag;
}

// A stream cursor: a non-negative safe integer, or undefined when not set.
export function ownCursor(value: object | null | undefined, name: string): number | undefined {
  const cursor = ownParameter(value, name);
  if (cursor === undefined || cursor === null) return undefined;
  if (typeof cursor !== 'number' || !Number.isSafeInteger(cursor) || cursor < 0) {
    throw new TypeError(`${name} must be a non-negative integer`);
  }
  return cursor;
}

// Reads transport settings from the legacy `(id, options)` call form. Routing
// fields (method, path, body, defaultBaseURL) are never copied. Streaming needs
// the typed reconnect form, and an argument with a cursor is reconnect
// parameters only. `cursor` and `stream` are the caller's values, read once.
export function legacyRequestOptions(
  value: object | null | undefined,
  cursor: number | undefined,
  stream: boolean | undefined,
): RequestOptions {
  const options: Record<string, unknown> = {};
  if (!value) return options as RequestOptions;
  if (stream === true && cursor === undefined) {
    throw new TypeError(
      'stream: true requires starting_after; use retrieve(id, { stream: true, starting_after })',
    );
  }
  if (cursor !== undefined) return options as RequestOptions;
  for (const key of legacyRequestOptionKeys) {
    if (Object.prototype.hasOwnProperty.call(value, key)) options[key] = ownValue(value, key);
  }
  const fetchOptions = ownValue(value, 'fetchOptions');
  if (fetchOptions && typeof fetchOptions === 'object') {
    const safe: Record<string, unknown> = {};
    for (const key of Object.keys(fetchOptions)) {
      if (!(legacyFetchOptionKeys as readonly string[]).includes(key)) {
        throw new TypeError(
          `fetchOptions.${key} is not supported in the second argument; pass it in the third (request options) argument`,
        );
      }
      safe[key] = ownValue(fetchOptions, key);
    }
    options['fetchOptions'] = safe;
  }
  return options as RequestOptions;
}

// The legacy argument's own query, without the typed-only names.
export function legacyQuery(
  value: object | null | undefined,
  typedNames: readonly string[],
  cursor: number | undefined,
): object | undefined {
  if (!value || cursor !== undefined) return undefined;
  const query = ownValue(value, 'query');
  if (!query || typeof query !== 'object') return undefined;
  return Object.fromEntries(Object.entries(query).filter(([name]) => !typedNames.includes(name)));
}

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
