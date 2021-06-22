# MOLTON BROWN SHOPIFY PROJECT - STARTER THEME

This is a completely blank theme that gives you a blank canvas to start for Molton brown. 



## Create New Theme on Storefront

- New themes need to be uploaded to Shopify via a zip file.
- Run `npm install` to install dependencies
- Run `npm run build` to do your first build (this will give you the /dist folder which is required for the next step)
- Run `npm run zip` to create a folder called molton-brown-starter-theme.
- This command can be run with an extra argument for a custom name `npm run zip hello` will create hello.zip.
- Then under themes within the Shopify admin click the Upload theme button and select the zip file you just created



## Setup Config

- Copy setup.config.yml into a new file called config.yml `cp setup.config.yml config.yml`
- You'll need to set following:
  - password (API password)
  - theme_id
  - store (ex. store-name.myshopify.com)

  *This file is for your personal environment variables. Do not share with anyone and do not add to git repository.*



## Development Commands

- `npm run build`: Builds your files from the /src directory
- `npm run clean`: Remove everything from /dist folder
- `npm run deploy`: Builds files from /src directory then deploys them
- `npm run images`: Builds /src/images folder only
- `npm run start`: Builds all /src files, deploys them, opens store front end and watches files for changes
- `npm run static`: Builds /src/static files
- `npm run svg`: Builds /src/svg files
- `npm run watch`: Starts watching for file changes in /src
- `npm run test`: Open cypress test suite in a electron app/browser
- `npm run zip`: Creates a Zip file of your theme code in its current state.



## Developing Your Theme

When writing theme code, all code should be contained within the /src folder. Within /src there is a required file structure. Below we will take a look at that structure in detail.

```
src
  -images
  -liquid
    - config
    - layout
    - locales
    - sections
    - snippets
    - templates
  - scripts
    - index.js
    - checkout.js
  - static
  - styles
    - index.scss
    - checkout.scss
  - svg
```

### /src

This is the primary folder that node will look at when building your distribution code. Do not add new folders directly in /src. They will not be bundled with the rest of the code. This is because Shopify has a strict file structure and we are keeping built to compile to a Shopify accepted format.

### /src/images

Store all images here and they will be built to /dist/assets. This folder does not currently support subfolders

### /src/liquid

This is where standard Shopify files go. This includes locales and config folder, but excludes assets folder. Assets will be handled elsewhere.

### /src/liquid/config

This folder has the exact same restrictions as Shopify's native config folder.

### /src/liquid/layout

This folder has the exact same restrictions as Shopify's native layout folder.

### /src/liquid/locales

This folder has the exact same restrictions as Shopify's native locales folder.


### /src/liquid/sections

Unlike Shopify's native sections folder, this folder allows the use of sub-folders. This will allow us to better organize code as it grows. Make sure ALL files have unique names (whether they're in folders or not). On build, your subfolders will be "flattened" meaning the folders will be removed when being transferred to /dist. See the following example:

```
- src
  - sections
    - hello.liquid
    - goodbye.liquid
    - header
      - header-hello.liquid
      - header-foo.liquid
```

### /src/liquid/snippets

Unlike Shopify's native sections folder, this folder allows the use of sub-folders. This will allow us to better organize code as it grows. Make sure ALL files have unique names (whether they're in folders or not). On build, your subfolders will be "flattened" meaning the folders will be removed when being transferred to /dist. See the following example:

```
- src
  - snippets
    - hello.liquid
    - goodbye.liquid
    - header
      - header-hello.liquid
      - header-foo.liquid
```

### /src/liquid/templates

This folder has the exact same restrictions as Shopify's native templates folder.

### /src/scripts

All custom JavaScript should be written in this folder. For theme code, import into `theme.js`. Use of import/export (ES Modules) syntax is available. During the "scripts" task `theme.js` file will be generated and added to /dist/assets,

### /src/styles

All custom CSS should be written in this folder. This workflow uses SCSS as it's CSS preprocessor. For theme code, import into `theme.scss`. During "styles"" task `theme.css` file will be generated:  and added to /dist/assets`.

### /src/svg

Add SVGs to this file if you plan to use them in your liquid. When the "svg" task runs it will convert the files from this folder into liquid files, prepend "svg-" to the beginning of the name and build them to /dist/snippets. For SVGs that will not be used in liquid, add them to /src/images.
