'use strict';

angular.module('mobilePrototype', ['ngCookies', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'oauth'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('splash', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('home', {
          url: '/home',
          templateUrl: 'app/home/home.html',
          controller: 'HomeCtrl'
      })
      .state('bad-callback', {
        url:'^/oauth/g/redirect?access_token&expires_in',
        controller: function($location, Storage, AccessToken, $stateParams, $http) {
          var token = { access_token: $stateParams.access_token, expires_at: $stateParams.expires_in }
          Storage.set('token', token);
          AccessToken.set();
          $location.path('/home');
          $location.replace();
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('tokenInjector');

  });
