import assert from 'node:assert/strict';
import { it } from 'node:test';
import { collect, createClients, expectMatchingContracts, streamingCompletionContract } from './helpers.ts';

it('matches published streaming chat contract', async () => {
  const { candidate, published } = createClients();
  const request = {
    max_tokens: 16,
    messages: [{ content: 'Reply with only the word pong.', role: 'user' as const }],
    model: 'sonar',
    stream: true as const,
    temperature: 0,
  };

  await expectMatchingContracts(
    async () => collect(await candidate.chat.completions.create(request)),
    async () => collect(await published.chat.completions.create(request)),
    (chunks) => {
      assert.ok(Array.isArray(chunks));
      return streamingCompletionContract(chunks);
    },
  );
});
