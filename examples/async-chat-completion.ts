import { setTimeout } from 'node:timers/promises';
import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
let completion = await client.async.chat.completions.create({
  request: {
    messages: [{ content: 'Summarize latest AI developments.', role: 'user' }],
    model: 'sonar',
  },
});

while (completion.status === 'CREATED' || completion.status === 'IN_PROGRESS') {
  await setTimeout(1_000);
  completion = await client.async.chat.completions.get(completion.id);
}

if (completion.status === 'FAILED') {
  throw new Error(completion.error_message ?? 'Async completion failed');
}

console.log(completion.response?.choices[0]?.message.content);
