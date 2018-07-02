var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname+"")).listen(config.port, function () {
    console.log("Server running...");
});
