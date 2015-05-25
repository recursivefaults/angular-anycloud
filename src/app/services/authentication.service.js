'use strict';

angular.module('mobilePrototype').factory('tokenInjector', ['AccessToken', function(AccessToken) {
  var injector = {
    request: function(config) {
      console.log(config);
      if(AccessToken.get() !== null) {
        config.headers['Authorization'] = 'Bearer ' + AccessToken.get().access_token;
      }
      return config;

    }
  };
  return injector;
}]);
