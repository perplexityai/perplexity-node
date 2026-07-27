import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
const search = await client.search.create({
  max_results: 5,
  query: 'latest developments in artificial intelligence',
  search_recency_filter: 'week',
});

for (const result of search.results) {
  console.log(`${result.title}\n${result.url}\n${result.snippet}\n`);
}
