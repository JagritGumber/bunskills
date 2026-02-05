# Buntralino CLI

Install:

```bash
bun install --global buntralino-cli
```

## Commands

### buntralino create [name] [templateName]
Creates a Buntralino project. templateName is new (default) or vite. If no arguments are provided, an interactive prompt appears.

### buntralino add
Adds Buntralino to an existing Neutralino.js project. Run in the project root containing neutralino.config.json.

### buntralino run [indexPath]
Runs the Buntralino project. indexPath defaults to index.ts in the current working directory. Pass arguments to the main script after --.

```bash
buntralino run -- --devmode
```

### buntralino build [indexPath]
Builds the project for distribution by building Neutralino, bundling Bun scripts, and arranging outputs. indexPath defaults to index.ts. Pass additional bun build arguments after --.

```bash
buntralino build src/bun/index.ts -- --external original-fs
```

### buntralino --version
Displays the CLI version.

### buntralino --help
Displays help.
