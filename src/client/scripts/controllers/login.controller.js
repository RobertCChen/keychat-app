import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import scrypt from 'scryptsy';
 
export default class LoginCtrl extends Controller {
  sendLoginHttpRequest(username, password) {
    // The scrypt parameters here are the same as Keybase's
    var N = 32768;
    var r = 8;
    var p = 1;
    var len = 256;

    // TODO: Keybase and CORS. We'll be running on mobile, so why can't we test this from localhost in the browser?
    // https://github.com/keybase/keybase-issues/issues/620
    // https://github.com/keybase/keybase-issues/issues/1959
    // https://github.com/keybase/keybase-issues/issues/625

    // Q: What is the pdpka_login parameter? It doesn't seem to be documented in getsalt docs
    // A: I see it used here: https://github.com/keybase/libweb/blob/master/src/hilevel/account.iced
    var apiUrl = 'https://keybase.io/_/api/1.0/getsalt.json?email_or_username=' + username + '&pdpka_login=true';

    // query the API
    HTTP.get(apiUrl, function(err, result) {
      if(err) {
        console.log("error in HTTP.get callback: " + err);
        return
      }

      console.log("result is " + result.content);

      var salt = JSON.parse(result.content).salt;
      console.log("salt is " + salt);

      var login_session = JSON.parse(result.content).login_session;
      console.log("login_session is " + login_session);

      // TODO: check we're logged in from response (example of bad login response: result is {"status":{"code":100,"desc":"bad username or email","fields":{"email_or_username":"bad username or email"},"name":"INPUT_ERROR"}}

      var bytes = [];
      for(var i=0; i< salt.length-1; i+=2) {
          bytes.push(parseInt(salt.substr(i, 2), 16));
      }
      var binarySalt = String.fromCharCode.apply(String, bytes);
      var passwordStream = scrypt(password, binarySalt, N, r, p, len);
      this.$log.info('scrypt: ' + resultBuffer);

      // TODO: derive pdpka4 and 5 from scrypt(password)
      // TODO: send HTTPS POST request w/ username and pdkpa's
      // TODO: get the session cookie and save it
    });
  }

  login() {
    if (_.isEmpty(this.username)) return;
    if (_.isEmpty(this.password)) return;

    this.sendLoginHttpRequest(this.username, this.password);

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
