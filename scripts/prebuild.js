#!/usr/bin/env node

// Hack to use real environment variables
// https://github.com/angular/angular-cli/issues/4318#issuecomment-293829342

require('dotenv').config()
const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const environmentFilesDirectory = path.join(__dirname, '../src/environments');
const targetEnvironmentTemplateFileName = 'environment.ts.template';
const targetEnvironmentFileName = 'environment.ts';
const targetEnvironmentProdFileName = 'environment.prod.ts';

// Define default values in case there are no defined ones,
// but you should define only non-crucial values here,
// because build should fail if you don't provide the correct values
// for your production environment
const defaultEnvValues = {
  PRODUCTION: false,
  API_URL: 'http://localhost:3000',
  UI_URL: 'http://localhost:8081',
  AUTH0_CLIENT_ID: 'mock-auth0-client-id',
  AUTH0_CLIENT_DOMAIN: 'mock-auth0-client-domain',
  AUTH0_AUDIENCE: 'mock-auth0-audience'
};

// Load template file
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentTemplateFileName),
  {encoding: 'utf-8'}
);

// Generate output data
const output = ejs.render(environmentTemplate, Object.assign({}, defaultEnvValues, process.env));

// Write environment files
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), output);
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentProdFileName), output);

process.exit(0);
