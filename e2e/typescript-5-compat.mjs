// oxlint-disable no-restricted-imports -- Verify packaged public entrypoints.
import ts from 'typescript-5';
import { fileURLToPath } from 'node:url';

await Promise.all([
  import('@perplexity-ai/perplexity_ai/client.mjs'),
  import('@perplexity-ai/perplexity_ai/core/error.mjs'),
  import('@perplexity-ai/perplexity_ai/resources/chat/completions.mjs'),
  import('@perplexity-ai/perplexity_ai/version.mjs'),
]);

const fixture = fileURLToPath(new URL('./typescript-5-compat.mts', import.meta.url));
const program = ts.createProgram({
  rootNames: [fixture],
  options: {
    lib: ['lib.es2020.d.ts', 'lib.dom.d.ts'],
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    noEmit: true,
    skipLibCheck: false,
    strict: true,
    target: ts.ScriptTarget.ES2020,
  },
});
const diagnostics = ts.getPreEmitDiagnostics(program);

if (diagnostics.length > 0) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n',
    }),
  );
  process.exitCode = 1;
}
