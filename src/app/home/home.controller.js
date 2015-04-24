'use strict';

angular.module('mobilePrototype')
  .controller('HomeCtrl', ['$scope', '$resource', '$stateParams', function($scope, $resource, $stateParams) {
    console.log($stateParams);
	var ApiResource = $resource('http://localhost:8080/', {}, {
		recent: {
			url: 'http://localhost:8080/recent?format=json',
			withCredentials: true,
			headers: {'Content-Type': 'application/json'}
		},
		mine: {
			url: 'http://localhost:8080/mine?format=json',
			withCredentials: true,
			headers: {'Content-Type': 'application/json'}
		},
		friends: {
			url: 'http://localhost:8080/friends?format=json',
			withCredentials: true,
			headers: {'Content-Type': 'application/json'}
		},
        source: {
            url: 'http://localhost:8080/sources/:source/collections/:collection/entries?format=json',
			withCredentials: true,
			headers: {'Content-Type': 'application/json'}

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
        }

    };
}]);
