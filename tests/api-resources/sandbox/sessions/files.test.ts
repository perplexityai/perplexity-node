// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource files', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.sandbox.sessions.files.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sandbox.sessions.files.list(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { depth: 1, path: 'path' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Perplexity.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('modified', async () => {
    const responsePromise = client.sandbox.sessions.files.modified('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('read: only required params', async () => {
    const responsePromise = client.sandbox.sessions.files.read('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      path: 'path',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('read: required and optional params', async () => {
    const response = await client.sandbox.sessions.files.read('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      path: 'path',
    });
  });

  // Mock server tests are disabled
  test.skip('write: only required params', async () => {
    const responsePromise = client.sandbox.sessions.files.write('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      content: 'content',
      path: 'path',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('write: required and optional params', async () => {
    const response = await client.sandbox.sessions.files.write('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      content: 'content',
      path: 'path',
    });
  });
});
