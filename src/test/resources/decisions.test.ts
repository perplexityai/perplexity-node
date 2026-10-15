import assert from 'node:assert/strict';
import { it } from 'node:test';
import Perplexity from '../../index.js';
import type { DecisionCreateParams } from '../../resources/decisions.js';

it('answers mixed questions through the Decisions API', async () => {
  const body: DecisionCreateParams = {
    model: 'pplx-decider-v1.1-27b',
    state: { review: 'The battery stopped charging.' },
    questions: {
      defect: { type: 'noul', criteria: { true: 'Broken', false: null } },
      sentiment: { type: 'choice', criteria: { positive: null, negative: 'Dissatisfied' } },
      severity: { type: 'score', criteria: ['Cosmetic', { description: 'Unusable' }] },
    },
  };
  const client = new Perplexity({
    apiKey: 'test',
    baseURL: 'https://example.test',
    fetch: async (input, init) => {
      const request = new Request(input, init);
      assert.equal(request.method, 'POST');
      assert.equal(request.url, 'https://example.test/v1/decisions');
      assert.equal(request.headers.get('authorization'), 'Bearer test');
      assert.deepEqual(await request.json(), body);
      return Response.json({
        model: body.model,
        answers: {
          defect: { type: 'noul', noul: 0.95 },
          sentiment: {
            type: 'choice',
            choice: 'negative',
            confidence: 0.9,
            probabilities: { positive: 0.1, negative: 0.9 },
          },
          severity: {
            type: 'score',
            score: 0.9,
            confidence: 0.9,
            legend: { '0': 'Cosmetic', '1': { description: 'Unusable' } },
            probabilities: { '0': 0.1, '1': 0.9 },
          },
        },
        usage: { input_tokens: 100, output_tokens: 3 },
      });
    },
  });
  const response = await client.decisions.create(body);
  const defect = response.answers['defect'];
  assert.ok(defect?.type === 'noul');
  assert.equal(defect.noul, 0.95);
  const sentiment = response.answers['sentiment'];
  assert.ok(sentiment?.type === 'choice');
  assert.equal(sentiment.choice, 'negative');
  const severity = response.answers['severity'];
  assert.ok(severity?.type === 'score');
  assert.equal(severity.score, 0.9);
  assert.equal(response.usage.output_tokens, 3);
});
