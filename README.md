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

The `staging` branch in this repository is used to deploy this website to
https://staging.gazebosim.org. The `production` branch in this repository is
used to deploy this website to `https://gazebosim.org`.

Github actions will automatically deploy `staging` on push. The `production`
branch will only deploy when an authorized user approves the deployment on
the Github Actions UI.

There is no rule about how a release should be made. A person with sufficient
access can choose between direct commits or pull requests.

### Internal configuration

The application stores connection info in a JSON file, `app_config.json`. The key-value pairs are as follows:

* `AWS_REGION`: the AWS region code, e.g. 'us-west-2'
* `STARTUP_SIGNUP_TABLE`: the name of the DynamoDB table where the app stores
signup data (e.g. `my-ddb-table`)
* `NEW_SIGNUP_TOPIC`: The [ARN](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) of the SNS topic that the app uses to send notifications (e.g. `arn:aws:sns:us-west-2:123456789012:my-supercool-app`)

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
