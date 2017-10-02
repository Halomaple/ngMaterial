(function() {
	angular.module('ngAuth').controller('LoginController', ['$state', 'AuthService', 'UserService', LoginController]);

	function LoginController($state, AuthService, UserService) {
		var vm = this;
		vm.email = '';
		vm.password = '';
		vm.errorMsg = '';
		vm.hasEnterEmail = false;
		vm.emailNotExist = false;

		vm.checkEmail = function() {
			if (!vm.email || vm.email.length === 0)
				vm.hasEnterEmail = true;

			AuthService.checkEmail(vm.email).then(function(res) {
				if (res.data.status == 'failed') {
					vm.emailNotExist = true;
				}
			}, function() {

			});
		};

		vm.checkLegalEmail = function() {
			vm.hasEnterEmail = true;
		};

		vm.resetCheck = function() {
			vm.emailNotExist = false;
		};

		vm.login = function() {
			var loginData = {
				email: vm.email,
				password: vm.password
			};
			AuthService.userLogin(loginData).then(function(res) {
				if (res.data.status == 'success') {
					loginData.name = res.data.name;
					UserService.setUserInfo(loginData);
					$state.go('exchanges');
				} else if (res.data.status == 'failed') {
					vm.errorMsg = "Password incorrect, please try again.";
				}
			}, function() {});
		};
	}
})();