ajcli
=====

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ajcli.svg)](https://npmjs.org/package/ajcli)
[![Downloads/week](https://img.shields.io/npm/dw/ajcli.svg)](https://npmjs.org/package/ajcli)
[![License](https://img.shields.io/npm/l/ajcli.svg)](https://github.com/ahjota/mycli/blob/master/package.json)

A personal command line interface. What.

# Requirements

This CLI is built on top of [oclif][0], which requires [LTS Node][1]. It is also configured to use Yarn v2.

[0]: https://oclif.io/
[1]: https://oclif.io/docs/introduction#requirements

<!-- toc -->
* [Requirements](#requirements)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ajcli
$ aj COMMAND
running command...
$ aj (-v|--version|version)
ajcli/0.0.0 darwin-x64 node-v14.15.0
$ aj --help [COMMAND]
USAGE
  $ aj COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->

# Development
```sh
# install everything
yarn install
# this is necessary for VS Code to pick up yarn 2 workspace packaging
yarn dlx @yarnpkg/pnpify --sdk vscode
# and then to test the cli
yarn aj
```
