import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Config, Runner } from 'angular-ecmascript/module-helpers';

import chatsTemplateUrl from '../templates/chats.html';
import chatTemplateUrl from '../templates/chat.html';
import registerTemplateUrl from '../templates/register.html';
import loginTemplateUrl from '../templates/login.html';
import profileTemplateUrl from '../templates/profile.html';
import settingsTemplateUrl from '../templates/settings.html';
import tabsTemplateUrl from '../templates/tabs.html';

class RoutesConfig extends Config {
  constructor() {
    super(...arguments);
 
    this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
  }
 
  configure() {
    this.$stateProvider
      .state('tab', { // TODO: What is this 'tab' name for?
        url: '/tab',
        abstract: true, // TODO: Abstract??
        templateUrl: tabsTemplateUrl,
        // NOTE: I guess this says we have to first wait for the user to be logged in
        // Also, I suppose that since this is an 'abstract' state, the other states like
        // 'tab.chats' will also wait?
        resolve: {
          user: this.isAuthorized,
          chats() {
            return Meteor.subscribe('chats');
          }
        }
      })
      .state('tab.chats', { // TODO: naming again
        url: '/chats',
        views: {
          'tab-chats': { // TODO: we are naming this again?
            templateUrl: chatsTemplateUrl,
            // NOTE: This is what you access the chats view (or controller) as in the template .html file
            controller: 'ChatsCtrl as chats',
          }
        }
      })
      .state('tab.chat', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: chatTemplateUrl,
            controller: 'ChatCtrl as chat'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: loginTemplateUrl,
        controller: 'LoginCtrl as logger'
      })
      .state('register', {
        url: '/register',
        templateUrl: registerTemplateUrl,
        controller: 'RegisterCtrl as register'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: profileTemplateUrl,
        controller: 'ProfileCtrl as profile',
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: settingsTemplateUrl,
            controller: 'SettingsCtrl as settings',
          }
        }
      });

    this.$urlRouterProvider.otherwise('tab/chats');
  }

  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

class RoutesRunner extends Runner {
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);
 
      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }
    });
  }
}
 
RoutesRunner.$inject = ['$rootScope', '$state'];
 
export default [RoutesConfig, RoutesRunner];
