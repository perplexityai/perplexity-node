import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
const response = await client.contextualizedEmbeddings.create({
  dimensions: 128,
  input: [
    ['Perplexity answers questions.', 'Its answers include citations.'],
    ['TypeScript adds static types to JavaScript.'],
  ],
  model: 'pplx-embed-context-v1-0.6b',
});

for (const document of response.data ?? []) {
  console.log(`document ${document.index}`);
  for (const embedding of document.data ?? []) {
    console.log(embedding.index, embedding.embedding);
  }
}
