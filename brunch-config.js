exports.config = {
  npm: {
    enabled: true,
    globals: {
      '_': 'underscore',
      '$': 'jquery'
    }
  },

  files: {
    javascripts: {
      joinTo: 'app.js'
    },
    stylesheets: {
      joinTo: 'app.css'
    },
    templates: {
      joinTo: 'app.js'
    }
  }
};
