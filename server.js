var connect = require('connect');
var serveStatic = require('serve-static');

var server_port = process.env.PORT || 7000;

connect().use(serveStatic(__dirname+"")).listen(server_port, function () {
    console.log("Server running...");
});
