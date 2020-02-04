This is the start of my personal site.

## Developing the mcsalter Theme

1. [Install Node.js](https://nodejs.org/en/)
2. Navigate to `/themes/mcsalter` in command line
3. Run `npm install` to download node modules
    * `npm install watch -g`
    * Some of the other CLIs might need to be installed globally too 🤷‍♀️ g&uuml;d luck
4. Run `npm run watch` to start watching your files, or `npm run thetaskname` to run a single task. `npm run` lists available tasks.

The theme is based off of [Blank](http://themes.gohugo.io/theme/blank/), a starter Hugo theme for developers. Use it to make your own theme.

## Running Hugo 

https://gohugo.io/getting-started/installing 
https://gohugo.io/getting-started/quick-start/

1. Install [Chocolatey](https://chocolatey.org/install) for Windows, or [Homebrew](https://brew.sh/) for Mac
2. Install Hugo `choco install hugo -confirm`, or `brew install hugo`
3. Run `hugo` in the root to build the `docs/` directory, or `hugo server -D` to build, serve, and keep watching for changes.
4. View at localhost:1313
    * Posts can be found at localhost:1313/post/POST-NAME

## Image Situation

Images exist in 3 differnt folders. You want to make modifications in `src/images/`.

When npm build:images is run, `src/images/` builds to => `static/images`.  
And when hugo -D is run `static/images` builds to => `docs/images`.