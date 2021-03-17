# Hugo Project Template Repo

This template repo should be used upon starting a new Hugo Project. It uses our own modules and project structure plus loads some useful templates.

## Setup

### 1. Download Hugo binary:
1. Update Package.json "hugo.version" key with latest or desired Hugo Version symver. Warning: It should always match `netlify.toml`'s `HUGO_VERSION` environment variable.
2. `$ npm run gethugo`

### 2. Setup Hugo Module
Where `repo_url` is GitHub's repo url without protocole: Ex: `github.com/theNewDynamic/thenewdynamic.com` 
1. `$ REPO={repo_url} npm run modinit`

### 3. Install required NPM modules
1. `$ npm run modpack` to update package.json with Hugo Modules' required npm modules.
2. `$ npm install`

### 4. Languages Setup (follow even if not multilingual)

#### If not multilingual
1. Delete `content/fr`
2. Delete `config/config.fr.yaml`
3. Update `config/languages.yaml` to remove extra language settings

#### If indeed multilingual
1. Update `content/fr` dirname and files accordingly
2. Rename `config/config.fr.yaml` to secondary language code and evaluate use. (`config/config.es.yaml` )
3. Update `config/languages.yaml` with proper settings for secondary language

## NPM Scripts

- `$ npm run start`: Run Hugo in a local dev server environment -> http://localhost/1313.
- `$ npm run deploy`: Deploy site and process ressources.
- `$ npm run hugo-cms`: Runs NetlifyCMS and Hugo

## CSS

Project uses TND Styles module to manage TailwindCSS and fonts.

### Configurations

- Tailwind Configuration is at `assets/css/config/tailwind.config.js`.
- Purge Configuration is at `assets/css/config/tailwind.config.js`.
- See `assets/css/tailwind/utilities.css` for declaring Tailwind custom utilities.

### CSS Files
`assets/css/style.scss` holds all relative imports. 
SCSS syntax can be used in any files alongside Tailwind's own methods. `@apply` etc...

### Font files
Font files should live under `assets/fonts`. The TND Style module will handle every thing fonts from `@fontface` decleration to preloading.
User should declare fonts using the TND Styles Module API in its section of the `/config/params.yaml` file. See https://github.com/theNewDynamic/hugo-module-tnd-styles#fonts

## JS
Javascripts is built with Hugo's `js.Build` and can handle `jsx` as long as all the files' extension are `jsx`.

### JS Files
`assets/js/index.js` holds the relative imports.

## Assets Processing

All assets are built by Hugo, their subsequent tags are loaded using the TND Styles module solution.

`$ npm run deploy` will process the assets and commit style related resources so that `production` does not compile the assets. (Thus gaining a good 3s of PostCSS)

## Multilingual

The template is setup as Multilingual. Check the `config/languages.yaml` file to remove/edit other languages.

String translations are handled via the `i18n`.

## imgix

We're using TND Imgix Hugo Module and using it's UX.

See [Settings](https://github.com/theNewDynamic/hugo-module-tnd-imgix#settings) and [GetSRC function](https://github.com/theNewDynamic/hugo-module-tnd-imgix#getsrc)
