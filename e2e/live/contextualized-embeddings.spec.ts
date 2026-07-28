import { it } from 'node:test';
import { contextualizedEmbeddingContract, createClients, expectMatchingContracts } from './helpers.ts';

it('matches published contextualized embeddings response contract', async () => {
  const { candidate, published } = createClients();
  const request = {
    dimensions: 128,
    input: [['Perplexity answers questions.', 'Its answers include citations.']],
    model: 'pplx-embed-context-v1-0.6b' as const,
  };

  await expectMatchingContracts(
    () => candidate.contextualizedEmbeddings.create(request),
    () => published.contextualizedEmbeddings.create(request),
    contextualizedEmbeddingContract,
  );
});
