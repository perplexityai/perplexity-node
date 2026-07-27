## Setting up the environment

This repository uses Bazel 9.2, Node 26, and [`pnpm`](https://pnpm.io/installation).

To set up the repository, run:

```sh
$ corepack enable pnpm
$ pnpm install
$ pnpm lefthook install
$ bazel build //:pkg
```

This installs dependencies and builds the publishable package at `bazel-bin/package/`.

## Modifying/Adding code

API resources are generated from the OpenAPI specification. Keep manual helpers in `src/lib/`.

Run Gazelle after adding, removing, or changing TypeScript imports. Gazelle owns
TypeScript sources and dependencies in `BUILD.bazel` files.

```sh
$ bazel run //:gazelle
```

## Adding and running examples

Examples can be added under `examples/`.

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
$ bazel build //:pkg
$ pnpm --dir bazel-bin/package link --global
$ cd ../my-package
$ pnpm link --global @perplexity-ai/perplexity_ai
```

## Running tests

```sh
$ bazel test //...
```

## Linting and formatting

This repository uses [Oxfmt](https://www.npmjs.com/package/oxfmt) and
[Oxlint](https://www.npmjs.com/package/oxlint) to format and lint the code.

To lint:

```sh
$ pnpm lefthook run pre-commit --all-files --force --fail-on-changes
```

To format and fix all lint issues automatically:

```sh
$ pnpm lefthook run pre-commit --all-files
```

## Publishing and releases

Changes made to this repository via the automated release PR pipeline should publish to npm automatically. If
the changes aren't made through the automated pipeline, you may want to make releases manually.

### Publish with a GitHub workflow

You can release to package managers by using [the `Publish NPM` GitHub action](https://www.github.com/perplexityai/perplexity-node/actions/workflows/publish-npm.yml). This requires a setup organization or repository secret to be set up.

### Publish manually

If needed, build the package with `bazel build //:pkg` and publish `bazel-bin/package` with npm.
