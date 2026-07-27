## Setting up the environment

This repository uses Bazel 9.2, Node 26, and [`pnpm`](https://pnpm.io/installation).

To set up the repository, run:

```sh
$ corepack enable pnpm
$ pnpm install
$ pnpm build
```

This installs dependencies and builds the publishable package at `bazel-bin/package/`.

## Modifying/Adding code

Most of the SDK is generated code. Modifications to code will be persisted between generations, but may
result in merge conflicts between manual patches and changes from the generator. The generator will never
modify the contents of the `src/lib/` and `examples/` directories.

## Adding and running examples

All files in the `examples/` directory are not modified by the generator and can be freely edited or added to.

```ts
// add an example to examples/<your-example>.mts

#!/usr/bin/env -S node --experimental-transform-types
…
```

```sh
$ chmod +x examples/<your-example>.mts
# run the example against your api
$ node --experimental-transform-types examples/<your-example>.mts
```

## Using the repository from source

To link a local build:

```sh
$ pnpm build
$ pnpm --dir bazel-bin/package link --global
$ cd ../my-package
$ pnpm link --global @perplexity-ai/perplexity_ai
```

## Running tests

```sh
$ pnpm test
```

## Linting and formatting

This repository uses [Oxfmt](https://www.npmjs.com/package/oxfmt) and
[Oxlint](https://www.npmjs.com/package/oxlint) to format and lint the code.

To lint:

```sh
$ pnpm lint
```

To format and fix all lint issues automatically:

```sh
$ pnpm fix
```

## Publishing and releases

Changes made to this repository via the automated release PR pipeline should publish to npm automatically. If
the changes aren't made through the automated pipeline, you may want to make releases manually.

### Publish with a GitHub workflow

You can release to package managers by using [the `Publish NPM` GitHub action](https://www.github.com/perplexityai/perplexity-node/actions/workflows/publish-npm.yml). This requires a setup organization or repository secret to be set up.

### Publish manually

If you need to manually release a package, you can run the `bin/publish-npm` script with an `NPM_TOKEN` set on
the environment.
