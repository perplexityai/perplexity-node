// Custom code that persists through Stainless regeneration.
// This adds the output_text convenience property to Response objects,

/**
 * Response interface with output_text property added.
 * This will match the ResponseCreateResponse type once generated.
 * `output` is intentionally loose: OutputItem is a discriminated union whose
 * members carry different `content` shapes (message items use content parts,
 * sandbox_read_file uses a string), so we only require the discriminator here
 * and narrow message content at the use site.
 */
interface Response {
  object: 'response';
  output: Array<{ type: string }>;
  output_text?: string;
}

interface MessageContentPart {
  type: string;
  text?: string;
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
    const content = (output as { content?: Array<MessageContentPart> }).content;
    for (const part of content || []) {
      if (part.type === 'output_text' && part.text) {
        texts.push(part.text);
      }
    }
  }
  rsp.output_text = texts.join('');
}
