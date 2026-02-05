# Buntralino Architecture

## Overview

Buntralino follows a main and renderer process model similar to Electron, but uses Bun for the main process and Neutralino for the UI layer. The Bun process manages windows and WebSocket connections, while each Neutralino window acts as a client.

## Bun Side

- Runs in the main Bun process
- Uses the buntralino package
- Creates and manages windows through the main Bun entry file
- Hosts a WebSocket server for Neutralino windows
- Registers methods that windows can call
- Emits window lifecycle events

## Client Side

- Runs inside Neutralino windows
- Uses the buntralino-client package
- Connects to the Bun WebSocket server
- Calls registered Bun-side methods
- Receives broadcasts and window events

## Communication Flow

1. Bun process starts and creates a WebSocket server
2. buntralino.create spawns a Neutralino process
3. The Neutralino window connects to Bun over WebSocket
4. Two-way communication is established
5. Windows call registered methods on the Bun side
6. Bun can execute JavaScript in window contexts
7. Events can be broadcast between windows through Bun
