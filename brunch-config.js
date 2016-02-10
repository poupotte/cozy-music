export const config = {
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
      defaultExtension: 'es6'
      joinTo: 'app.js'
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  }
};