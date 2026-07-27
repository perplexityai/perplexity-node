import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
const stream = await client.responses.create({
  input: 'What changed in TypeScript this year?',
  model: 'sonar',
  stream: true,
});

for await (const event of stream) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  }
}
process.stdout.write('\n');
