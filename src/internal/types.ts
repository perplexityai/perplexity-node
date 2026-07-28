export type PromiseOrValue<T> = T | Promise<T>;
export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type KeysEnum<T> = { [P in keyof Required<T>]: true };

export type FinalizedRequestInit = RequestInit & { headers: Headers };

/**
 * Some environments overload the global fetch function, and Parameters<T> only gets the last signature.
 */
type OverloadedParameters<T> = T extends {
  (...args: infer A): unknown;
  (...args: infer B): unknown;
  (...args: infer C): unknown;
  (...args: infer D): unknown;
}
  ? A | B | C | D
  : T extends {
        (...args: infer A): unknown;
        (...args: infer B): unknown;
        (...args: infer C): unknown;
      }
    ? A | B | C
    : T extends {
          (...args: infer A): unknown;
          (...args: infer B): unknown;
        }
      ? A | B
      : T extends (...args: infer A) => unknown
        ? A
        : never;

type FetchRequestInit = NonNullable<OverloadedParameters<typeof fetch>[1]>;
type ExtensibleRequestInit = RequestInit & Record<string, unknown>;

/**
 * This type contains `RequestInit` options that may be available on the current runtime,
 * including per-platform extensions like `dispatcher`, `agent`, `client`, etc.
 */
export type MergedRequestInit = (ExtensibleRequestInit | FetchRequestInit) &
  /** We don't include these in the types as they'll be overridden for every request. */
  Partial<Record<'body' | 'headers' | 'method' | 'signal', never>>;
