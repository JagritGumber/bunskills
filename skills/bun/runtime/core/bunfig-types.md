# bunfig.toml (TypeScript)

## Overview

bunfig.toml configures Bun-specific behavior. It is optional and typically lives alongside package.json. You can also place a global .bunfig.toml in $HOME or $XDG_CONFIG_HOME. Local settings override global settings, and CLI flags override both.

JSX settings can be defined here or in tsconfig.json.

## Runtime settings

- preload: scripts to run before executing files or scripts
- jsx, jsxFactory, jsxFragment, jsxImportSource: JSX configuration
- smol: reduce memory usage at a cost to performance
- logLevel: debug, warn, or error
- define: replace global identifiers with constant expressions
- loader: map file extensions to loaders
- telemetry: enable or disable analytics
- env: configure automatic .env loading
- console.depth: default depth for console.log inspection

## Test settings

The test runner is configured under the [test] section.

- test.root: root directory for tests
- test.preload: scripts to run before bun test
- test.smol: smol mode for tests
- test.coverage: enable coverage reporting
- test.coverageThreshold: enforce coverage thresholds

## Example

```toml
preload = ["./preload.ts"]
jsx = "react"
jsxFactory = "h"
jsxFragment = "Fragment"
jsxImportSource = "react"
smol = true
logLevel = "debug"
telemetry = false
env = false

[define]
"process.env.bagel" = "'lox'"

[loader]
".bagel" = "tsx"

[console]
depth = 3

[test]
root = "./__tests__"
preload = ["./setup.ts"]
smol = true
coverage = false
coverageThreshold = { line = 0.7, function = 0.8, statement = 0.9 }
```
