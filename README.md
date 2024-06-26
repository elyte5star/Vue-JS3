# e-realm

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

 - Clone project with

  ```
  git clone git@github.com:elyte5star/Vue-JS3.git
  ```
  ```
  git clone git@github.com:elyte5star/mark.js.git

  ```
  - place the mark.js folder under src/assets 
  

  - Create file .env and set values for the environment variables below:

  ```
NODE_ENV=development
VITE_API_URL=http://localhost:8001/ # The base API endpoint to which requests are made
VUE_API_CLIENT_ID=elyte
VUE_BASE_URL=http://localhost:9000/
VUE_MAINTENANCE_MODE=false
VUE_WAIT_TIME=3000
VITE_APP_MSAL_CLIENT_ID=xxxxxxxxxxx
VUE_APP_MSAL_LOGIN_AUTHORITY=https://login.microsoftonline.com/xxxxxxxxxxxxxxxx
VUE_GOOGLE_CLIENT_ID=xxxxxxxxxxxxx.apps.googleusercontent.com
NGINX_PROXY_PASS=http://api:8001/
NGINX_PORT=8001
  ```


```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
