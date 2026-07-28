import { it } from 'node:test';
import { createClients, embeddingContract, expectMatchingContracts } from './helpers.ts';

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
