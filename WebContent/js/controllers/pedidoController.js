app.controller("pedidoController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
		
	$scope.vizualizarCadastro = false;
	$scope.mostrarAguarde = false;
	$scope.tela = "Pedido > Pedido de Venda"	
	
    $scope.itens                = [];
	$scope.pedidos              = [];
	$scope.showModalConfirmacao = false;
	$scope.showModalAviso       = false;
	$scope.mostrarAguarde       = false;
	$scope.visualizaCadastro 	= false;
	$scope.mensagemModal 	 	= '';
	$scope.mensagemRodape 	 	= '';
	$scope.mostrarAguarde 		= true;
	$scope.campoOrdenacao 		= '-id';
	
	atualizarTela();
	
	/*
    /////////////////////////////////////////////////////////////////
	// FUNÇÕES                                                     //
    /////////////////////////////////////////////////////////////////
    */
    $scope.voltar = function(){
    	$scope.visualizaCadastro 	= false;
    }
    
    $scope.btnIncluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = 'principal'
        		
        $scope.pedido		        = {};
        $scope.pedido.id            = null;
        $scope.pedido.dataPedido    = new Date();
        $scope.pedido.pessoa        = null;
        $scope.pedido.valorUnitario = null;
        $scope.pedido.acrescimo     = null;
        $scope.pedido.desconto      = null;
        $scope.pedido.valorTotal    = null;
        $scope.pedido.observacao    = null;
        $scope.pedido.itens = [];
        $scope.visualizaCadastro = true;  
    }
    
    $scope.btnIncluirItem = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	$scope.item		          = {};
    	$scope.item.id            = null;
    	$scope.item.produto       = null;
    	$scope.item.quantidade    = null;
    	$scope.item.valorUnitario = null;
    	$scope.item.acrescimo     = null;
    	$scope.item.desconto      = null;
    	$scope.item.valorTotal    = null;
    	$scope.item.observacao    = null;
    	$('#modalItem').modal();
    	
    	$scope.mostrarAguarde    = false;
    	$scope.visualizaCadastro = true;
    }
    
    $scope.btnEditar = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = 'principal'
    	
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
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
			
			$scope.pedido			   = retorno.data;
	    	$scope.mostrarAguarde    = false;
	        $scope.visualizaCadastro = true;
		});
    }
    
    $scope.btnEditarItem = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = "item"
    	
    	if (!$scope.objetoSelecionadoMovimentacao) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    
    	    $scope.item = $scope.objetoSelecionadoItem;
		    $scope.mostrarAguarde    = false;
		    $scope.visualizaCadastro = true;
		    $('#modalItem').modal();
    }







    
    $scope.btnExcluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}

    	$scope.mensagemModal        = 'Deseja realmente excluir o registro?';
		$('#modalExcluir').modal();
    }
    
    $scope.confirmaExcluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		var param = {
			int1: $scope.objetoSelecionado.id
		}
		$('#modalExcluir').modal('hide');
    	//deletar
    	requisicaoService.requisitarPOST("pedido/removerPorId", param, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.data.str1;
    			$('#modalAtencao').modal();
    			$scope.mostrarAguarde = false;
        		return;
    		}
    		
    		$scope.mostrarAguarde       = false;
    		$scope.showModalConfirmacao = false;
			
    		atualizarTela();
    	});
    }





    
    $scope.btnExcluirItem = function(){
    	if (!$scope.objetoSelecionadoItem) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	    	
    	var posicao = $scope.pedido.itens.indexOf($scope.objetoSelecionadoItem);
    	$scope.pedido.itens.splice(posicao,1);
    	$scope.atualizarValor();
    }






    
    $scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }
    







    $scope.btnSalvar = function(ppedido){
    	$scope.caixa.dataFechamento = null;
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	requisicaoService.requisitarPOST("pedido/salvar", ppedido, function(retorno){
    		if (!retorno.isValid) {
	        	$('#modalAtencao').modal();
	    		$scope.mostrarAguarde = false;
	    		return;
    		}
    		
    		$scope.mostrarAguarde    = false;
    		$scope.visualizaCadastro = false;
    		$scope.atualizarValor();
    		atualizarTela();
    		
    	});
    }






    
    $scope.btnSalvarItem = function(pitem){
    	$scope.mensagemRodape = ""; 
    	
    	if($scope.objetoSelecionadoItem){
    		var posicao = $scope.pedido.itens.indexOf($scope.objetoSelecionadoItem);
    		$scope.pedido.itens[posicao] = pitem;
    	} else {
    		$scope.pedido.itens.push(pitem);
    	}
		$('#modalItem').modal('hide');	
    }







    
    $scope.fecharModalItem = function(){
    	$('#modalItem').modal('hide');
    }






    
    function atualizarTela(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  ="";
    	$scope.mostrarAguarde = true; 
    	
		//obter todos os registros
    	requisicaoService.requisitarGET("pedido/obterTodos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.pedidos = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
    	
    	requisicaoService.requisitarGET("pessoa/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.pessoas = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
    	
    	requisicaoService.requisitarGET("item/obterTodos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.itens = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
    	
    	requisicaoService.requisitarGET("produto/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.produtos = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
	}
	
	
	
	
	
	
	
	
	
    
	$scope.pesquisar = function(){
		$scope.pedidosFiltradas = orderByFilter(filterFilter($scope.caixas,{id:$scope.idFilter}), $scope.campoOrdenacao);
	}
	
	
	
	
	
	
	
	
	 $scope.selecionarLinha = function(objeto) {
	       $scope.objetoSelecionado = objeto;
	    }





	    
	    $scope.selecionarLinhaItem = function(objeto) {
	       $scope.objetoSelecionadoItem = objeto;
	    }






		$scope.ordenacao = function (pcampo) {
			if ($scope.campoOrdenacao == '+'+pcampo || $scope.campoOrdenacao == '-'+pcampo) {
	    		$scope.reverseOrdenacao = !$scope.reverseOrdenacao;
	    	} else {
	    		$scope.reverseOrdenacao = false;
	    	}
	    	
	    	if ($scope.reverseOrdenacao) {
	    		$scope.campoOrdenacao   = '-'+pcampo;	
	    	} else {
	    		$scope.campoOrdenacao   = '+'+pcampo;
	    	}
	    	
	    	$scope.pesquisar();
	    } 
    	
    
});
	