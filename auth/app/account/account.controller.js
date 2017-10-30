(function() {
	'use strict';
	angular.module('ngAuth').controller('AccountController', ['$state', 'AuthService', 'UserService', AccountController]);

	function AccountController($state, authService, userService) {
		var vm = this;

		vm.name = userService.userInfo.name();
		vm.email = userService.userInfo.email();
		vm.preEmail = userService.userInfo.email();
		vm.password = userService.userInfo.password();
		vm.repassword = userService.userInfo.password();
		vm.emailInvalid = false;
		vm.profileModified = false;

		vm.checkEmail = function() {
			if (vm.email === vm.preEmail)
				return;

			authService.checkEmail(vm.email).then(function(res) {
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

		vm.passwordIdentical = function() {
			return vm.password === vm.repassword;
		};

		vm.saveProfile = function() {
			var userInfo = {
				preEmail: vm.preEmail,
				name: vm.name,
				email: vm.email,
				password: vm.password
			};
			authService.saveProfile(userInfo).then(function(res) {
				if (res.data.status == 'success') {
					userService.setUserInfo(userInfo);
					vm.preEmail = userService.userInfo.email();
					vm.profileModified = false;
				}
			});
		};
	}
})();