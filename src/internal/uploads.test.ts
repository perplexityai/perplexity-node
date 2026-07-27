import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { multipartFormRequestOptions, createForm } from './uploads.js';
import { toFile } from '../core/uploads.js';

describe('form data validation', () => {
  it('valid values do not error', async () => {
    await multipartFormRequestOptions(
      {
        body: {
          foo: 'foo',
          string: 1,
          bool: true,
          file: await toFile(Buffer.from('some-content')),
          blob: new Blob(['Some content'], { type: 'text/plain' }),
        },
      },
      fetch,
    );
  });

  it('null', async () => {
    await assert.rejects(
      () =>
        multipartFormRequestOptions(
          {
            body: {
              null: null,
            },
          },
          fetch,
        ),
      TypeError,
    );
  });

  it('undefined is stripped', async () => {
    const form = await createForm(
      {
        foo: undefined,
        bar: 'baz',
      },
      fetch,
    );
    assert.strictEqual(form.has('foo'), false);
    assert.strictEqual(form.get('bar'), 'baz');
  });

  it('nested undefined property is stripped', async () => {
    const form = await createForm(
      {
        bar: {
          baz: undefined,
        },
      },
      fetch,
    );
    assert.deepStrictEqual(Array.from(form.entries()), []);

    const form2 = await createForm(
      {
        bar: {
          foo: 'string',
          baz: undefined,
        },
      },
      fetch,
    );
    assert.deepStrictEqual(Array.from(form2.entries()), [['bar[foo]', 'string']]);
  });

  it('nested undefined array item is stripped', async () => {
    const form = await createForm(
      {
        bar: [undefined, undefined],
      },
      fetch,
    );
    assert.deepStrictEqual(Array.from(form.entries()), []);

    const form2 = await createForm(
      {
        bar: [undefined, 'foo'],
      },
      fetch,
    );
    assert.deepStrictEqual(Array.from(form2.entries()), [['bar[]', 'foo']]);
  });
});
