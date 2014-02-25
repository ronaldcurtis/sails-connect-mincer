var connectMincer = require('connect-mincer'),
		nib = require('nib'),
    path = require('path'),
    mincer;

// Config for connect-mincer
// See https://github.com/clarkdave/connect-mincer for more details
mincer = new connectMincer({
  root: path.join(__dirname, '../'),
  production: process.env.NODE_ENV === 'production',
  mountPoint: '/assets',
  manifestFile: path.join(__dirname, '../.tmp/public/assets/manifest.json'),
  paths: ['assets/']
});

// Configure Stylus so it can import css files just like .styl files
// Also allows the use of nib (mixin library for stylus)
// See
mincer.Mincer.StylusEngine.configure(function(style) {
  style.set('include css', true);
  style.use(nib());
});

// Uncomment the lines below to configure Jade or Coffee 
// See http://nodeca.github.io/mincer for more details

// mincer.Mincer.JadeEngine.configure({});
// mincer.Mincer.CoffeeEngine.configure({});

module.exports = {
 express: {
    customMiddleware: function(app){
      app.use(mincer.assets());

      // Connect-mincer serves our assets in dev
      // We must precompile our assets before starting in production
      if (process.env.NODE_ENV !== 'production') {
        app.use('/assets', mincer.createServer());
      }
    }
  }
};