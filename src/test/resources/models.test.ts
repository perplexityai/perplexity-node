import assert from 'node:assert/strict';
import { it } from 'node:test';
import Perplexity from '../../index.js';

it('lists the Agent API model catalog', async () => {
  let calls = 0;
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      calls++;
      const request = new Request(input, init);
      assert.equal(request.method, 'GET');
      assert.equal(request.url, 'https://example.test/v1/models');
      assert.equal(request.headers.get('authorization'), 'Bearer test');
      assert.equal(await request.text(), '');
      return Response.json({
        object: 'list',
        data: [{ id: 'provider/model', object: 'model', created: 0, owned_by: 'provider' }],
      });
    },
  });
  const promise = client.models.list();
  const response = await promise;
  assert.equal(response.object, 'list');
  assert.equal(response.data[0]?.id, 'provider/model');
  assert.equal((await promise.withResponse()).response.status, 200);
  assert.equal(calls, 1);
});
