# NPT ~ Node Package Template ~

# What is this?

This is a small node package template repository that uses Webpack and Babel to transform TypeScript to plain Javascript. Also, this uses Jest as a test framework.

# How do I use it?

First, please clone this repository into your workspace.

```bash
git clone git@github.com:takagimeow/node-package-template.git
```

And then, go to that directory and install prerequisite dependencies.

```bash
$ cd node-package-template
$ yarn install
```

## Building the repo

```bash
$ yarn run build
```

## Type-checking the repo

```bash
$ yarn run type-check
```

## Testing the repo

```bash
$ yarn run test
```

### with watch option

```bash
$ yarn run test:watch
```

## Linting the repo

```bash
$ yarn run lint
```

### with fix option

```bash
$ yarn run lint:fix
```

## Run the program

```bash
$ yarn run start
```