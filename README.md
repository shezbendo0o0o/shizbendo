# Shizbendo

Shizbendo is a branding and terminal-launcher customization layer for
the Decepticon autonomous security platform.

## Features

- SHIZBENDO terminal ASCII logo
- Shizbendo engagement picker
- Shizbendo CLI status line
- Display-only shizbendo-* container names
- AI-provider selection menu
- Persistent branded Docker CLI image
- Interactive PTY wrapper

## Compatibility

Tested with Decepticon 1.1.40 on Kali Linux ARM64.

Internal identifiers remain unchanged for compatibility, including:

    DECEPTICON_*
    decepticon-langgraph
    decepticon-postgres
    decepticon-neo4j
    decepticon-litellm

Only the visible terminal output is renamed.

## Installation

Install the official Decepticon runtime first.

Then run:

    git clone https://github.com/shezbendo0o0o/shizbendo.git
    cd shizbendo
    sudo ./install.sh

Start Shizbendo with:

    sudo shizbendo

## Updating

    cd shizbendo
    git pull
    sudo ./install.sh

## Security

This repository does not contain:

- API keys
- Environment files
- Engagement workspaces
- Databases
- Docker volumes
- The upstream launcher binary

Never commit /root/.decepticon/.env.

## Upstream

Shizbendo is a customization layer for:

    https://github.com/PurpleAILAB/Decepticon

Shizbendo is not affiliated with or endorsed by PurpleAILAB.

## Authorized use only

Use this software only on systems for which you have explicit
authorization.
