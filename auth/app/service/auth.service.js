(function() {
	angular.module('ngAuth').service('AuthService', ['$http', '$cookies', AuthService]);

	function AuthService($http, $cookies) {
		var svc = this;

		var host_url = 'http://localhost:8200';

		var loginUrl = host_url + '/LoginAccount';
		var logoutUrl = host_url + '/LogoutAccount';
		var checkNameUrl = host_url + '/CheckName';
		var checkEmailUrl = host_url + '/CheckEmail';
		var saveProfileUrl = host_url + '/SaveProfile';
		var registerUrl = host_url + '/Register';

		svc.userLogin = function(loginData) {
			return $http.post(loginUrl, loginData);
		};

		svc.userLogout = function() {
			return $http.get(logoutUrl + '?email=' + $cookies.get('email'));
		};

		svc.checkName = function(name) {
			return $http.get(checkNameUrl + '?name=' + name);
		};

		svc.checkEmail = function(email) {
			return $http.get(checkEmailUrl + '?email=' + email);
		};

		svc.saveProfile = function(userInfoData){
			return $http.post(saveProfileUrl, userInfoData);
		};

		svc.register = function(userInfo) {
			return $http.post(registerUrl, userInfo);
		};
	}
})();