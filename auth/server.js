var http = require('http');
var fs = require('fs');
var url = require('url');

var port = 8200;
var demoAccountsFilePath = './demoAccounts.json';
var demoAccounts = JSON.parse(fs.readFileSync(demoAccountsFilePath, 'utf8')).accounts;
var loginAccounts = [];

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

		case '/SaveProfile':
			saveProfile(request, response);
			break;
	}
}

function checkEmailExistence(rawUrl, response) {
	var email = rawUrl.search.split('=')[1],
		emailMatched = false,
		result = {};

	demoAccounts.forEach(function(d) {
		if (d.email == email) {
			emailMatched = true;
		}
	});

	if (emailMatched) {
		result.status = 'success';
		console.error('Username ' + email + ' matched.');
	} else {
		result.status = 'failed';
		console.info('Username ' + email + ' does not exist.');
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
		var accountsLength = demoAccounts.length;

		for (var i = 0; i < accountsLength; i++) {
			if (demoAccounts[i].email == accoutInfo.email && demoAccounts[i].password == accoutInfo.password) {
				result.status = 'success';
				result.name = demoAccounts[i].name;
				loginAccounts.push(demoAccounts[i]);
				console.info('login success.', result);

				responseResult(response, result);
				break;
			} else {
				result.status = 'failed';
				console.error('login failed.');
				responseResult(response, result);
				break;
			}
		}
	});
}

function logoutAccount(rawUrl, response) {
	var email = rawUrl.search.split('=')[1],
		emailMatched = false,
		result = {};

	var currentAccountIndex;
	loginAccounts.forEach(function(a, i) {
		if (a.email == email)
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

function saveProfile(request, response) {
	var bodyStr = '',
		result = {};

	request.on('data', function(chunk) {
		bodyStr += chunk.toString();
	});

	request.on('end', function() {
		var accoutInfo = JSON.parse(bodyStr);
		var accountsLength = demoAccounts.length;

		for (var i = 0; i < accountsLength; i++) {
			if (demoAccounts[i].email == accoutInfo.preEmail) {
				delete accoutInfo.preEmail;
				demoAccounts.splice(i, 1, accoutInfo);
				fs.writeFileSync(demoAccountsFilePath, JSON.stringify({
					'accounts': demoAccounts
				}), 'utf8');
				result.status = 'success';
				responseResult(response, result);
				break;
			} else {
				result.status = 'failed';
				responseResult(response, result);
				break;
			}
		}
	});
}

function responseResult(response, result) {
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});
	response.end(JSON.stringify(result));
}