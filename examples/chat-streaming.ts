import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
const stream = await client.chat.completions.create({
  messages: [{ content: 'Summarize latest AI developments.', role: 'user' }],
  model: 'sonar',
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (typeof content === 'string') {
    process.stdout.write(content);
  }
}
process.stdout.write('\n');
