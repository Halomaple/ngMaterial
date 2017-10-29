var http = require('http');
var fs = require('fs');
var url = require('url');

const port = 8200;

var demoAccounts = [{
		name: 'demo',
		username: 'demo@demo.com',
		password: 'demodemo'
	}, {
		name: 'demo1',
		username: 'demo1@demo.com',
		password: 'demodemo'
	}, {
		name: 'demo2',
		username: 'demo2@demo.com',
		password: 'demodemo'
	}],
	loginAccounts = [];

http.createServer(function(request, response) {
	accountProcessor(request, response);
}).listen(port, function(err) {
	if (err)
		return console.log('listen error', err);
	console.log('server is listening on:', port);
});

function accountProcessor(request, response) {
	var rawUrl = url.parse(request.url);
	switch (rawUrl.pathname) {
		case '/CheckEmail':
			checkEmailExistence(rawUrl, response);
			break;

		case '/LoginAccount':
			loginAccount(request, response);
			break;

		case '/LogoutAccount':
			logoutAccount(rawUrl, response);
			break;
	}
}

function checkEmailExistence(rawUrl, response) {
	var username = rawUrl.search.split('=')[1],
		usernameMatched = false,
		result = {};

	demoAccounts.forEach(function(d) {
		if (d.username == username) {
			usernameMatched = true;
		}
	});

	if (usernameMatched) {
		result.status = 'success';
		console.error('Username ' + username + ' matched.');
	} else {
		result.status = 'failed';
		console.info('Username ' + username + ' does not exist.');
	}

	responseResult(response, result);
}

function loginAccount(request, response) {
	var bodyStr = '',
		result = {};

	request.on('data', function(chunk) {
		bodyStr += chunk.toString();
	});

	request.on('end', function() {
		var accoutInfo = JSON.parse(bodyStr);
		var accountMatched = false;
		demoAccounts.forEach(function(d) {
			if (d.username == accoutInfo.email && d.password == accoutInfo.password) {
				accoutInfo.name = d.name;
				accountMatched = true;
			}
		});

		if (accountMatched) {
			result.status = 'success';
			result.name = accoutInfo.name;
			loginAccounts.push(accoutInfo);
			console.info('login success.');
		} else {
			result.status = 'failed';
			console.error('login failed.');
		}

		responseResult(response, result);
	});
}

function logoutAccount(rawUrl, response) {
	var username = rawUrl.search.split('=')[1],
		usernameMatched = false,
		result = {};

	var currentAccountIndex;
	loginAccounts.forEach(function(a, i) {
		if (a.email == username)
			currentAccountIndex = i;
	});

	if (currentAccountIndex >= 0) {
		loginAccounts.splice(currentAccountIndex, 1);
		result.status = 'success';
	} else {
		result.status = 'failed';
	}

	responseResult(response, result);
}

function responseResult(response, result) {
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});
	response.end(JSON.stringify(result));
}