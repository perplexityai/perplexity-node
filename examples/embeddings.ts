import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();

// pplx-embed-v2 models require input_type: "query" for search queries,
// "document" for the content you search over.
const query = await client.embeddings.create({
  input: ['How do contextual embeddings work?'],
  input_type: 'query',
  model: 'pplx-embed-v2-context-9b',
});
console.log('query', query.data?.[0]?.embedding);

// Each document is a list of chunks. Every chunk is embedded in the context of
// its whole document, and the response returns one embedding per chunk.
const documents = await client.embeddings.create({
  input: [
    ['Perplexity answers questions.', 'Its answers include citations.'],
    ['Embeddings represent semantic meaning.'],
  ],
  input_type: 'document',
  model: 'pplx-embed-v2-context-9b',
});

for (const document of documents.data ?? []) {
  for (const chunk of document.data ?? []) {
    console.log(`document ${document.index} chunk ${chunk.index}`, chunk.embedding);
  }
}
