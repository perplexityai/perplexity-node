import { readdir } from 'node:fs/promises';

const testDirectory = new URL('./test-dist/', import.meta.url);
const testFiles = (await readdir(testDirectory, { recursive: true }))
  .filter((path) => path.endsWith('.test.js'))
  .sort();

for (const testFile of testFiles) {
  await import(new URL(testFile, testDirectory));
}
