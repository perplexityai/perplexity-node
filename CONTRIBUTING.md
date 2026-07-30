# Contributing

## Setup

Install Node 26 and [Bazelisk](https://github.com/bazelbuild/bazelisk), then
enable the repository's pinned `pnpm`:

```sh
npm install --global corepack@latest
corepack enable pnpm
pnpm install --frozen-lockfile
pnpm lefthook install
bazel build //:pkg
```

The publishable package is written to `bazel-bin/package/`.

## Make changes

Handwritten client, transport, and helper code lives in `src/client.ts`,
`src/core/`, `src/internal/`, and `src/lib/`. Do not edit `src/generated/`,
`src/resources.ts`, or `src/resources/`; the code is produced by a private SDK
codegen pipeline.

Tests live beside handwritten code under `src/test/`. Compatibility and live
API tests live under `e2e/`.

After changing TypeScript imports or adding files, update BUILD files:

```sh
bazel run //:gazelle
```

For a dependency change, update `package.json`, run
`pnpm install --frozen-lockfile=false`, then run Gazelle. Commit
`pnpm-lock.yaml` and generated `BUILD.bazel` changes.

Use [Conventional Commits](https://www.conventionalcommits.org/), such as
`fix: handle empty responses` or `feat: add a resource`. Release Please uses
these commits to choose the next version and build the changelog.

## Test

Run the same main test suite as CI:

```sh
bazel test //...
```

Run core, package, and published-SDK compatibility gates explicitly:

```sh
bazel test //:test //:package_checks //e2e:sdk_parity
```

Validate formatting, lint, and generated BUILD files:

```sh
pnpm lefthook run pre-commit --all-files --force --fail-on-changes
```

Apply formatting and lint fixes:

```sh
pnpm lefthook run pre-commit --all-files
```

Live tests call the production API and require a token. Run only the relevant
shard:

```sh
PPLX_API_TOKEN=... bazel test //e2e/live:search --test_env=PPLX_API_TOKEN
```

Build the publishable package:

```sh
bazel build //:pkg
```

## Release

Do not bump versions or publish from a development branch.

1. Merge normal PRs into `main`.
2. Release Please creates or updates a `release: <version>` PR from Conventional
   Commits.
3. Review and merge that PR. It updates the changelog and version files, then
   creates the `v<version>` tag and GitHub release.
4. The published GitHub release triggers `Publish NPM`, which builds `//:pkg`
   and publishes it with npm provenance.

Stable versions use the `latest` npm tag. Prerelease versions use their
prerelease identifier as the npm tag. Release automation requires
`RELEASE_TOKEN`; npm publishing uses GitHub Actions OIDC and an npm trusted
publisher for `publish-npm.yml`. For a failed upload, rerun `Publish NPM`
against the existing release tag; do not create a new version.
