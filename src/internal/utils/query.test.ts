import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { stringifyQuery } from './query.js';

function assertThrowsWithMessage(block: () => unknown, expected: string): void {
  assert.throws(block, (error: unknown) => error instanceof Error && error.message.includes(expected));
}

describe('stringifyQuery', () => {
  for (const [input, expected] of [
    [{ a: '1', b: 2, c: true }, 'a=1&b=2&c=true'],
    [{ a: null, b: false, c: undefined }, 'a=&b=false'],
    [{ 'a/b': 1.28341 }, `${encodeURIComponent('a/b')}=1.28341`],
    [
      { 'a/b': 'c/d', 'e=f': 'g&h' },
      `${encodeURIComponent('a/b')}=${encodeURIComponent('c/d')}&${encodeURIComponent(
        'e=f',
      )}=${encodeURIComponent('g&h')}`,
    ],
  ] as const) {
    it(`${JSON.stringify(input)} -> ${expected}`, () => {
      assert.deepStrictEqual(stringifyQuery(input), expected);
    });
  }

  for (const value of [[], {}, new Date()]) {
    it(`${JSON.stringify(value)} -> <error>`, () => {
      assertThrowsWithMessage(() => stringifyQuery({ value }), `Cannot stringify type ${typeof value}`);
    });
  }
});
