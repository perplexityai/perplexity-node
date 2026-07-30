# Agent guidance

Follow [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, development, and release
commands.

## Scope

- Treat `src/generated/`, `src/resources.ts`, and `src/resources/` as output
  from a private SDK codegen pipeline. Do not edit them.
- Keep handwritten changes focused and preserve unrelated generated files.
- Update `package.json` and `pnpm-lock.yaml` together for dependency changes.

## Workflow

- Use Bazel targets instead of direct Node test or build commands.
- Run `bazel run //:gazelle` after adding files or changing imports.
- Do not bump versions, edit release PR output, or publish packages manually.

## Validation

- Run `bazel test //...`.
- Run `bazel test //:test //:package_checks //e2e:sdk_parity` for public-surface
  changes.
- Run `pnpm lefthook run pre-commit --all-files --force --fail-on-changes`.
- Run live tests only when explicitly requested and `PPLX_API_TOKEN` is
  available.
