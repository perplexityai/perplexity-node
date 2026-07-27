import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import fs from 'fs';
import type { ResponseLike } from './to-file.js';
import { toFile } from '../core/uploads.js';

class MyClass {
  name: string = 'foo';
}

function mockResponse({ url, content }: { url: string; content?: Blob }): ResponseLike {
  return {
    url,
    blob: async () => content || new Blob([]),
  };
}

describe('toFile', () => {
  it('throws a helpful error for mismatched types', async () => {
    await assert.rejects(
      // @ts-expect-error intentionally mismatched type
      toFile({ foo: 'string' }),
      new Error('Unexpected data type: object; constructor: Object; props: ["foo"]'),
    );

    await assert.rejects(
      // @ts-expect-error intentionally mismatched type
      toFile(new MyClass()),
      new Error('Unexpected data type: object; constructor: MyClass; props: ["name"]'),
    );
  });

  it('disallows string at the type-level', async () => {
    // @ts-expect-error we intentionally do not type support for `string`
    // to help people avoid passing a file path
    const file = await toFile('contents');
    assert.deepStrictEqual(await file.text(), 'contents');
  });

  it('extracts a file name from a Response', async () => {
    const response = mockResponse({ url: 'https://example.com/my/audio.mp3' });
    const file = await toFile(response);
    assert.deepStrictEqual(file.name, 'audio.mp3');
  });

  it('extracts a file name from a File', async () => {
    const input = new File(['foo'], 'input.jsonl');
    const file = await toFile(input);
    assert.deepStrictEqual(file.name, 'input.jsonl');
  });

  it('extracts a file name from a ReadStream', async () => {
    const input = fs.createReadStream('src/internal/to-file.test.ts');
    const file = await toFile(input);
    assert.deepStrictEqual(file.name, 'to-file.test.ts');
  });

  it('does not copy File objects', async () => {
    const input = new File(['foo'], 'input.jsonl', { type: 'jsonl' });
    const file = await toFile(input);
    assert.strictEqual(file, input);
    assert.deepStrictEqual(file.name, 'input.jsonl');
    assert.strictEqual(file.type, 'jsonl');
  });

  it('is assignable to File and Blob', async () => {
    const input = new File(['foo'], 'input.jsonl', { type: 'jsonl' });
    const result = await toFile(input);
    const file: File = result;
    const blob: Blob = result;
    void file;
    void blob;
  });
});

describe('missing File error message', () => {
  let prevGlobalFile: unknown;
  beforeEach(() => {
    // @ts-ignore
    prevGlobalFile = globalThis.File;
    // @ts-ignore
    globalThis.File = undefined;
  });
  afterEach(() => {
    // @ts-ignore
    globalThis.File = prevGlobalFile;
  });

  it('is thrown', async () => {
    await assert.rejects(
      toFile(mockResponse({ url: 'https://example.com/my/audio.mp3' })),
      new Error('`File` is not defined as a global, which is required for file uploads.'),
    );
  });
});
