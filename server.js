var connect = require('connect');
var serveStatic = require('serve-static');

var server_port = process.env.YOUR_PORT || process.env.PORT || 8000;
var server_host = process.env.YOUR_HOST || '127.0.0.1';

connect().use(serveStatic(__dirname+"")).listen(server_port, server_host, function () {
    console.log("Server running...");
});
