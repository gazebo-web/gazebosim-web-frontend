## Gazebosim Web Frontend

* Framework: Angular
* CI: Github actio
* CD: GitLab actiosn + AWS CloudFront

## Quickstart

### One-time setup

1. Clone this repo and move to the clone:

        git clone https://github.com/gazebo-web/gazebosim-web-frontend
        cd web

1. This repository comes with an example `setup.bash` file which works with the
   API at https://staging-api.gazebosim.org. Edit that file with
   your own Auth0 and backend information. Always remember to source this file
   before serving:

       . setup.bash

1. Install (be sure you have `npm` and `nodejs` version 8)

        nvm use 16
        npm install

### Serve for development

    npm start

### Build for production

    npm run build

## Deployment

Deployment of this project has moved to the
[gazebosim/docs](https://github.com/gazebosim/docs) project.

## Tests

To run tests, use the following command:

`npm run test`

The results can be seen in the console. You can also check the generated coverage in `./coverage/html/index.html`.

In order to see `console.log` lines, you need to modify `./config/karma.conf.js` to `captureConsole=true`.

## Docs

We use [Typedoc](http://typedoc.org/) to generate documentation. You can generate it with the following command:

`npm run docs`

You can access the generated docs in `./doc/index.html`.

## Naming conventions

Following the [Angular Style Guide](https://angular.io/guide/styleguide), we use the `gz` preffix for the selector of our Components and Directives.


## Acknowledgments

The Angular single page app in this project uses code from https://github.com/rafgraph/spa-github-pages to deploy with Github Pages.
