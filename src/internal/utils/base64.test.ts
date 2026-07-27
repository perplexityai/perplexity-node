import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { fromBase64, toBase64 } from './base64.js';

for (const mode of ['Buffer', 'atob']) {
  describe(`with ${mode}`, () => {
    let originalBuffer: BufferConstructor;
    before(() => {
      if (mode === 'atob') {
        originalBuffer = globalThis.Buffer;
        // @ts-expect-error Can't assign undefined to BufferConstructor
        delete globalThis.Buffer;
      }
    });
    after(() => {
      if (mode === 'atob') {
        globalThis.Buffer = originalBuffer;
      }
    });
    it('toBase64', () => {
      const testCases = [
        {
          input: 'hello world',
          expected: 'aGVsbG8gd29ybGQ=',
        },
        {
          input: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
          expected: 'aGVsbG8gd29ybGQ=',
        },
        {
          input: undefined,
          expected: '',
        },
        {
          input: new Uint8Array([
            229, 102, 215, 230, 65, 22, 46, 87, 243, 176, 99, 99, 31, 174, 8, 242, 83, 142, 169, 64, 122, 123,
            193, 71,
          ]),
          expected: '5WbX5kEWLlfzsGNjH64I8lOOqUB6e8FH',
        },
        {
          input: '✓',
          expected: '4pyT',
        },
        {
          input: new Uint8Array([226, 156, 147]),
          expected: '4pyT',
        },
      ];

      testCases.forEach(({ input, expected }) => {
        assert.strictEqual(toBase64(input), expected);
      });
    });

    it('fromBase64', () => {
      const testCases = [
        {
          input: 'aGVsbG8gd29ybGQ=',
          expected: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
        },
        {
          input: '',
          expected: new Uint8Array([]),
        },
        {
          input: '5WbX5kEWLlfzsGNjH64I8lOOqUB6e8FH',
          expected: new Uint8Array([
            229, 102, 215, 230, 65, 22, 46, 87, 243, 176, 99, 99, 31, 174, 8, 242, 83, 142, 169, 64, 122, 123,
            193, 71,
          ]),
        },
        {
          input: '4pyT',
          expected: new Uint8Array([226, 156, 147]),
        },
      ];

      testCases.forEach(({ input, expected }) => {
        assert.deepStrictEqual(fromBase64(input), expected);
      });
    });
  });
}
