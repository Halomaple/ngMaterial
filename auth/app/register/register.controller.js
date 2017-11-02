(function() {
	'use strict';
	angular.module('ngAuth').controller('RegisterController', ['$state', 'AuthService', 'UserService', RegisterController]);

	function RegisterController($state, AuthService, UserService) {
		var vm = this;
		vm.emailInvalid = false;

		vm.checkEmail = function() {
			AuthService.checkEmail(vm.email).then(function(res) {
				if (res.data.status == 'success')
					vm.emailInvalid = true;
			});
		};

		vm.resetCheckStatus = function() {
			vm.emailInvalid = false;
		};

		vm.confirmingPassword = function() {
			return vm.password.indexOf(vm.repassword) > -1;
		};

		vm.passwordIdentical = function(){
			return vm.password === vm.repassword;
		};

		vm.registerUser = function() {
			var user = {
				name: vm.name,
				email: vm.email,
				password: vm.password
			};

			AuthService.register(user).then(function(res) {
				if (res.data.status == 'success') {
					alert('Registered!');
					$state.go('login');
				}
			});
		};
	}
})();