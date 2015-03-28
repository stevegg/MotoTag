'use strict';

angular.module('motoTagApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {

    $scope.serverUrl = 'http://localhost:9000';
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.games = [];
    var url = '/api/games';
    if ( Auth.isLoggedIn() ) {
        url = '/api/games/user/' + $scope.getCurrentUser()._id;
    }
    $http.get( url ).success(function(games) {
      $scope.games = games;
      socket.syncUpdates('game', $scope.games);
    });
    /*
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    */

  });
