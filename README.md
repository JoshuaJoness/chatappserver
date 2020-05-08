## IMPORTANT

This application requires a local connection with MongoDB.

Please follow the instructions at this link: https://zellwk.com/blog/local-mongodb/ to establish your local connection.

If you cannot get mongod to run, try running the script below in the console:

### `sudo brew services start mongodb-community`


## Starting the Server

In the project directory, first run:

### `npm install`

This installs all of you dependencies. Then run:

### `node index.js`

This will establish a connection with the server on port 4002. 

*Ensure nothing is running on port 4002.