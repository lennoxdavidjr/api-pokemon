# api-pokemon

This project is an API that allows a user to retrive data about and mark individual Pokemon as favorites.

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

Pagination and filtering by favorite, name, and type are included :).

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

There is an included docker-compose file to allow for local development and testing for users that do not have, or do not wish to install, the mongo client. To instantiate this mongo instance, run ```docker-compose up``` prior to starting the application. Upon first time use of the ```docker-compose up``` command, the user may need to create the network. If you receive this message, simply run ```docker network create cloudbuild``` to create prior to calling ```docker-compose up``` a second time.

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

In the browser, a user will be able to test all endpoints via the included UI.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
