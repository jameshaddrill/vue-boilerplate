<div align="center">
  <img src="https://i.imgur.com/fzqYaLE.png" alt="FE boilerplate - Core logo" height="200" />
  <img src="https://vuejs.org/images/logo.png" alt="FE boilerplate - Core logo" height="200" />
</div>


---

<p align="center"><strong>FE boilerplate - Vue</strong></p>

---

# AmazeRealise FE boilerplate with Vue

> This is the core FE boilerplate used by AR developer to build Vue apps.

## Features

- Enable [ES2015 features](https://babeljs.io/docs/learn-es2015/) using [Babel](https://babeljs.io)
- Bundled JS code using [webpack](https://webpack.js.org/).
- CSS [Autoprefixing](https://github.com/postcss/autoprefixer), [PostCSS](http://postcss.org/)
- Map compiled CSS/JS to source stylesheets/js with source maps
- [browserslist](http://browserl.ist/) support for babel and friends
- Linting done with [eslint](https://eslint.org/) and [stylelint](https://stylelint.io/)
- Create a pre-rendered Vue site
- And many more.

## Installing / Getting started

In order to get started make sure you have Node (8 or later preferably) and Git installed on your machine.

```shell
git archive --remote=git@gitlab.com:James.Haddrill/fe-boilerplate master | tar xf -
```

This will create a tar archive that contains the contents of the latest master branch, and extract it in the currect directory.

```shell
npm i
```

This will install the npm modules preparing the folder for dev.

```shell
npm run start
```

This will run the local dev environment and will start the local webpack dev server.

## Developing

### Built With

- [Node.js](https://nodejs.org/en/) used for tooling
- [Sass](https://sass-lang.com/) for CSS
- [Nunjucks](https://mozilla.github.io/nunjucks/) for HTML templating
- [Jest](https://jestjs.io/) for testing our code

### Building

To build the production version of the project just run:

```shell
npm run build
```

This will run `webpack` with `--mode=production` flag passed. It will then generate all compiled assets in the `build` folder.

If you want to pre-render your site, run:

```shell
npm run prerender
```

To test a prerendered site on static server use a command line server. I use http-server and run the site with the following command:
```shell
http-server ./build
```

## Readme file

This is the main boilerplate file but each individual project should replace this one with `_README.md`
and tailor it based on your project needs.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Style guide

The style guide is defined in the docs so please consult them for more information.

## Plugins used

[vue-head](https://github.com/ktquez/vue-head) is used to dynamically add metadata

[Prerender SPA Plugin](https://github.com/chrisvfritz/prerender-spa-plugin/) is used for prerendering, [specifically the solution for Vue Router](https://github.com/chrisvfritz/prerender-spa-plugin/tree/master/examples/vue2-webpack-router)

### Contribute

See the [contributing docs](CONTRIBUTING.md).

## Licensing

[ISC](https://opensource.org/licenses/ISC) © AmazeRealise

