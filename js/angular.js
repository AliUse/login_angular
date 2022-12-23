var app = angular.module('app', ['ngRoute']);
 
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'login.html',
		controller: 'loginCtrl'
	})
	.when('/home', {
		templateUrl: 'home.html',
		controller: 'homeCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});
 
app.run(function($rootScope, $location, loginService){
	//prevent going to homepage if not loggedin
	var routePermit = ['/home'];
	$rootScope.$on('$routeChangeStart', function(){
		if(routePermit.indexOf($location.path()) !=-1){
			var connected = loginService.islogged();
			connected.then(function(response){
				if(!response.data){
				$location.path('/');
				}
			});
 
		}
	});
	//prevent going back to login page if session is set
	var sessionStarted = ['/'];
	$rootScope.$on('$routeChangeStart', function(){
		if(sessionStarted.indexOf($location.path()) !=-1){
			var cantgoback = loginService.islogged();
			cantgoback.then(function(response){
				if(response.data){
					$location.path('/home');
				}
			});
		}
	});
});