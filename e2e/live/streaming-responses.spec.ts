import assert from 'node:assert/strict';
import { it } from 'node:test';
import { collect, createClients, expectMatchingContracts, streamingResponseContract } from './helpers.ts';

it('matches published streaming responses API contract', async () => {
  const { candidate, published } = createClients();
  const request = {
    input: 'Reply with only the word pong.',
    max_output_tokens: 16,
    preset: 'pro-search',
    stream: true as const,
  };

  await expectMatchingContracts(
    async () => collect(await candidate.responses.create(request)),
    async () => collect(await published.responses.create(request)),
    (events) => {
      assert.ok(Array.isArray(events));
      return streamingResponseContract(events);
    },
  );
});
