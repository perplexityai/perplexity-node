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
// Standard RequestInit settings that cannot change the method, body, headers,
// destination or transport of a request.
const legacyFetchOptionKeys = [
  'cache',
  'credentials',
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
  return typeof flag === 'boolean' ? flag : undefined;
}

// An argument that sets a query parameter other than `stream` is parameters
// only. `stream` alone stays in the legacy form because RequestOptions has it.
function legacyOptionsArgument(
  value: object | null | undefined,
  queryNames: readonly string[],
): object | undefined {
  if (!value) return undefined;
  return queryNames.some((name) => name !== 'stream' && ownValue(value, name) !== undefined)
    ? undefined
    : value;
}

// Reads transport settings from the legacy `(id, options)` call form. Routing
// fields (method, path, body, defaultBaseURL) are never copied.
export function legacyRequestOptions(
  value: object | null | undefined,
  queryNames: readonly string[],
): RequestOptions {
  const options: Record<string, unknown> = {};
  const legacy = legacyOptionsArgument(value, queryNames);
  if (!legacy) return options as RequestOptions;
  if (queryNames.includes('stream') && ownValue(legacy, 'stream') === true) {
    const cursors = queryNames.filter((name) => name !== 'stream');
    const query = ownValue(legacy, 'query');
    const hasCursor =
      !!query &&
      typeof query === 'object' &&
      cursors.every((name) => ownValue(query, name) !== undefined);
    if (!hasCursor) throw new TypeError(`stream: true requires ${cursors.join(', ')}`);
  }
  for (const key of legacyRequestOptionKeys) {
    if (Object.prototype.hasOwnProperty.call(legacy, key)) options[key] = ownValue(legacy, key);
  }
  const fetchOptions = ownValue(legacy, 'fetchOptions');
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

export function legacyQuery(
  value: object | null | undefined,
  queryNames: readonly string[],
): object | undefined {
  const legacy = legacyOptionsArgument(value, queryNames);
  const query = legacy && ownValue(legacy, 'query');
  if (!query || typeof query !== 'object') return undefined;
  // The generated call applies the typed stream flag after every query spread.
  return Object.fromEntries(Object.entries(query).filter(([name]) => name !== 'stream'));
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
