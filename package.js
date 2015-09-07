Package.describe({
  name: '3stack:preferences',
  version: '1.0.0',
  summary: 'A user preference system',
  git: 'https://github.com/3stack-software/meteor-preferences',
  documentation: 'README.md'
});


Package.onUse(function(api){
  api.versionsFrom('METEOR@0.9.2');

  api.use([
    'tracker',
    'reactive-var',
    'underscore',
    'logging'
  ], 'client');

  api.export([
    'MultiPreferenceStore',
    'PreferenceVar',
    'PreferenceDict'
  ], 'client');

  api.addFiles([
    'preference-dict.js',
    'preference-stores.js',
    'preference-var.js'
  ], 'client');
});
