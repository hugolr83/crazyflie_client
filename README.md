# Client

Code client web

## Getting started

### Setup the GitLab Private NPM repository

Add a `.npmrc` file within the root directory with the following content:

```text
@backend:registry=https://gitlab.com/api/v4/projects/29618275/packages/npm/
//gitlab.com/api/v4/projects/29618275/packages/npm/:_authToken=<Your Personal Access Token>
```

`<Your Personal Access Token>` needs to be replaced with a PAT that has the API scope. To create one:

1. Click your face on Gitlab
2. Go to Preferences
3. Click on Access Tokens on the left bar
4. Give it a name you like and check the api scope (read_repository and write_repository won't work)
5. Click on Create personal access token

Don't commit the file (it is already ignored) since the CI will inject one automatically

Make sure to enter the key that Gitlab created and not the Token name.

### Development

```shell
cd client
npm install
npm start
```

### Docker

Build docker

```shell
docker build --tag <tag_name> .
```

Run docker (but just use Docker Compose honestly)

```shell
docker run -d -p 8080:8080 <tag_name>
```

# Angular doc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
