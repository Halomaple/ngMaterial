(function() {
	'use strict';
	angular.module('ngAuth').controller('RegisterController', ['$state', 'AuthService', 'UserService', RegisterController]);

	function RegisterController($state, AuthService, UserService) {
		var vm = this;
		vm.nameInvalid = false;
		vm.emailInvalid = false;

		vm.checkName = function() {
			AuthService.checkName(vm.name).then(function(res) {
				if (res.data.status == 'success')
					vm.nameInvalid = true;
			}, function() {});
		};

		vm.checkEmail = function() {
			AuthService.checkEmail(vm.email).then(function(res) {
				if (res.data.status == 'success')
					vm.emailInvalid = true;
			}, function() {});
		};

		vm.resetCheckStatus = function() {
			vm.nameInvalid = false;
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
					UserService.setUserInfo(user);
					$state.go('exchanges');
				} else {

				}
			}, function() {});
		};
	}
})();