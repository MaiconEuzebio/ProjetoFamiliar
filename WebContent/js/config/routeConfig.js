angular.module("listaTelefonica").config(function ($routeProvider){
	$routeProvider.when("/cor", {
		templateUrl: "view/cor.html",
		controller: "corController",
	});
	
	$routeProvider.when("/marca", {
		templateUrl: "view/marca.html",
		controller: "marcaController",
	});
	
	$routeProvider.when("/tamanho", {
		templateUrl: "view/tamanho.html",
		controller: "tamanhoController",
	});
	
	$routeProvider.when("/tipoContato", {
		templateUrl: "view/tipoContato.html",
		controller: "tipoContatoController",
	});
	
	$routeProvider.when("/tipoEndereco", {
		templateUrl: "view/tipoEndereco.html",
		controller: "tipoEnderecoController",
	});
	
	$routeProvider.otherwise({redirectTo: "/index.html"});
});