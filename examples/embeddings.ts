import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();

// pplx-embed-v2 models require input_type: 'query' for the text a user types to
// search, 'document' for everything you index.
const query = await client.embeddings.create({
  input: ['What drives scientific breakthroughs?'],
  input_type: 'query',
  model: 'pplx-embed-v2-context-0.6b',
});
console.log('query', query.data?.[0]?.embedding);

// Each document is an array of non-overlapping chunks in source order. Every
// chunk is embedded in the context of its whole document, and the response
// returns one embedding per chunk.
const documents = await client.embeddings.create({
  input: [
    ['Curiosity sparks questions.', 'They drive breakthroughs.'],
    ['The Curiosity rover explores Mars.'],
  ],
  input_type: 'document',
  model: 'pplx-embed-v2-context-0.6b',
});

for (const document of documents.data ?? []) {
  for (const chunk of document.data ?? []) {
    console.log(`document ${document.index} chunk ${chunk.index}`, chunk.embedding);
  }
}
