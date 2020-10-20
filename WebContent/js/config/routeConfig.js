angular.module("listaTelefonica").config(function ($routeProvider){
	
	$routeProvider.when("/produto", {
		templateUrl: "view/produto.html",
		controller: "produtoController",
	});
	
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
	$routeProvider.when("/unidadeMedida", {
		templateUrl: "view/unidadeMedida.html",
		controller: "unidadeMedidaController",
	});
	
	$routeProvider.when("/tipoContato", {
		templateUrl: "view/tipoContato.html",
		controller: "tipoContatoController",
	});
	
	$routeProvider.when("/tipoEndereco", {
		templateUrl: "view/tipoEndereco.html",
		controller: "tipoEnderecoController",
	});
	
	$routeProvider.when("/pessoa", {
		templateUrl: "view/pessoa.html",
		controller: "pessoaController",
	});
	
	$routeProvider.when("/endereco", {
		templateUrl: "view/endereco.html",
		controller: "enderecoController",
	});
	
	$routeProvider.otherwise({redirectTo: "/index.html"});
});