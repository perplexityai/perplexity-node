import { it } from 'node:test';
import { createClients, expectMatchingContracts, searchContract } from './helpers.ts';

it('matches published search response contract', async () => {
  const { candidate, published } = createClients();
  const request = {
    max_results: 1,
    query: 'Perplexity AI',
  };

  await expectMatchingContracts(
    () => candidate.search.create(request),
    () => published.search.create(request),
    searchContract,
  );
});
