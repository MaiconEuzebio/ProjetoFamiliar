app.controller("pedidoFechadoController", function ($scope, $routeParams, requisicaoService, filterFilter, orderByFilter) {
	$scope.vizualizarCadastro = false;
	$scope.mostrarAguarde = false;
	$scope.tela = "Pedido > Pedido de Venda"	
	
	$scope.pedidos              = [];
	$scope.itens                = [];
	$scope.pagamentos           = [];
	$scope.pagamentosPrazo      = [];
	$scope.showModalConfirmacao = false;
	$scope.showModalAviso       = false;
	$scope.mostrarAguarde       = false;
	$scope.visualizaCadastro 	= false;
	$scope.mensagemModal 	 	= '';
	$scope.mensagemRodape 	 	= '';
	$scope.mostrarAguarde 		= true;
	$scope.campoOrdenacao 		= '-id';
	
    $scope.voltar = function(){
		$scope.itens = null;
    	$scope.visualizaCadastro 	= false;
		
    }
	
	 $scope.btnVisualizar = function(){
	    	$scope.mensagemRodape = "";
	    	$scope.mensagemModal  = "";
	    	$scope.abaSelecionada = 'principal'	    	
	    	
	    	if (!$scope.objetoSelecionado) {
	            $scope.mensagemModal   = "É necessário selecionar o registro que deseja visualizar!";
	        	$('#modalAtencao').modal();
	    		return;
	    	}	
	    	var param = {
				int1: $scope.objetoSelecionado.id
			}
	    	$scope.mostrarAguarde = true;
	    	
	    	requisicaoService.requisitarPOST("pedido/obterPorId", param , function(retorno) {
				if (!retorno.isValid) {
	    			$scope.mensagemModal  = retorno.msg;
	    			$scope.showModalAviso = true;
	    			$scope.mostrarAguarde = false;
	        		return;
	    		}
				$scope.pedido            = retorno.data;
				$scope.pedido.data       = new Date($scope.pedido.data);
		    	$scope.mostrarAguarde    = false;
		        $scope.visualizaCadastro = true;
			});
	    	
	    }
	
	
	function atualizarTela(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  ="";
    	$scope.mostrarAguarde = true; 
    	
		//obter todos os registros
    	requisicaoService.requisitarGET("pedido/obterPedidoFechadoLista", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.pedidos = retorno.data;
	
			for(i in $scope.pedidos){
				$scope.pedidos[i].dataStr = dateToStr(new Date($scope.pedidos[i].data));				
			}
		
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});

	}

	atualizarTela();
	
	
	$scope.pesquisar = function(){
		$scope.pedidosFiltradas = orderByFilter(filterFilter($scope.pedidos,{id:$scope.idFilter,
																			dataStr: $scope.dataFilter,
																			pessoa: {nomeRzSocial:$scope.pessoaFilter},
																			valorLiquido: $scope.valorLiquidoFilter,
																			acrescimo: $scope.acrescimoFilter,
																			desconto: $scope.descontoFilter,
																			valorTotal: $scope.valorTotalFilter,
																			descStatus: $scope.descStatusFilter}), $scope.campoOrdenacao);
		

	}
    $scope.selecionarLinha = function(objeto) {
	       $scope.objetoSelecionado = objeto;
	}
});