(function() {
	angular.module('ngAuth').service('AuthService', ['$http', '$cookies', AuthService]);

	function AuthService($http, $cookies) {
		var svc = this;

		var host_url = 'http://localhost:8200';

		var loginUrl = host_url + '/LoginAccount';
		var logoutUrl = host_url + '/LogoutAccount';
		var checkNameUrl = host_url + '/CheckName';
		var checkEmailUrl = host_url + '/CheckEmail';
		var resetPassUrl = host_url + '/ResetPassword';
		var resetEmailUrl = host_url + '/ResetEmail';
		var registerUrl = host_url + '/Register';

		svc.userLogin = function(loginData) {
			return $http.post(loginUrl, loginData);
		};

		svc.userLogout = function() {
			return $http.get(logoutUrl);
		};

		svc.checkName = function(name) {
			return $http.get(checkNameUrl + '?name=' + name);
		};

		svc.checkEmail = function(email) {
			return $http.get(checkEmailUrl + '?email=' + email);
		};

		svc.resetPassword = function(user) {
			return $http.post(resetPassUrl, user);
		};

		svc.resetEmail = function(user) {
			return $http.post(resetEmailUrl, user);
		};

		svc.register = function(user) {
			return $http.post(registerUrl, user);
		};
	}
})();