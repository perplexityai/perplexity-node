import { it } from 'node:test';
import { completionContract, createClients, expectMatchingContracts } from './helpers.ts';

it('matches published chat completion response contract', async () => {
  const { candidate, published } = createClients();
  const request = {
    max_tokens: 16,
    messages: [{ content: 'Reply with only the word pong.', role: 'user' as const }],
    model: 'sonar',
    temperature: 0,
  };

  await expectMatchingContracts(
    () => candidate.chat.completions.create(request),
    () => published.chat.completions.create(request),
    completionContract,
  );
});
