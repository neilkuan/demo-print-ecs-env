const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.35.0',
  defaultReleaseBranch: 'main',
  name: 'demo-print-ecs-env',
  gitignore: [
    'cdk.context.json',
    'venv',
    'venv/*',
  ],
});
project.synth();