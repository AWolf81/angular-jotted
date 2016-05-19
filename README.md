# What is JottedJs?

[Jotted](https://github.com/ghinda/jotted) is a javascript playground like 
jsFiddle, jsbin, plunkr etc. for self-hosting.

# Live demo

Please have a look at this [jsfiddle](https://jsfiddle.net/awolf2904/79z5o7sf/)
to see the directive in action.

# Why I've created a wrapper directive for Jotted?

- easier integration in existing AngularJs projects just add `<jotted/>` and
  `angular.module('yourApp', ['aw-jotted'])`.
- better data handling (e.g. add the snippets to localstorage or to
  a database is very easy)
- extending Jotted with addional features like loading/saving Gists etc. is no
  big deal.

# Required dependencies

(Dependencies will be reduced soon because setup is too complicated at the 
moment.)

- AngularJs
- Codemirror and some addons
- Jotted
- Marked (will be removed later)
- AngularMarked (will be removed later)
- AngularUiBootstrap (will be replaced with a lightweight popover library
  bundled into the library)

# Usage
Add `angular.module('yourApp', ['aw-jotted'])` to your app as dependency.

In you markup add:

    <jotted config="yourConfig"></jotted>

And in your controller
    
    $scope.yourConfig = {
        files: [{
            type: 'css',
            content: ''
        },
        {
            type: 'js',
            content: 'console.log(\'Hello world\');'
        }, 
        {
            type: 'html',
            content: '<h1>Demo</h1>'
        }]
    }

# Status of the directive

This directive is very alpha and under heavy development.

# Todos

- Check UMD loading (JSfiddle setup was hard to create, needed to use requireJS)
- Add Gist selection by user with Description and Url as selection
- Gist loading (working by entering an ID, needs to be improved)
- Gist saving (not added yet) --> save to a public gist
- Concat mutliple js files into JS pane
- Reduce dependencies --> only Jotted, Angular & Codemirror
- Reduce stylesheets of the library
- Add unit tests

# Project setup from Webpack library starter

For the setup of this project I've used 
[webpack-library-starter](https://github.com/krasimir/webpack-library-starter)
