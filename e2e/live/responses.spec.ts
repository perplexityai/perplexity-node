import { it } from 'node:test';
import { createClients, expectMatchingContracts, responseContract } from './helpers.ts';

it('matches published responses API contract', async () => {
  const { candidate, published } = createClients();
  const request = {
    input: 'Reply with only the word pong.',
    max_output_tokens: 16,
    preset: 'pro-search',
  };

  await expectMatchingContracts(
    () => candidate.responses.create(request),
    () => published.responses.create(request),
    responseContract,
  );
});
