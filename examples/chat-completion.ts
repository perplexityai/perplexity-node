import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
const completion = await client.chat.completions.create({
  max_tokens: 256,
  messages: [{ content: 'Summarize latest AI developments.', role: 'user' }],
  model: 'sonar',
});

console.log(completion.choices[0]?.message.content);
