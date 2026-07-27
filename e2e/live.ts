import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
// oxlint-disable-next-line no-restricted-imports -- Verify packaged public entrypoint.
import { Perplexity as Candidate } from '@perplexity-ai/perplexity_ai';
import { Perplexity as Published } from 'published-sdk';

interface CompletionResponse {
  choices: Array<{
    index: number;
    message: {
      content: string;
      role: string;
    };
    [key: string]: unknown;
  }>;
  id: string;
  model: string;
  [key: string]: unknown;
}

function completionContract(response: unknown) {
  assert.ok(typeof response === 'object' && response !== null);
  const completion = response as CompletionResponse;

  assert.equal(typeof completion.id, 'string');
  assert.equal(typeof completion.model, 'string');
  assert.ok(Array.isArray(completion.choices));
  assert.ok(completion.choices.length > 0);

  const choice = completion.choices[0];
  assert.ok(choice);
  assert.equal(typeof choice.index, 'number');
  assert.equal(typeof choice.message?.content, 'string');
  assert.equal(choice.message?.role, 'assistant');

  return {
    choiceKeys: Object.keys(choice).sort(),
    messageKeys: Object.keys(choice.message).sort(),
    responseKeys: Object.keys(completion).sort(),
  };
}

const request = {
  max_tokens: 16,
  messages: [{ content: 'Reply with only the word pong.', role: 'user' as const }],
  model: 'sonar',
  temperature: 0,
};

describe('live API parity', () => {
  it('matches published chat completion response contract', async () => {
    const apiKey = process.env['PPLX_API_TOKEN'];
    assert.ok(apiKey, 'PPLX_API_TOKEN must be set');

    const [candidateResponse, publishedResponse] = await Promise.all([
      new Candidate({ apiKey, maxRetries: 0 }).chat.completions.create(request),
      new Published({ apiKey, maxRetries: 0 }).chat.completions.create(request),
    ]);

    assert.deepStrictEqual(completionContract(candidateResponse), completionContract(publishedResponse));
  });
});
