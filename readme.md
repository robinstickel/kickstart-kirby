# KickStart Kirby with Gulp, BrowserSync and Livereload
A simple Gulp environment to kickstart development with Kirby CMS.

## What's included?
* PHP Server with BrowserSync and Livereload
* Compiles, autoprefixes, minifies and sourcemaps SASS
* Optimize images for production

## Installation
1. Download the latest version of [Kirby CMS](https://getkirby.com/downloads).
2. Download this project and drop **package.json** and **gulpfile.js** in the root folder of your Kirby project.
3. Install all required packages
```
npm install
```

## Running your project
Once you've gotten everything installed, you can use Gulp to run and build your project for deployment.

#### Running Your Project
```
gulp serve
```
This will start a new server to run your project and open a new browser window to load it. It also compiles your Sass if you're using any. BrowserSync is connected, so any changes you make to your Sass, CSS, or PHP files will reload the page.

#### Building Your Project
```
gulp build
```
This will build your final project for deployment. This includes compiling SASS, optimizing images, minifying CSS, creating sourcemaps and adding browser prefixes.

## Todo
* Include Javascript related tasks (concat, uglify, lint, ...)
* Create independent version for other Flat-File CMS

Feel free to contribute and let me know if you run into any troubles.

## Credits
This is an updated version of [Kirby Gulp Sync](https://github.com/austinprice/kirby-gulp-sync) by Austin Price. I had some errors running the original version and decided to create my own one.
