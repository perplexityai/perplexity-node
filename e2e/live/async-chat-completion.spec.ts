import assert from 'node:assert/strict';
import { it } from 'node:test';
import { asyncCompletionContract, createClients, pollAsyncCompletion } from './helpers.ts';

it('matches published async chat completion lifecycle', { timeout: 180_000 }, async () => {
  const { candidate, published } = createClients();
  const request = {
    request: {
      max_tokens: 16,
      messages: [{ content: 'Reply with only the word pong.', role: 'user' as const }],
      model: 'sonar-deep-research',
    },
  };
  const [candidateInitial, publishedInitial] = await Promise.all([
    candidate.async.chat.completions.create(request),
    published.async.chat.completions.create(request),
  ]);
  assert.deepStrictEqual(
    asyncCompletionContract(candidateInitial),
    asyncCompletionContract(publishedInitial),
  );

  const [candidateCompleted, publishedCompleted] = await Promise.all([
    pollAsyncCompletion(candidateInitial, (id) => candidate.async.chat.completions.get(id)),
    pollAsyncCompletion(publishedInitial, (id) => published.async.chat.completions.get(id)),
  ]);
  assert.deepStrictEqual(
    asyncCompletionContract(candidateCompleted),
    asyncCompletionContract(publishedCompleted),
  );
});
