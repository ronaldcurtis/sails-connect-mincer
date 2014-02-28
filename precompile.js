(function() {
  "use strict";
  console.log('Precompiling...');

  var Mincer = require('mincer'),
      CleanCss = require('clean-css'),
      uglify = require('uglify-js'),
      nib = require('nib'),
      mountPoint = '/assets',
      env;

  env = new Mincer.Environment('./');
  Mincer.StylusEngine.configure(function(style) {
    style.set('include css', true)
    style.set('compress', true)
    style.use(nib());
  });

  // Set compressors
  env.jsCompressor = 'uglify';
  env.cssCompressor = function(context, data) {
    var min = '';
    if (data) {
      min = new CleanCss().minify(data)
    }
    return min;
  }

  env.appendPath('assets');

  env.registerHelper('asset_path', function(name, opts) {
    var asset = env.findAsset(name, opts);
    if (!asset){
      throw Error("File [" + name + "] not found");
    }

    return mountPoint + '/' + asset.digestPath;
  });

  var manifest = new Mincer.Manifest(env, '.tmp/public/assets');
  manifest.compile(['*', '*/**'], function(err, data) {
    if(err){
      console.log(err);
      throw err;
    }
    console.info('Finished precompile.');
  });
}());