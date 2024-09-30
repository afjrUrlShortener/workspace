# Url Shortener Workspace

## First time?

run `npm run init`

- this will create the folders with the necessary repositories under: `./repositories/`

## Usage

run `npm run git` + any usual git command to be executed on all repositories, e.g.:

- `npm run git pull`
- `npm run git -- fetch --all`
  - obs: any command that uses --flag must succeed the `npm run git` with -- for Node.js reasons

## How to add new repositories?

simply edit the `repositories.json` file following the same principles that already exists

## Warnings

- DO NOT use this tool for multi repo commits
- DO NOT use this tool for anything that should be made repository per repository