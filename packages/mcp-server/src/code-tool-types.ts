// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { ClientOptions } from '@perplexity-ai/perplexity_ai';

export type WorkerInput = {
  opts: ClientOptions;
  code: string;
};
export type WorkerSuccess = {
  result: unknown | null;
  logLines: string[];
  errLines: string[];
};
export type WorkerError = { message: string | undefined };
