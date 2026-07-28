import { APIPromise } from './core/api-promise.js';

import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import util from 'node:util';
import Perplexity, { APIUserAbortError, Chat, type API } from './index.js';
import {
  Async as GeneratedAsync,
  Browser as GeneratedBrowser,
  Chat as GeneratedChat,
  Responses as GeneratedResponses,
} from './generated/api.js';
import { Async as LegacyAsync } from './resources/async/async.js';
import { Completions as LegacyAsyncCompletions } from './resources/async/chat/completions.js';
import { Browser as LegacyBrowser } from './resources/browser/browser.js';
import { Chat as LegacyChat } from './resources/chat/chat.js';
import { Completions as LegacyChatCompletions } from './resources/chat/completions.js';
import { Files as LegacyResponseFiles } from './resources/responses/files.js';
import { Responses as LegacyResponses } from './resources/responses/responses.js';
const defaultFetch = fetch;

describe('instantiate client', () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('generated chat API uses client transport', async () => {
    const generatedRequest: API.Chat.CompletionCreateParams = {
      messages: [{ content: 'What is the answer?', role: 'user' }],
      model: 'sonar',
    };
    const request: Perplexity.Chat.CompletionCreateParams = generatedRequest;
    const generatedResponse: API.Chat.StreamChunk = {
      choices: [],
      created: 1,
      id: 'completion-id',
      model: 'sonar',
    };
    const expectedResponse: Perplexity.StreamChunk = generatedResponse;
    let capturedRequest:
      | { body: BodyInit | null | undefined; method: string | undefined; url: string }
      | undefined;
    const client = new Perplexity({
      apiKey: 'My API Key',
      baseURL: 'https://api.example.com',
      fetch: async (url, init) => {
        capturedRequest = {
          body: init?.body,
          method: init?.method,
          url: String(url),
        };
        return new Response(JSON.stringify(expectedResponse), {
          headers: { 'Content-Type': 'application/json' },
        });
      },
    });

    const response = await client.chat.completions.create(request);

    assert.ok(client.chat instanceof Chat);
    assert.deepStrictEqual(capturedRequest, {
      body: JSON.stringify(request),
      method: 'POST',
      url: 'https://api.example.com/chat/completions',
    });
    assert.deepStrictEqual(response, expectedResponse);
  });

  it('legacy resource entrypoints re-export generated resources', () => {
    assert.deepStrictEqual(
      [
        LegacyAsync,
        LegacyAsyncCompletions,
        LegacyBrowser,
        LegacyChat,
        LegacyChatCompletions,
        LegacyResponseFiles,
        LegacyResponses,
      ],
      [
        GeneratedAsync,
        GeneratedAsync.Chat.Completions,
        GeneratedBrowser,
        GeneratedChat,
        GeneratedChat.Completions,
        GeneratedResponses.Files,
        GeneratedResponses,
      ],
    );
  });

  describe('defaultHeaders', () => {
    const client = new Perplexity({
      baseURL: 'http://localhost:5000/',
      defaultHeaders: { 'X-My-Default-Header': '2' },
      apiKey: 'My API Key',
    });

    it('they are used in the request', async () => {
      const { req } = await client.buildRequest({ path: '/foo', method: 'post' });
      assert.deepStrictEqual(req.headers.get('x-my-default-header'), '2');
    });

    it('can ignore `undefined` and leave the default', async () => {
      const { req } = await client.buildRequest({
        path: '/foo',
        method: 'post',
        headers: { 'X-My-Default-Header': undefined },
      });
      assert.deepStrictEqual(req.headers.get('x-my-default-header'), '2');
    });

    it('can be removed with `null`', async () => {
      const { req } = await client.buildRequest({
        path: '/foo',
        method: 'post',
        headers: { 'X-My-Default-Header': null },
      });
      assert.strictEqual(req.headers.has('x-my-default-header'), false);
    });
  });
  describe('logging', () => {
    const env = process.env;

    beforeEach(() => {
      process.env = { ...env };
      process.env['PERPLEXITY_LOG'] = undefined;
    });

    afterEach(() => {
      process.env = env;
    });

    const forceAPIResponseForClient = async (client: Perplexity) => {
      await new APIPromise(
        client,
        Promise.resolve({
          response: new Response(),
          controller: new AbortController(),
          requestLogID: 'log_000000',
          retryOfRequestLogID: undefined,
          startTime: Date.now(),
          options: {
            method: 'get',
            path: '/',
          },
        }),
      );
    };

    it('debug logs when log level is debug', async () => {
      const debugMock = mock.fn();
      const logger = {
        debug: debugMock,
        info: mock.fn(),
        warn: mock.fn(),
        error: mock.fn(),
      };

      const client = new Perplexity({
        logger: logger,
        logLevel: 'debug',
        apiKey: 'My API Key',
      });

      await forceAPIResponseForClient(client);
      assert.ok(debugMock.mock.callCount() > 0);
    });

    it('default logLevel is warn', async () => {
      const client = new Perplexity({ apiKey: 'My API Key' });
      assert.strictEqual(client.logLevel, 'warn');
    });

    it('debug logs are skipped when log level is info', async () => {
      const debugMock = mock.fn();
      const logger = {
        debug: debugMock,
        info: mock.fn(),
        warn: mock.fn(),
        error: mock.fn(),
      };

      const client = new Perplexity({
        logger: logger,
        logLevel: 'info',
        apiKey: 'My API Key',
      });

      await forceAPIResponseForClient(client);
      assert.strictEqual(debugMock.mock.callCount(), 0);
    });

    it('debug logs happen with debug env var', async () => {
      const debugMock = mock.fn();
      const logger = {
        debug: debugMock,
        info: mock.fn(),
        warn: mock.fn(),
        error: mock.fn(),
      };

      process.env['PERPLEXITY_LOG'] = 'debug';
      const client = new Perplexity({ logger: logger, apiKey: 'My API Key' });
      assert.strictEqual(client.logLevel, 'debug');

      await forceAPIResponseForClient(client);
      assert.ok(debugMock.mock.callCount() > 0);
    });

    it('warn when env var level is invalid', async () => {
      const warnMock = mock.fn();
      const logger = {
        debug: mock.fn(),
        info: mock.fn(),
        warn: warnMock,
        error: mock.fn(),
      };

      process.env['PERPLEXITY_LOG'] = 'not a log level';
      const client = new Perplexity({ logger: logger, apiKey: 'My API Key' });
      assert.strictEqual(client.logLevel, 'warn');
      assert.ok(
        warnMock.mock.calls.some((call) =>
          util.isDeepStrictEqual(call.arguments, [
            'process.env[\'PERPLEXITY_LOG\'] was set to "not a log level", expected one of ["off","error","warn","info","debug"]',
          ]),
        ),
      );
    });

    it('client log level overrides env var', async () => {
      const debugMock = mock.fn();
      const logger = {
        debug: debugMock,
        info: mock.fn(),
        warn: mock.fn(),
        error: mock.fn(),
      };

      process.env['PERPLEXITY_LOG'] = 'debug';
      const client = new Perplexity({
        logger: logger,
        logLevel: 'off',
        apiKey: 'My API Key',
      });

      await forceAPIResponseForClient(client);
      assert.strictEqual(debugMock.mock.callCount(), 0);
    });

    it('no warning logged for invalid env var level + valid client level', async () => {
      const warnMock = mock.fn();
      const logger = {
        debug: mock.fn(),
        info: mock.fn(),
        warn: warnMock,
        error: mock.fn(),
      };

      process.env['PERPLEXITY_LOG'] = 'not a log level';
      const client = new Perplexity({
        logger: logger,
        logLevel: 'debug',
        apiKey: 'My API Key',
      });
      assert.strictEqual(client.logLevel, 'debug');
      assert.strictEqual(warnMock.mock.callCount(), 0);
    });
  });

  describe('defaultQuery', () => {
    it('with null query params given', () => {
      const client = new Perplexity({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { apiVersion: 'foo' },
        apiKey: 'My API Key',
      });
      assert.deepStrictEqual(client.buildURL('/foo', null), 'http://localhost:5000/foo?apiVersion=foo');
    });

    it('multiple default query params', () => {
      const client = new Perplexity({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { apiVersion: 'foo', hello: 'world' },
        apiKey: 'My API Key',
      });
      assert.deepStrictEqual(
        client.buildURL('/foo', null),
        'http://localhost:5000/foo?apiVersion=foo&hello=world',
      );
    });

    it('overriding with `undefined`', () => {
      const client = new Perplexity({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { hello: 'world' },
        apiKey: 'My API Key',
      });
      assert.deepStrictEqual(client.buildURL('/foo', { hello: undefined }), 'http://localhost:5000/foo');
    });
  });

  it('custom fetch', async () => {
    const client = new Perplexity({
      baseURL: 'http://localhost:5000/',
      apiKey: 'My API Key',
      fetch: (url) => {
        return Promise.resolve(
          new Response(JSON.stringify({ url, custom: true }), {
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      },
    });

    const response = await client.get('/foo');
    assert.deepStrictEqual(response, { url: 'http://localhost:5000/foo', custom: true });
  });

  it('explicit global fetch', async () => {
    // make sure the global fetch type is assignable to our Fetch type
    const _client = new Perplexity({
      baseURL: 'http://localhost:5000/',
      apiKey: 'My API Key',
      fetch: defaultFetch,
    });
  });

  it('custom signal', async () => {
    const client = new Perplexity({
      baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
      apiKey: 'My API Key',
      fetch: (...args) => {
        return new Promise((resolve, reject) =>
          setTimeout(
            () =>
              defaultFetch(...args)
                .then(resolve)
                .catch(reject),
            300,
          ),
        );
      },
    });

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 200);

    const spy = mock.method(client, 'request');

    await assert.rejects(client.get('/foo', { signal: controller.signal }), APIUserAbortError);
    assert.strictEqual(spy.mock.callCount(), 1);
  });

  it('normalized method', async () => {
    let capturedRequest: RequestInit | undefined;
    const testFetch = async (url: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
      capturedRequest = init;
      return new Response(JSON.stringify({}), { headers: { 'Content-Type': 'application/json' } });
    };

    const client = new Perplexity({
      baseURL: 'http://localhost:5000/',
      apiKey: 'My API Key',
      fetch: testFetch,
    });

    await client.patch('/foo');
    assert.deepStrictEqual(capturedRequest?.method, 'PATCH');
  });

  describe('baseUrl', () => {
    it('trailing slash', () => {
      const client = new Perplexity({ baseURL: 'http://localhost:5000/custom/path/', apiKey: 'My API Key' });
      assert.deepStrictEqual(client.buildURL('/foo', null), 'http://localhost:5000/custom/path/foo');
    });

    it('no trailing slash', () => {
      const client = new Perplexity({ baseURL: 'http://localhost:5000/custom/path', apiKey: 'My API Key' });
      assert.deepStrictEqual(client.buildURL('/foo', null), 'http://localhost:5000/custom/path/foo');
    });

    afterEach(() => {
      process.env['PERPLEXITY_BASE_URL'] = undefined;
    });

    it('explicit option', () => {
      const client = new Perplexity({ baseURL: 'https://example.com', apiKey: 'My API Key' });
      assert.deepStrictEqual(client.baseURL, 'https://example.com');
    });

    it('env variable', () => {
      process.env['PERPLEXITY_BASE_URL'] = 'https://example.com/from_env';
      const client = new Perplexity({ apiKey: 'My API Key' });
      assert.deepStrictEqual(client.baseURL, 'https://example.com/from_env');
    });

    it('empty env variable', () => {
      process.env['PERPLEXITY_BASE_URL'] = ''; // empty
      const client = new Perplexity({ apiKey: 'My API Key' });
      assert.deepStrictEqual(client.baseURL, 'https://api.perplexity.ai');
    });

    it('blank env variable', () => {
      process.env['PERPLEXITY_BASE_URL'] = '  '; // blank
      const client = new Perplexity({ apiKey: 'My API Key' });
      assert.deepStrictEqual(client.baseURL, 'https://api.perplexity.ai');
    });

    it('in request options', () => {
      const client = new Perplexity({ apiKey: 'My API Key' });
      assert.deepStrictEqual(
        client.buildURL('/foo', null, 'http://localhost:5000/option'),
        'http://localhost:5000/option/foo',
      );
    });

    it('in request options overridden by client options', () => {
      const client = new Perplexity({ apiKey: 'My API Key', baseURL: 'http://localhost:5000/client' });
      assert.deepStrictEqual(
        client.buildURL('/foo', null, 'http://localhost:5000/option'),
        'http://localhost:5000/client/foo',
      );
    });

    it('in request options overridden by env variable', () => {
      process.env['PERPLEXITY_BASE_URL'] = 'http://localhost:5000/env';
      const client = new Perplexity({ apiKey: 'My API Key' });
      assert.deepStrictEqual(
        client.buildURL('/foo', null, 'http://localhost:5000/option'),
        'http://localhost:5000/env/foo',
      );
    });
  });

  it('maxRetries option is correctly set', () => {
    const client = new Perplexity({ maxRetries: 4, apiKey: 'My API Key' });
    assert.deepStrictEqual(client.maxRetries, 4);

    // default
    const client2 = new Perplexity({ apiKey: 'My API Key' });
    assert.deepStrictEqual(client2.maxRetries, 2);
  });

  describe('withOptions', () => {
    it('creates a new client with overridden options', async () => {
      const client = new Perplexity({
        baseURL: 'http://localhost:5000/',
        maxRetries: 3,
        apiKey: 'My API Key',
      });

      const newClient = client.withOptions({
        maxRetries: 5,
        baseURL: 'http://localhost:5001/',
      });

      // Verify the new client has updated options
      assert.deepStrictEqual(newClient.maxRetries, 5);
      assert.deepStrictEqual(newClient.baseURL, 'http://localhost:5001/');

      // Verify the original client is unchanged
      assert.deepStrictEqual(client.maxRetries, 3);
      assert.deepStrictEqual(client.baseURL, 'http://localhost:5000/');

      // Verify it's a different instance
      assert.notStrictEqual(newClient, client);
      assert.strictEqual(newClient.constructor, client.constructor);
    });

    it('inherits options from the parent client', async () => {
      const client = new Perplexity({
        baseURL: 'http://localhost:5000/',
        defaultHeaders: { 'X-Test-Header': 'test-value' },
        defaultQuery: { 'test-param': 'test-value' },
        apiKey: 'My API Key',
      });

      const newClient = client.withOptions({
        baseURL: 'http://localhost:5001/',
      });

      // Test inherited options remain the same
      assert.deepStrictEqual(
        newClient.buildURL('/foo', null),
        'http://localhost:5001/foo?test-param=test-value',
      );

      const { req } = await newClient.buildRequest({ path: '/foo', method: 'get' });
      assert.deepStrictEqual(req.headers.get('x-test-header'), 'test-value');
    });

    it('respects runtime property changes when creating new client', () => {
      const client = new Perplexity({
        baseURL: 'http://localhost:5000/',
        timeout: 1000,
        apiKey: 'My API Key',
      });

      // Modify the client properties directly after creation
      client.baseURL = 'http://localhost:6000/';
      client.timeout = 2000;

      // Create a new client with withOptions
      const newClient = client.withOptions({
        maxRetries: 10,
      });

      // Verify the new client uses the updated properties, not the original ones
      assert.deepStrictEqual(newClient.baseURL, 'http://localhost:6000/');
      assert.deepStrictEqual(newClient.timeout, 2000);
      assert.deepStrictEqual(newClient.maxRetries, 10);

      // Original client should still have its modified properties
      assert.deepStrictEqual(client.baseURL, 'http://localhost:6000/');
      assert.deepStrictEqual(client.timeout, 2000);
      assert.notDeepStrictEqual(client.maxRetries, 10);

      // Verify URL building uses the updated baseURL
      assert.deepStrictEqual(newClient.buildURL('/bar', null), 'http://localhost:6000/bar');
    });
  });

  it('with environment variable arguments', () => {
    // set options via env var
    process.env['PERPLEXITY_API_KEY'] = 'My API Key';
    const client = new Perplexity();
    assert.strictEqual(client.apiKey, 'My API Key');
  });

  it('with overridden environment variable arguments', () => {
    // set options via env var
    process.env['PERPLEXITY_API_KEY'] = 'another My API Key';
    const client = new Perplexity({ apiKey: 'My API Key' });
    assert.strictEqual(client.apiKey, 'My API Key');
  });
});

describe('request building', () => {
  const client = new Perplexity({ apiKey: 'My API Key' });

  describe('custom headers', () => {
    it('handles undefined', async () => {
      const { req } = await client.buildRequest({
        path: '/foo',
        method: 'post',
        body: { value: 'hello' },
        headers: { 'X-Foo': 'baz', 'x-foo': 'bar', 'x-Foo': undefined, 'x-baz': 'bam', 'X-Baz': null },
      });
      assert.deepStrictEqual(req.headers.get('x-foo'), 'bar');
      assert.deepStrictEqual(req.headers.get('x-Foo'), 'bar');
      assert.deepStrictEqual(req.headers.get('X-Foo'), 'bar');
      assert.deepStrictEqual(req.headers.get('x-baz'), null);
    });
  });
});

describe('default encoder', () => {
  const client = new Perplexity({ apiKey: 'My API Key' });

  class Serializable {
    toJSON() {
      return { $type: 'Serializable' };
    }
  }
  class Collection<T> {
    #things: T[];
    constructor(things: T[]) {
      this.#things = Array.from(things);
    }
    toJSON() {
      return Array.from(this.#things);
    }
    [Symbol.iterator]() {
      return this.#things[Symbol.iterator];
    }
  }
  for (const jsonValue of [{}, [], { __proto__: null }, new Serializable(), new Collection(['item'])]) {
    it(`serializes ${util.inspect(jsonValue)} as json`, async () => {
      const { req } = await client.buildRequest({
        path: '/foo',
        method: 'post',
        body: jsonValue,
      });
      assert.ok(req.headers instanceof Headers);
      assert.deepStrictEqual(req.headers.get('content-type'), 'application/json');
      assert.strictEqual(req.body, JSON.stringify(jsonValue));
    });
  }

  const encoder = new TextEncoder();
  const asyncIterable = (async function* () {
    yield encoder.encode('a\n');
    yield encoder.encode('b\n');
    yield encoder.encode('c\n');
  })();
  for (const streamValue of [
    [encoder.encode('a\nb\nc\n')][Symbol.iterator](),
    new Response('a\nb\nc\n').body,
    asyncIterable,
  ]) {
    it(`converts ${util.inspect(streamValue)} to ReadableStream`, async () => {
      const { req } = await client.buildRequest({
        path: '/foo',
        method: 'post',
        body: streamValue,
      });
      assert.ok(req.headers instanceof Headers);
      assert.deepStrictEqual(req.headers.get('content-type'), null);
      assert.ok(req.body instanceof ReadableStream);
      assert.strictEqual(await new Response(req.body).text(), 'a\nb\nc\n');
    });
  }

  it(`can set content-type for ReadableStream`, async () => {
    const { req } = await client.buildRequest({
      path: '/foo',
      method: 'post',
      body: new Response('a\nb\nc\n').body,
      headers: { 'Content-Type': 'text/plain' },
    });
    assert.ok(req.headers instanceof Headers);
    assert.deepStrictEqual(req.headers.get('content-type'), 'text/plain');
    assert.ok(req.body instanceof ReadableStream);
    assert.strictEqual(await new Response(req.body).text(), 'a\nb\nc\n');
  });
});

describe('retries', () => {
  it('retry on timeout', async () => {
    let count = 0;
    const testFetch = async (
      url: string | URL | Request,
      { signal }: RequestInit = {},
    ): Promise<Response> => {
      if (count++ === 0) {
        return new Promise((resolve, reject) =>
          signal?.addEventListener('abort', () => reject(new Error('timed out'))),
        );
      }
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };

    const client = new Perplexity({
      apiKey: 'My API Key',
      timeout: 10,
      fetch: testFetch,
    });

    assert.deepStrictEqual(await client.request({ path: '/foo', method: 'get' }), { a: 1 });
    assert.deepStrictEqual(count, 2);
    assert.deepStrictEqual(
      await client
        .request({ path: '/foo', method: 'get' })
        .asResponse()
        .then((r) => r.text()),
      JSON.stringify({ a: 1 }),
    );
    assert.deepStrictEqual(count, 3);
  });

  it('retry on 429 with retry-after', async () => {
    let count = 0;
    const testFetch = async (
      url: string | URL | Request,
      { signal }: RequestInit = {},
    ): Promise<Response> => {
      if (count++ === 0) {
        return new Response(undefined, {
          status: 429,
          headers: {
            'Retry-After': '0.1',
          },
        });
      }
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };

    const client = new Perplexity({ apiKey: 'My API Key', fetch: testFetch });

    assert.deepStrictEqual(await client.request({ path: '/foo', method: 'get' }), { a: 1 });
    assert.deepStrictEqual(count, 2);
    assert.deepStrictEqual(
      await client
        .request({ path: '/foo', method: 'get' })
        .asResponse()
        .then((r) => r.text()),
      JSON.stringify({ a: 1 }),
    );
    assert.deepStrictEqual(count, 3);
  });

  it('retry on 429 with retry-after-ms', async () => {
    let count = 0;
    const testFetch = async (
      url: string | URL | Request,
      { signal }: RequestInit = {},
    ): Promise<Response> => {
      if (count++ === 0) {
        return new Response(undefined, {
          status: 429,
          headers: {
            'Retry-After-Ms': '10',
          },
        });
      }
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };

    const client = new Perplexity({ apiKey: 'My API Key', fetch: testFetch });

    assert.deepStrictEqual(await client.request({ path: '/foo', method: 'get' }), { a: 1 });
    assert.deepStrictEqual(count, 2);
    assert.deepStrictEqual(
      await client
        .request({ path: '/foo', method: 'get' })
        .asResponse()
        .then((r) => r.text()),
      JSON.stringify({ a: 1 }),
    );
    assert.deepStrictEqual(count, 3);
  });
});
