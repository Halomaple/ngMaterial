var app = angular.module('ngAuth', [
	'ui.router',
	'ngCookies',
	'ngAria',
	'ngAnimate',
	'ngMessages',
	'ngMaterial',
	'ngAuth.templates'
]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/about');
	$stateProvider.state({
			name: 'about',
			url: '/about',
			templateUrl: 'about/about.html',
		}).state({
			name: 'loginSuccess',
			url: '/loginSuccess',
			templateUrl: 'login/loginSuccess.html',
		}).state({
			name: 'logoutSuccess',
			url: '/logoutSuccess',
			templateUrl: 'login/logoutSuccess.html',
		}).state({
			name: 'login',
			url: '/login',
			templateUrl: 'login/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
		.state({
			name: 'register',
			url: '/register',
			templateUrl: 'register/register.html',
			controller: 'RegisterController',
			controllerAs: 'vm'
		});
});

(function() {
	'use strict';
	angular.module('ngAuth').controller('HeaderController', ['$state', 'AuthService', 'UserService', HeaderController]);

	function HeaderController($state, AuthService, UserService) {
		var vm = this;

		vm.name = UserService.userInfo.name;

		vm.isUserLogin = function() {
			return UserService.isUserLogin();
		};

		vm.userLogout = function() {

			AuthService.userLogout().then(function(res) {
				if (res.data.status == 'success') {
					UserService.clearUserInfo();
					$state.go('logoutSuccess');
					UserService.clearUserInfo();
				}
			}, function(err) {});
		};
	}
})();