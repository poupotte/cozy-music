exports.config = {
  npm: {
    enabled: true
  },

  plugins: {
    babel: {
      presets: ['es2015'],
      plugins: ["transform-es2015-modules-commonjs"]
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
      defaultExtension: 'jst',
      joinTo: 'app.js'
    }
  }
};
