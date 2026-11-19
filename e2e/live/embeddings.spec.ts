import assert from 'node:assert/strict';
import { it } from 'node:test';
import { crc32, deflateSync } from 'node:zlib';
import {
  contextualizedEmbeddingContract,
  createClients,
  embeddingContract,
  expectMatchingContracts,
} from './helpers.ts';

it('matches published embeddings response contract', async () => {
  const { candidate, published } = createClients();
  const request = {
    dimensions: 128,
    input: 'Perplexity answers questions.',
    model: 'pplx-embed-v1-0.6b' as const,
  };

  await expectMatchingContracts(
    () => candidate.embeddings.create(request),
    () => published.embeddings.create(request),
    embeddingContract,
  );
});

it('embeds v2 queries', async () => {
  const { candidate } = createClients();
  embeddingContract(
    await candidate.embeddings.create({
      input: ['What does Perplexity do?'],
      input_type: 'query',
      model: 'pplx-embed-v2-context-0.6b',
    }),
  );
});

it('embeds v2 chunked documents', async () => {
  const { candidate } = createClients();
  contextualizedEmbeddingContract(
    await candidate.embeddings.create({
      input: [['Perplexity answers questions.', 'Its answers include citations.']],
      input_type: 'document',
      model: 'pplx-embed-v2-context-0.6b',
    }),
  );
});

// Build a small RGB gradient PNG so the test needs no fixture file.
function pngDataUri(size = 64) {
  const chunk = (kind: string, data: Buffer) => {
    const body = Buffer.concat([Buffer.from(kind, 'ascii'), data]);
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const checksum = Buffer.alloc(4);
    checksum.writeUInt32BE(crc32(body));
    return Buffer.concat([length, body, checksum]);
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header.set([8, 2, 0, 0, 0], 8);
  const rows = Buffer.alloc(size * (1 + size * 3));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const offset = y * (1 + size * 3) + 1 + x * 3;
      rows.set([Math.floor((x * 255) / size), Math.floor((y * 255) / size), 128], offset);
    }
  }
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(rows)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  return `data:image/png;base64,${png.toString('base64')}`;
}

it('embeds v2 images', async () => {
  const { candidate } = createClients();
  embeddingContract(
    await candidate.embeddings.create({
      input: [{ type: 'image', image: pngDataUri() }],
      input_type: 'document',
      model: 'pplx-embed-v2-context-0.6b',
    }),
  );
});

it('embeds v2 image regions', async () => {
  const { candidate } = createClients();
  const response = await candidate.embeddings.create({
    input: [{ type: 'image', image: pngDataUri(256) }],
    input_type: 'document',
    model: 'pplx-embed-v2-context-0.6b',
    num_chunks: 2,
  });
  contextualizedEmbeddingContract(response);
  // Small images can return fewer regions than requested.
  assert.ok((response.data?.[0]?.data?.length ?? 0) <= 2);
});
