(function() {
  "use strict";
  console.log('Precompiling...');

  var Mincer = require('mincer'),
      nib = require('nib'),
      mountPoint = '/assets',
      env;

  env = new Mincer.Environment('./');

  // If you're using stylus, we must configure it
  Mincer.StylusEngine.configure(function(style) {
    style.set('include css', true)
    style.set('compress', true)
    style.use(nib());
  });

  env.appendPath('assets');

  // Register any helpers we use
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
    console.info('Finished precompile:');
  });
}());