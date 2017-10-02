(function() {
	angular.module('ngAuth').service('AuthService', ['$http', '$cookies', AuthService]);

	function AuthService($http, $cookies) {
		var svc = this;

		var loginUrl = 'api/account/LoginAccount';
		var logoutUrl = 'api/account/LogoutAccount';
		var checkNameUrl = 'api/account/CheckName';
		var checkEmailUrl = 'api/account/CheckEmail';
		var resetPassUrl = 'api/account/ResetPassword';
		var resetEmailUrl = 'api/account/ResetEmail';
		var registerUrl = 'api/account/Register';

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