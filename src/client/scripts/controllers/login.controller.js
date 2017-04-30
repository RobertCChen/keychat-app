import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
// FIXME: so meteor is detecting the package correctly, but for some reason it's not able to pickup the scrypt.node binary from scrypt/Release
//import 'scrypt';
//import scrypt from 'scrypt';
//import { scrypt } from 'scrypt';
 
export default class LoginCtrl extends Controller {
  login() {
    if (_.isEmpty(this.username)) return;
    if (_.isEmpty(this.password)) return;
 
    // TODO: derive pdpka4 and 5 from password
    // TODO: send HTTPS POST request w/ username and pdkpa's
    // TODO: get the session cookie and save it

    // EHH WHAT TO PUT HERE?? scrypt.hashSync();
    
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
