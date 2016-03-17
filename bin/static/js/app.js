//Define an angular module for  app
var App = angular.module('MyApp', []);
 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
App.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/AddNewOrder', {
        templateUrl: 'add_order.html',
        controller: 'AddOrderController'
    }).
      when('/ShowOrders', {
        templateUrl: 'show_orders.html',
        controller: 'ShowOrdersController'
      }).
      when('/Notice', {
          templateUrl: 'notice.html',
          controller: 'NoticeController'
        }).
      otherwise({
        redirectTo: '/ShowOrders'
      });
}]);
 
 
App.controller('AddOrderController', function($scope) {
     
    $scope.message = 'This is Add new order screen';
     
});
 
 
App.controller('ShowOrdersController', function($scope) {
 
    $scope.message = 'This is Show orders screen';
 
});



App.service("MyService",function($http,$q){
	
	var deferred = $q.defer();
	$http.get('/greetingRequest').then(function(data){
		deferred.resolve(data);
	})
	
	this.getStuff = function(){
		return deferred.promise;
	}
});


App.controller('NoticeController', function($scope, MyService){
	
	var promise = MyService.getStuff();
	promise.then(function(response){
		$scope.id = response.data.id;
		$scope.message = response.data.content;
		console.log(response);
	})
})