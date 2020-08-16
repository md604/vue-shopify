# vue-shopify

### Project's structure

/src - folder that contains Shopify theme files

/config.yml.example - rename this file to config.yml and add parameters for your shopify store

/gulpfile.js - main script that compiles source files and uploads them to the server

/package.json - project config file

/webpack.config.js - webpack main config file

/babel.config.js - babel-specific config file


### Prerequisites

This project is based on a free shopify theme "Debut". 
Install this theme into your shop and then configure config.yml file to point at this theme.
Also this project requires a yarn package manager. 

### How to start

"yarn install" - install all dependencies

"gulp deploy" - upload project files to Shopify server

"gulp watch" - start watching for changes and recompile updated files 

