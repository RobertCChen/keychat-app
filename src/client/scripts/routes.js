import { Config } from 'angular-ecmascript/module-helpers';
 
import chatsTemplateUrl from '../templates/chats.html';
import chatTemplateUrl from '../templates/chat.html';
import tabsTemplateUrl from '../templates/tabs.html';
 
export default class RoutesConfig extends Config {
  configure() {
    this.$stateProvider
      .state('tab', { // TODO: What is this 'tab' name for?
        url: '/tab',
        abstract: true, // TODO: Abstract??
        templateUrl: tabsTemplateUrl
      })
      .state('tab.chats', { // TODO: naming again
        url: '/chats',
        views: {
          'tab-chats': { // TODO: we are naming this again?
            templateUrl: chatsTemplateUrl,
            controller: 'ChatsCtrl as chats', // TODO: 'chatsctrl' and 'chats'
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
      });
 
    this.$urlRouterProvider.otherwise('tab/chats');
  }
}
 
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

