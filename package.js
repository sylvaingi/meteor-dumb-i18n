Package.describe({
  summary: "Dead simple I18n"
});

Package.on_use(function(api) {
  api.use([
    'deps',
    'handlebars'
  ], 'client');
  api.export('i18n');
  api.add_files('messages.js', 'client');
});