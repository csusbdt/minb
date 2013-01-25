minb project
============

## Files

`Procfile` 
- file read by Heroku's foreman command to start application

`.env` 
- variables exported into environment by foreman as first step when starting a local instance of the application

`main.js` 
- entry point of the server process.  
- contains initialization 

`router.js`
- routes requests to req handlers
- all request handlers start with `req_`

`req_root.js`
- handle requests matching `/`
- returns the minimized root html
- the root html loads the screen container

`req_screen_container.js`
- handle requests for the screen container
- the html is generated from a template at server startup
- includes script that defines `a.fbAppId` through template parameter `FB_APP_ID`

`req_file.js`
- handle requests for static content
- reads all files under the public folder into memory at server startup
- pre-generates the gzip versions of these files at server startup

`model.js`
- manage persistent application state
- encapsulates interactions with mongo database
- at server startup, checks for connectivity to database

`model_user.js`
- interface to the user document collection

## Design principles
- all static resources are cached for one year (a safe maximum)
- the client-side application runs in a single web page
- the application's web page is comprised of 3 layers:
  - root html
  - screen container 
  - screens
- the root html does the following:
  - contains the initial state of the client-side model, stored as `a.m`, if the request included a cookie with valid user credentials
  - loads jQuery
  - calls jQuery.load to load the screen container
- the screen container is an html fragment that is generated from a template at server startup with the following variables:
  - `FB_APP_ID` Facebook app id
- the screen container is cached for one year
- screens are html fragements that are loaded into a div within the screen container via jQuery's ajax load function
- the screen container uses jQuery's fadeIn and fadeOut to animate smooth transitions between screens

