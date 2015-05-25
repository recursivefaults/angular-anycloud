'use strict';

angular.module('mobilePrototype')
  .controller('HomeCtrl', ['$scope', '$resource', '$stateParams', '$rootScope', function($scope, $resource, $stateParams, $rootScope) {
    var hostName = 'http://localhost:8081'
    var ApiResource = $resource(hostName + '/', {}, {
      recent: {
        method: 'GET',
        url: hostName + '/recent?format=json',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      mine: {
        method: 'GET',
        url: hostName + '/mine?format=json',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      friends: {
        method: 'GET',
        url: hostName + '/friends?format=json',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      source: {
                method: 'GET',
                url: hostName + '/sources/:source/collections/:collection/entries?format=json',
                headers: {
                  'Content-Type': 'application/json'
                }
      },
      register: {
              method: 'POST',
              url: hostName + '/oauth/g/register'
      }

    });

    $scope.items = [];
    $scope.sourceKey = "";
    $scope.collectionKey = "";
    $scope.apiCall = function(callName) {
      if(callName === 'recent') {
        ApiResource.recent({}, function(data, error) {
          $scope.items = JSON.stringify(data, null, "  ");
        });
      } else if (callName === 'mine') {
        ApiResource.mine({}, function(data, error) {
          $scope.items = JSON.stringify(data, null, "  ");
        });

      } else if (callName === 'friends') {
        ApiResource.friends({}, function(data, error) {
          $scope.items = JSON.stringify(data, null, "  ");
        });
      } else if (callName === 'sources') {
        ApiResource.source({source: $scope.sourceKey, collection: $scope.collectionKey}, function(data, error) {
          $scope.items = JSON.stringify(data, null, "  ");
        });
      } else if (callName === 'register') {
        ApiResource.register({}, function(data, error) {
          $scope.items = JSON.stringify([{message: 'Registered'}], null, "  ");
        });
      }
    };
}]);
