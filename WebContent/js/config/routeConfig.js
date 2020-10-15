angular.module("listaTelefonica").config(function ($routeProvider){
	$routeProvider.when("/cor", {
		templateUrl: "view/cor.html",
		controller: "corController",
	});
	
	$routeProvider.when("/marca", {
		templateUrl: "view/marca.html",
		controller: "marcaController",
	});
	
	$routeProvider.otherwise({redirectTo: "/index.html"});
});