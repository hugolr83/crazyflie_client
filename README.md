# client

Code client web

## Getting started

### Setup the GitLab Private NPM repository
Add a `.npmrc` file within the client directory with the following content:
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

### Development

        cd client
        npm install
        npm start

### Docker

Build docker

        docker build --tag <tag_name> .

Run docker

        docker run -d -p 4200:4200 <tag_name>
