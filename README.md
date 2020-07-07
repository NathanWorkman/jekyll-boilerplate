# jekyll-boilerplate

Jekyll Boilerplate is my personal starter for kicking out static sites with [Jekyll](https://jekyllrb.com/). JB uses [Gulp](https://gulpjs.com/) and [Webpack](https://webpack.js.org/) for the asset pipeline.

JB is setup to use [PostCSS](https://postcss.org/) and [Babel](https://babeljs.io/) for CSS and JavaScript compiling/transpiling.

## :exclamation: Prerequisites

I recommend using something like [Homebrew](https://brew.sh/), [rbenv](https://github.com/rbenv/rbenv) and [nvm](https://github.com/nvm-sh/nvm) to mangage your project environments and dependencies.

Instructions for installing:

- Install Homebrew [here](https://brew.sh/#install)
- Install rbenv [here](https://github.com/rbenv/rbenv#installation)
- Install nvm [here](https://github.com/nvm-sh/nvm#install--update-script)

🤠 _If you're a cowboy go ahead and get started below._ 🤠

## :gear: Setup

```shell
# Clone this repo
git@github.com:NathanWorkman/jekyll-boilerplate.git

cd jekyll-boilerplate

# If using rbenv and nvm the .ruby-version and .nvmrc files should load
# the correct Ruby and Node.js versions..if not..
rbenv init && nvm use

# Install project dependencies
bundle install && yarn install
```

## :construction_worker: Development

To start developing your site use:

```shell
yarn dev
```

This will generate your static assets, build your jekyll site in incremental mode, and launch the project in your browser via browser-sync.

## :package: Production

```shell
# Build the project
yarn build
```

### Jekyll Plugins

- [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) - Jekyll SEO Tag.
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) - Silently generate a sitemaps.org compliant sitemap for your Jekyll site.
- [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2) - Pagination gem built specially for Jekyll 3 and newer.
- [jekyll-archives](https://github.com/jekyll/jekyll-archives) - Automatically generate post archives by dates, tags, and categories.
- [jekyll-asset-path-plugin](https://github.com/samrayner/jekyll-asset-path-plugin) - Output a relative URL for assets based on the post or page.
- [jekyll-feed](https://github.com/jekyll/jekyll-feed) - A Jekyll plugin to generate an Atom (RSS-like) feed of your Jekyll posts.
