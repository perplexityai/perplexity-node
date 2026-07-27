import assert from 'node:assert/strict';
import { isDeepStrictEqual } from 'node:util';

type Constructor = new (...args: never[]) => unknown;
type MockFunction = ((...args: unknown[]) => unknown) & {
  mock: { calls: unknown[][] };
};

function failUnless(condition: boolean, negated: boolean, message: string): void {
  assert.equal(negated ? !condition : condition, true, message);
}

function errorMatches(error: unknown, expected?: string | Constructor): boolean {
  if (typeof expected === 'function') return error instanceof expected;
  if (typeof expected === 'string') return error instanceof Error && error.message.includes(expected);
  return error instanceof Error;
}

function snapshotValue(value: unknown): string {
  return value instanceof Error ? `[${String(value)}]` : JSON.stringify(value);
}

function snapshotError(value: unknown): string {
  const message = value instanceof Error ? value.message : String(value);
  return `"${message}"`;
}

function matchesObject(actual: unknown, expected: unknown): boolean {
  if (expected === null || typeof expected !== 'object') return isDeepStrictEqual(actual, expected);
  if (actual === null || typeof actual !== 'object') return false;
  return Object.entries(expected).every(([key, value]) =>
    matchesObject((actual as Record<string, unknown>)[key], value),
  );
}

class Expectation {
  constructor(
    protected readonly actual: unknown,
    protected readonly negated = false,
  ) {}

  get not(): Expectation {
    return new Expectation(this.actual, !this.negated);
  }

  get resolves(): AsyncExpectation {
    return new AsyncExpectation(Promise.resolve(this.actual), false, this.negated);
  }

  get rejects(): AsyncExpectation {
    return new AsyncExpectation(Promise.resolve(this.actual), true, this.negated);
  }

  toBe(expected: unknown): void {
    failUnless(Object.is(this.actual, expected), this.negated, 'expected values to be identical');
  }

  toEqual(expected: unknown): void {
    failUnless(isDeepStrictEqual(this.actual, expected), this.negated, 'expected values to be deeply equal');
  }

  toBeTruthy(): void {
    failUnless(Boolean(this.actual), this.negated, 'expected value to be truthy');
  }

  toBeNull(): void {
    failUnless(this.actual === null, this.negated, 'expected value to be null');
  }

  toBeInstanceOf(expected: Constructor): void {
    const actualName = (this.actual as { constructor?: { name?: string } })?.constructor?.name;
    failUnless(
      this.actual instanceof expected,
      this.negated,
      `expected ${actualName ?? typeof this.actual} to be instance of ${expected.name}`,
    );
  }

  toHaveLength(expected: number): void {
    const actual = this.actual as { length?: number };
    failUnless(actual?.length === expected, this.negated, `expected length ${expected}`);
  }

  toBeGreaterThanOrEqual(expected: number): void {
    failUnless(
      typeof this.actual === 'number' && this.actual >= expected,
      this.negated,
      `expected >= ${expected}`,
    );
  }

  toMatch(expected: string | RegExp): void {
    const actual = String(this.actual);
    const matches = typeof expected === 'string' ? actual.includes(expected) : expected.test(actual);
    failUnless(matches, this.negated, `expected ${actual} to match ${String(expected)}`);
  }

  toMatchObject(expected: Record<string, unknown>): void {
    failUnless(
      matchesObject(this.actual, expected),
      this.negated,
      'expected object to contain matching properties',
    );
  }

  toHaveProperty(property: string): void {
    const matches = this.actual != null && property in Object(this.actual);
    failUnless(matches, this.negated, `expected object to have property ${property}`);
  }

  toThrow(expected?: string | Constructor): void {
    let thrown: unknown;
    try {
      (this.actual as () => unknown)();
    } catch (error) {
      thrown = error;
    }
    failUnless(errorMatches(thrown, expected), this.negated, 'expected function to throw matching error');
  }

  toThrowError(expected?: string | Constructor): void {
    this.toThrow(expected);
  }

  toMatchInlineSnapshot(expected: string): void {
    this.toEqualSnapshot(snapshotValue(this.actual), expected);
  }

  toThrowErrorMatchingInlineSnapshot(expected: string): void {
    this.toEqualSnapshot(snapshotError(this.actual), expected);
  }

  toHaveBeenCalled(): void {
    const calls = (this.actual as MockFunction).mock.calls;
    failUnless(calls.length > 0, this.negated, 'expected mock to have been called');
  }

  toHaveBeenCalledTimes(expected: number): void {
    const calls = (this.actual as MockFunction).mock.calls;
    failUnless(
      calls.length === expected,
      this.negated,
      `expected mock to have been called ${expected} times`,
    );
  }

  toHaveBeenCalledWith(...expected: unknown[]): void {
    const calls = (this.actual as MockFunction).mock.calls;
    failUnless(
      calls.some((call) => isDeepStrictEqual(call, expected)),
      this.negated,
      'expected mock to have been called with matching arguments',
    );
  }

  protected toEqualSnapshot(actual: string, expected: string): void {
    failUnless(actual === expected, this.negated, `expected ${actual} to equal snapshot ${expected}`);
  }
}

class AsyncExpectation {
  constructor(
    private readonly promise: Promise<unknown>,
    private readonly rejected: boolean,
    private readonly negated: boolean,
  ) {}

  async toEqual(expected: unknown): Promise<void> {
    new Expectation(await this.value(), this.negated).toEqual(expected);
  }

  async toBeInstanceOf(expected: Constructor): Promise<void> {
    new Expectation(await this.value(), this.negated).toBeInstanceOf(expected);
  }

  async toThrow(expected?: string | Constructor): Promise<void> {
    const error = await this.value();
    failUnless(errorMatches(error, expected), this.negated, 'expected promise to reject with matching error');
  }

  async toThrowError(expected?: string | Constructor): Promise<void> {
    await this.toThrow(expected);
  }

  async toMatchInlineSnapshot(expected: string): Promise<void> {
    new Expectation(snapshotValue(await this.value()), this.negated).toBe(expected);
  }

  async toThrowErrorMatchingInlineSnapshot(expected: string): Promise<void> {
    new Expectation(snapshotError(await this.value()), this.negated).toBe(expected);
  }

  private async value(): Promise<unknown> {
    try {
      const candidate = await this.promise;
      const value = typeof candidate === 'function' ? await candidate() : candidate;
      if (this.rejected) assert.fail('expected promise to reject');
      return value;
    } catch (error) {
      if (!this.rejected) throw error;
      return error;
    }
  }
}

function mockFunction(implementation?: (...args: unknown[]) => unknown): MockFunction {
  const fn = (...args: unknown[]): unknown => {
    fn.mock.calls.push(args);
    return implementation?.(...args);
  };
  fn.mock = { calls: [] as unknown[][] };
  return fn;
}

function spyOn<T extends object, K extends keyof T>(object: T, key: K): MockFunction {
  const original = object[key];
  assert.equal(typeof original, 'function');
  const spy = mockFunction((...args) => (original as (...values: unknown[]) => unknown).apply(object, args));
  object[key] = spy as T[K];
  return spy;
}

Object.assign(globalThis, {
  expect: (actual: unknown) => new Expectation(actual),
  mock: { fn: mockFunction, spyOn },
});
Object.defineProperty(globalThis, 'test', {
  configurable: true,
  get: () => globalThis.it,
});

declare global {
  function expect(actual: unknown): Expectation;
  const mock: {
    fn: typeof mockFunction;
    spyOn: typeof spyOn;
  };
}
