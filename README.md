# jekyll-boilerplate

Jekyll Boilerplate is my personal starter for kicking out static sites with [Jekyll](https://jekyllrb.com/). JB uses [Webpack](https://webpack.js.org/) for the asset pipeline and it's setup to deploy to either Netlify or AWS S3. PostCSS, node-sharp, babel, live-reload, ..., ..., etc

## :gear: Setup

I recommend using something like [Homebrew](https://brew.sh/), [rbenv](https://github.com/rbenv/rbenv) and [nvm](https://github.com/nvm-sh/nvm) to mangage your project environments and dependencies.

Instructions for installing:

- Install Homebrew [here](https://brew.sh/#install)
- Install rbenv [here](https://github.com/rbenv/rbenv#installation)
- Install nvm [here](https://github.com/nvm-sh/nvm#install--update-script)

🤠 _If you're a cowboy get started below._ 🤠

### Running the boilerplate

```shell
# Clone this repo
git@github.com:NathanWorkman/jekyll-boilerplate.git

cd jekyll-boilerplate

# If using rbenv and nvm the .ruby-version and .nvmrc files should load
# the correct Ruby and Node.js versions..if not..
rbenv init && nvm use

# Install project dependencies
bundle install && npm install

# Run the project
npm run dev
```

### Structure

```

```

## To-Do

[ ] Setup Webpack Asset Pipeline
[ ] PostCSS
[ ] Babel
[ ] Etc
