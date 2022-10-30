# ONSC21PTAP4345-One-Source-Website-Start-Form-Update
Hive : https://app.hive.com/workspace/LesfQJq3QdeFPsc8j?actionId=hZTeppLCyuBqsjArD
=======================

## Features
- All generator-gulp-webapp features
- ES6
- Handlebars
- Inject SVG Sprites

## Dependecies
- Install [editorconfig](http://editorconfig.org)
- Use Node version **9.6.1**
- Yarn Go to`https://yarnpkg.com/en/docs/install` and follow the steps or `npm install -g yarn`
- Gulp: `npm install -g gulp`


## Getting Started
- Run `nvm use` to use the correct Node version
- Run `yarn install` to install Node dependencies
- Run `gulp serve` to preview and watch for changes
- Run `yarn add --save <package>` to install frontend dependencies
- Run `gulp` to build your webapp for production
- Run `gulp build --env [environment]` to build your webapp for any environment using their respectively configuration variables. Find them at appconfig folder. Execution example: `gulp build --env prod`
- Run `gulp serve:dist` to preview the production build

- Run `npm run dev` this will do the following:
    - Run `gulp serve` to preview and watch for changes

- Run `gulp php` to start PHP server.

- Run `npm run update-backend` this will do the following:
    - Run `gulp build` build frontend assets
    - Run `gulp copy` to copy all frontend assets into the backend directory

## Bootstrap Select
- Bootstrap select **v1.13.12** is part of this base project, to enable it please follow the steps:
    - Go to `app/styles/vendors/bootstrap/_bootstrap.scss`, uncomment: `@import 'scss/dropdown';`
    - Go to `app/styles/main.scss`, uncomment:
      ```
      @import 'sass/variables';
      @import 'sass/bootstrap-select';
      ```
    - Add the markup wherever you need it.
      ```
      <select class="selectpicker">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Barbecue</option>
      </select>
      ```
    - In case you need something specific please go to the oficial documentation: https://developer.snapappointments.com/bootstrap-select/

## Backend
- More information to come, this is more of a high level overview
- Install composer
- Navigate to the backend folder
- Run composer composer install --no-dev
