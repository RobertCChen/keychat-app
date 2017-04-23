import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class LoginCtrl extends Controller {
  login() {
    if (_.isEmpty(this.username)) return;
    if (_.isEmpty(this.password)) return;
 
    Meteor.loginWithPassword(this.username, this.password, (err) => {
      if (err) return this.handleError(err);
      this.$state.go('profile');
    });
  }
 
  handleError(err) {
    this.$log.error('Login error ', err);
 
    this.$ionicPopup.alert({
      // TODO: Should remove err.reason for security: do not want to leak why login failed
      title: err.reason || 'Login failed',
      template: 'Please try again.',
      okType: 'button-positive button-clear'
    });
  }
}
 
LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
