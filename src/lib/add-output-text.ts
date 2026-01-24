// Custom code that persists through Stainless regeneration.
// This adds the output_text convenience property to Response objects,

/**
 * Response interface with output_text property added.
 * This will match the ResponseCreateResponse type once generated.
 */
interface Response {
  object: 'response';
  output: Array<{
    type: string;
    content?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
  output_text?: string;
}

/**
 * Adds the output_text convenience property to a Response object.
 * Aggregates all output_text items from the output list.
 *
 * If no output_text content blocks exist, then an empty string is set.
 *
 * This mutates the response object in place, matching OpenAI's Node SDK pattern.
 */
export function addOutputText(rsp: Response): void {
  const texts: string[] = [];
  for (const output of rsp.output) {
    if (output.type !== 'message') {
      continue;
    }
    for (const content of output.content || []) {
      if (content.type === 'output_text' && content.text) {
        texts.push(content.text);
      }
    }
  }
  rsp.output_text = texts.join('');
}
