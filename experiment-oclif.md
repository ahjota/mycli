# Experiment: oclif

## Notes

`npx oclif single ajcli`

```sh
✗ npx oclif single
npx oclif single       

     _-----_     ╭──────────────────────────╮
    |       |    │      Time to build a     │
    |--(o)--|    │  single-command CLI with │
   `---------´   │  oclif! Version: 1.16.1  │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? npm package name ajcli
? command bin name the CLI will export aj
? description AJ's personal CLI
? author AJ Alon @ahjota
? version 0.0.0
? license MIT
? Who is the GitHub owner of repository (https://github.com/OWNER/repo) ahjota
? What is the GitHub name of repository (https://github.com/owner/REPO) mycli
? Select a package manager yarn
? TypeScript Yes
? Use eslint (linter for JavaScript and Typescript) Yes
? Use mocha (testing framework) Yes
? Add CI service config 
   create package.json
   create tsconfig.json
   create test/tsconfig.json
   create .eslintignore
   create .eslintrc
   create test/mocha.opts
   create .editorconfig
 conflict README.md
? Overwrite README.md? overwrite
    force README.md
 conflict .gitignore
? Overwrite .gitignore? overwrite
    force .gitignore
   create bin/run
   create bin/run.cmd
   create src/index.ts
   create test/index.test.ts
yarn add v1.22.5
info No lockfile found.
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
warning mocha > mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)
[3/5] 🚚  Fetching packages...
[4/5] 🔗  Linking dependencies...
[5/5] 🔨  Building fresh packages...
warning Ignored scripts due to flag.
success Saved lockfile.
success Saved 275 new dependencies.
info Direct dependencies

...

✨  Done in 6.54s.
yarn add v1.22.5
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
[3/5] 🚚  Fetching packages...
[4/5] 🔗  Linking dependencies...
[5/5] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 0 new dependencies.
✨  Done in 1.92s.
replacing <!-- usage --> in README.md
replacing <!-- commands --> in README.md
replacing <!-- toc --> in README.md

Created ajcli in /Users/aj/workspace/ajcli
```

## Yarn v2

Yarn v2 now works on a per-project basis.

```
✗ yarn set version berry
Resolving berry to a url...
Downloading https://github.com/yarnpkg/berry/raw/master/packages/berry-cli/bin/berry.js...
Saving it into /Users/aj/workspace/ajcli/.yarn/releases/yarn-berry.cjs...
Updating /Users/aj/workspace/ajcli/.yarnrc.yml...
Done!
```
