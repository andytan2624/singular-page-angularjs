var app = angular.module('app');

app.controller('ModalController', ['$scope', 'close', function($scope, close) {

    $scope.close = close;

}]);