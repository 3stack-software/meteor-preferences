Package.describe({
  name: '3stack:preferences',
  version: '0.1.0',
  summary: 'Non-reactive user preference system. Backed by local-storage.',
  git: 'https://github.com/3stack-software/meteor-preferences',
  documentation: 'README.md'
});


Package.onUse(function(api){
  api.versionsFrom('METEOR@0.9.2');

  api.use(['coffeescript','ejson', 'logging'], 'client');

  api.export('Preferences', 'client');

  api.addFiles('Preferences.coffee', 'client');
});
