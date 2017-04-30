import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import scrypt from 'js-scrypt';
 
export default class LoginCtrl extends Controller {
  login() {
    if (_.isEmpty(this.username)) return;
    if (_.isEmpty(this.password)) return;

    // Yaaaay! This seems to work!
    // TODO: Tune the scrypt parameters to be the same as Keybase's
    // (see https://www.npmjs.com/package/js-scrypt)
    var resultBuffer = scrypt.hashSync('pwd', 'salt');
    this.$log.info('scrypt: ' + resultBuffer);
 
    // TODO: derive pdpka4 and 5 from scrypt(password)
    // TODO: send HTTPS POST request w/ username and pdkpa's
    // TODO: get the session cookie and save it

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
