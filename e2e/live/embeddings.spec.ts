import { it } from 'node:test';
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
