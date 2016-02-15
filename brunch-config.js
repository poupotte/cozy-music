exports.config = {
  npm: {
    enabled: true
  },

  files: {
    javascripts: {
      joinTo: '/public/app.js'
    },
    stylesheets: {
      joinTo: '/public/app.css'
    },
    templates: {
      joinTo: '/public/app.js'
    }
  },

  paths: {
    public: '.'
  }
};
