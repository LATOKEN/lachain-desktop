# Lachain Desktop

> Lachain Desktop client for Windows, Mac, and Linux.

Forked from [idena-desktop](https://github.com/idena-network/idena-desktop) under MIT license.

Backed by [Electron](https://www.electronjs.org), [React](https://reactjs.org) and [Next.js](https://nextjs.org/).

[![Build Status](https://travis-ci.org/github/LAToken/lachain-desktop.svg?branch=master)](https://travis-ci.org/github/LAToken/lachain-desktop)

## Getting started

### Download latest release

https://github.com/LAToken/lachain/releases/latest

### Install

Follow installation instructions for your system.

### Configuration

Most of the configuration is available in `userData` directory:

- `%APPDATA%\Lachain desktop` on Windows
- `~/Library/Application Support/Lachain desktop` on macOS
- `~/.config/Lachain desktop` on Linux

**Note**: Manual configuration is a danger zone that may corrupt your installation and lead to unexpected behavior. Only edit configuration files if you're 💯sure what you do.

### Logs

Logs are available in `logs` directory:

- `%APPDATA%\Lachain desktop\logs` on Windows
- `~/Library/Application Support/Lachain desktop/logs` on macOS
- `~/.config/Lachain desktop/logs` on Linux

### Built-in node

Node configuration and data files located in `node` directory inside `userData`:

- `%APPDATA%\Lachain desktop\node` on Windows
- `~/Library/Application Support/Lachain desktop/node` on macOS
- `~/.config/Lachain desktop/node` on Linux

## Development

### Prerequisites

- [Node.js](https://nodejs.org) 10.x or later LTS versions recommended
- npm 6.x or later recommended
- Git

### Install dependencies

```bash
npm install
```

### Run

```
npm start
```

### Build

Builds available for macOS, Windows and Linux platforms thanks to [electron-builder](https://www.electron.build/).

You may build for the current platform:

```
npm run dist
```

or for a specific platform

```
npm run dist:win
npm run dist:mac
npm run dist:linux
```

Currently, only `deb` and `AppImage` targets are supported for Linux.

PRs are welcome! 👐

## Contributing

TBD
