import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class RegisterCtrl extends Controller {
  register() {
    if (_.isEmpty(this.username)) return;
    if (_.isEmpty(this.password)) return;
    if (_.isEmpty(this.passwordagain)) return;
    if (this.passwordagain !== this.password) return;
 
    // TODO: am i logged in after this?
    Accounts.createUser({ username: this.username, password: this.password }, (err) => {
      if (err) return this.handleError(err);
      this.$state.go('profile');
    });
  }
 
  handleError(err) {
    this.$log.error('Registration error ', err);
 
    this.$ionicPopup.alert({
      title: err.reason || 'Registration failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
 
RegisterCtrl.$name = 'RegisterCtrl';
RegisterCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
