var http = require('http');
var fs = require('fs');
var url = require('url');

const port = 8200;

var demoAccounts = [{
	username: 'demo@demo.com',
	password: 'password'
}];

http.createServer(function(request, response) {
	accountProcessor(request, response);
}).listen(port, function(err) {
	if (err)
		return console.log('listen error', err);
	console.log('server is listening on:', port);
});

function accountProcessor(request, response) {
	var rawUrl = url.parse(request.url),
		result = {};

	response.writeHead(200, {
		'Content-Type': 'application/json'
	});

	switch (rawUrl.pathname) {
		case '/CheckEmail':
			checkEmailExistence(rawUrl, result);
			break;
	}

	response.end(JSON.stringify(result));
}

function checkEmailExistence(rawUrl, result) {
	var username = rawUrl.search.split('=')[1],
		pass = rawUrl.search.split('=')[1],
		usernameMatched = false;

	demoAccounts.forEach(function(d) {
		if (d.username == username) {
			usernameMatched = true;
		}
	});

	if (usernameMatched) {
		result.status = 'success';
	} else {
		result.status = 'failed';
	}
}