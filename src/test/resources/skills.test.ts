import assert from 'node:assert/strict';
import { it } from 'node:test';
import Perplexity, { toFile } from '../../index.js';

it('manages custom skills with multipart ZIP uploads and revision queries', async () => {
  const bytes = new Uint8Array([0x50, 0x4b, 5, 6, ...new Array<number>(18).fill(0)]);
  const file = await toFile(bytes, 'bundle.zip', { type: 'application/zip' });
  const revision = 'rev+a/b=';
  const skill = { skill_id: 'skill/id', name: 'example', revision: 'rev-old', latest_revision: revision };
  const responses = [
    skill,
    { skills: [skill], next_page_token: 'next+a/b=' },
    skill,
    skill,
    { revisions: [{ revision }], next_page_token: null },
    { download_url: 'https://example.test/bundle.zip', revision },
    null,
  ];
  const methods = ['POST', 'GET', 'GET', 'PUT', 'GET', 'GET', 'DELETE'];
  const paths = [
    '/v1/skills',
    '/v1/skills',
    '/v1/skills/skill%2Fid',
    '/v1/skills/skill%2Fid',
    '/v1/skills/skill%2Fid/revisions',
    '/v1/skills/skill%2Fid/download',
    '/v1/skills/skill%2Fid',
  ];
  const queries = [
    {},
    { limit: '20', page_token: 'next+a/b=' },
    {},
    { expected_revision: revision },
    { limit: '20', page_token: 'next+a/b=' },
    { revision },
    { expected_revision: revision },
  ];
  let count = 0;
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      const index = count++;
      const request = new Request(input, init);
      const url = new URL(request.url);
      assert.equal(request.method, methods[index]);
      assert.equal(url.pathname, paths[index]);
      assert.deepEqual(Object.fromEntries(url.searchParams), queries[index]);
      assert.equal(request.headers.get('authorization'), 'Bearer test');
      if (request.method === 'POST' || request.method === 'PUT') {
        assert.match(request.headers.get('content-type')!, /^multipart\/form-data; boundary=/);
        const form = await request.formData();
        assert.deepEqual([...form.keys()], ['file']);
        const uploaded = form.get('file') as File;
        assert.equal(uploaded.name, 'bundle.zip');
        assert.equal(uploaded.type, 'application/zip');
        assert.deepEqual(new Uint8Array(await uploaded.arrayBuffer()), bytes);
      } else {
        assert.equal(await request.text(), '');
      }
      const body = responses[index];
      return body
        ? Response.json(body, { status: index === 0 ? 201 : 200 })
        : new Response(null, { status: 204 });
    },
  });
  const created = await client.skills.create({ file });
  assert.equal(created.skill_id, 'skill/id');
  const page = await client.skills.list({ limit: 20, page_token: 'next+a/b=' });
  assert.equal(page.skills[0]?.skill_id, created.skill_id);
  const retrieved = await client.skills.retrieve(created.skill_id);
  assert.equal(retrieved.revision, 'rev-old');
  assert.equal(retrieved.latest_revision, revision);
  assert.ok(retrieved.latest_revision != null);
  const updated = await client.skills.update(
    created.skill_id,
    { file },
    { expected_revision: retrieved.latest_revision },
  );
  assert.equal(updated.latest_revision, revision);
  const revisions = await client.skills.revisions.list(created.skill_id, {
    limit: 20,
    page_token: 'next+a/b=',
  });
  assert.equal(revisions.revisions[0]?.revision, revision);
  const download = await client.skills.download(created.skill_id, { revision: retrieved.latest_revision });
  assert.equal(download.download_url, 'https://example.test/bundle.zip');
  assert.ok(updated.latest_revision != null);
  assert.equal(
    await client.skills.delete(created.skill_id, { expected_revision: updated.latest_revision }),
    null,
  );
  assert.equal(count, 7);
});

it('rejects empty and dot path parameters before sending a request', () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input) => {
      throw new Error(`unexpected request to ${String(input)}`);
    },
  });
  assert.throws(
    () => client.skills.retrieve(undefined as unknown as string),
    /cannot be used as a path parameter/,
  );
  assert.throws(() => client.skills.retrieve(1.5 as unknown as string), /cannot be used as a path parameter/);
  for (const id of ['', '.', '..']) {
    assert.throws(() => client.skills.retrieve(id), /cannot be used as a path parameter/);
    assert.throws(
      () => client.skills.delete(id, { expected_revision: 'rev' }),
      /cannot be used as a path parameter/,
    );
    assert.throws(() => client.responses.retrieve(id), /cannot be used as a path parameter/);
  }
});

it('rejects non-Blob multipart inputs before sending a request', async () => {
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input) => {
      throw new Error(`unexpected request to ${String(input)}`);
    },
  });
  await assert.rejects(
    async () => client.skills.create({ file: 'bundle.zip' as unknown as Blob }),
    /Multipart field file must be a File or Blob/,
  );
});

it('sends only schema fields in multipart uploads', async () => {
  let fields: string[] = [];
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      const form = await new Request(input, init).formData();
      fields = [...form.keys()];
      return Response.json({ skill_id: 'skill-1', name: 'example', revision: 'rev', latest_revision: 'rev' });
    },
  });
  const file = new File([new Uint8Array([1])], 'bundle.zip', { type: 'application/zip' });
  await client.skills.create({ file, extra: file } as unknown as { file: Blob });
  assert.deepEqual(fields, ['file']);
});
