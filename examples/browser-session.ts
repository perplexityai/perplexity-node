import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity();
const session = await client.browser.sessions.create();

if (!session.session_id) {
  throw new Error('Browser session response did not include session_id');
}

try {
  console.log(`Browser session ${session.session_id} is ${session.status}`);
} finally {
  await client.browser.sessions.delete(session.session_id);
}
