import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
const response = await client.responses.create({
  input: 'What changed in TypeScript this year?',
  model: 'sonar',
});

console.dir(response.output, { depth: null });
