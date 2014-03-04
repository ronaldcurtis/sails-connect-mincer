# Sails Connect Mincer

Sails-Connect-Mincer is simply Sails.js with a Ruby on Rails-like asset pipeline (using [connect-mincer](https://github.com/clarkdave/connect-mincer)). It supports everything [mincer](https://github.com/nodeca/mincer) supports: Coffeescript, SCSS, LESS, Stylus, Jade, HAML, and EJS.

#### Features
The advantages of using connect-mincer compared to sails's built-in asset manager includes:
- **Bust Caching**: All assets are fingerprinted using an MD5 hash, so if an asset changes, the filename also changes (in production).
- **Asset Helpers**: Referencing assets is a breeze with built in asset helpers such as `<%- css('path/to/asset') %>` and `<%- js('path/to/js') %>`
- **Directives**: You can require files and whole directories of js/coffeescript in a single file.
- **Multiple Loaders**: Instead of having just one minified and concatenated js file as defined by any assets in the [linker](http://sailsjs.org/#!documentation/assets) folder, you can have as many as you want via directives.

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
- `grunt production`
- Start the app

---

#### Files touched
Sails Connect Mincer doesn't depart from sails in any major way, and at its core, only two files were introduced, and one file changed:
- Created `config/express.js` which simply introduces the connect-mincer middleware.
- Created `precompile.js` which precompiles the assets for production.
- Updated `Gruntfile.js`. Simply now cleans the `.tmp` folder and runs the precompile script. Much cleaner.

There are also some example less, stylus, sass, and coffeescript files that are being loaded in `views/layout.ejs`.

---

#### Asset helpers
Several asset helper functions are available in your views and assets.
- `<%- css('styles/file.css', {opts}) %>` Outputs a `<link>` tag pointing to the stylesheet. Extra object parameter for more element attributes, eg `<%- css('css/file.css', {'media': 'print'}) %>`
- `<%- js('js/app.js', {opts}) %>` Outputs a `<script>` tag pointing to the js file. Extra object parameter for more element attributes.
- `<%= asset_path('path/to/asset') %>` outputs a string referencing the asset.

The jade equivalent of the above:
- `!= css('styles/file.css')`
- `!= js('js/file.js')`
- `#{asset_path('styles/file.css')}`

##### Referencing assets within stylesheets
You will need to use the `asset_path` helper in stylesheets if you want to reference assets such as images and fonts. You will need to add the `.ejs` extension for scss, less, coffeescript etc.

**Example 1**: `assets/styles/example.stylus`:
```
body
  background: url(asset_path('path/to/some/image.jpg')) no-repeat 0 0
```

**Example 2**: `assets/styles/example.scss.ejs`:
```
body {
	background: url(<%= asset_path('path/to/image.jpg')%>) no-repeat 0 0;
}
```

See [connect-mincer](https://github.com/clarkdave/connect-mincer) for more details.

---

#### Using Directives
You can use directives to require other files. See [mincer](https://github.com/nodeca/mincer) for more details. An example is provided in `assets/js/loader.js`:

```
//= require ./socket.io
//= require ./sails.io
//= require ./app
//= require_tree ./foo
```


