'use strict';

angular.module('mobilePrototype', ['ngCookies', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
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
      });

    $urlRouterProvider.otherwise('/');
  })
;
