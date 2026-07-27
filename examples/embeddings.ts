import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
const response = await client.embeddings.create({
  dimensions: 128,
  input: ['Perplexity answers questions.', 'Embeddings represent semantic meaning.'],
  model: 'pplx-embed-v1-0.6b',
});

for (const embedding of response.data ?? []) {
  console.log(embedding.index, embedding.embedding);
}
