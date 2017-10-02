(function() {
	'use strict';

	angular.module('ngAuth').service('UserService', ['$cookies', UserService]);

	function UserService($cookies) {
		var svc = this;

		svc.userInfo = {
			name: function() {
				return $cookies.get('name');
			},
			email: function() {
				return $cookies.get('email');
			},
			password: function() {
				return $cookies.get('password');
			}
		};

		svc.setUserInfo = function(user) {
			$cookies.put('name', user.name);
			$cookies.put('email', user.email);
			$cookies.put('password', user.password);
		};

		svc.clearUserInfo = function() {
			$cookies.remove('name');
			$cookies.remove('email');
			$cookies.remove('password');
		};

		svc.isUserLogin = function() {
			return svc.userInfo.name() != null && svc.userInfo.email() != null && svc.userInfo.password() != null;
		};
	}
})();