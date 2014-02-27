# Sails Connect Mincer
---

Sails-Connect-Mincer is simply Sails.js with a Ruby on Rails-like asset pipeline (using [connect-mincer](https://github.com/clarkdave/connect-mincer)). It supports everything (mincer)[https://github.com/nodeca/mincer] supports: SCSS, LESS, Stylus, Jade, HAML, and EJS.

#### Features
The advantages of using connect-mincer compared to sails's built-in asset manager includes:
- **Bust Caching**: All assets are fingerprinted using an MD5 hash, so if an asset changes, the filename also changes (in production).
- **Asset Helpers**: Referencing assets is a breeze with built in asset helpers such as `<%- css('path/to/asset') %>` and `<%- js('path/to/js') %>`
- **Directives**: You can require files and whole directories of js/coffeescript in a single file.
- **Multiple Loaders**: Instead of having just one minified and concatenated js file as defined by any assets in linker, you can have as many as you want via directives.

---

#### Install
- Clone the repo
- `cd` into the directory
- `npm install`
- `sails lift`

---

#### Deploying
Depploying for production requires an extra precompilation step compared to sails js:
- `cd` into the directory
- `npm install`
- `grunt prod`
- Start the app

---

#### Files touched
Sails Connect Mincer doesn't depart from sails in any major way, and really, only two files were introduced, and one file changed:
- Created `config/express.js` which simple introduces the connect-mincer middleware
- Created 'precompile.js' which precompiles the assets for production
- Updated `Gruntfile.js`. Simply now cleans the asset folder and runs the precompile script. MUch cleaner IMO

There are also some example less, stylus, sass, and coffeescript files that are being loaded in `views/layout.ejs'.


