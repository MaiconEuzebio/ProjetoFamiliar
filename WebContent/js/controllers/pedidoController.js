app.controller("pedidoController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
		
	$scope.vizualizarCadastro = false;
	$scope.mostrarAguarde = false;
	$scope.tela = "Pedido > Pedido de Venda"	
	
	$scope.pedidos              = [];
	$scope.itens                = [];
	$scope.pagamentos           = [];
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

	$scope.atualizarQuantidade = function(){
		if($scope.pedidos != null){
		console.log($scope.itens)
		}
	}

	

    $scope.voltar = function(){
    	$scope.visualizaCadastro 	= false;
    }
    
    $scope.btnIncluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = 'principal'
        		
        $scope.pedido		        = {};
        $scope.pedido.id            = null;
        $scope.pedido.data          = new Date();
        $scope.pedido.pessoa        = null;
        $scope.pedido.valorLiquido  = null;
        $scope.pedido.acrescimo     = null;
        $scope.pedido.desconto      = null;
        $scope.pedido.valorTotal    = null;
        $scope.pedido.observacao    = null;
        $scope.pedido.status        = 1;
        $scope.pedido.itens         = [];
        $scope.pedido.pagamentos    = [];
        $scope.visualizaCadastro    = true;  
    }
    
    $scope.btnIncluirItem = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	$scope.pedidoItem		        = {};
    	$scope.pedidoItem.id            = null;
    	$scope.pedidoItem.produto       = null;
    	$scope.pedidoItem.quantidade    = null;
    	$scope.pedidoItem.valorUnitario = null;
    	$scope.pedidoItem.acrescimo     = null;
    	$scope.pedidoItem.desconto      = null;
    	$scope.pedidoItem.valorTotal    = null;
    	$scope.pedidoItem.observacao    = null;
    	$('#modalItem').modal();
    	
    	$scope.mostrarAguarde    = false;
    	$scope.visualizaCadastro = true;
    }
    
    $scope.btnIncluirFinanceiro = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	$scope.pedidoPagamento		        = {};
    	$scope.pedidoPagamento.id           = null;
        $scope.pedidoPagamento.valor        = null;
        $scope.pedidoPagamento.tipoCobranca = null;
    	$scope.pedidoPagamento.observacao   = null;
    	$('#modalFinanceiro').modal();
    	
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
			
			$scope.pedido			 = retorno.data;
			$scope.pedido.data       = new Date($scope.pedido.data);
	    	$scope.mostrarAguarde    = false;
	        $scope.visualizaCadastro = true;
		});
    }
    
    $scope.btnEditarItem = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = "item"
    	
    	if (!$scope.objetoSelecionadoItem) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    
    	    $scope.pedidoItem        = $scope.objetoSelecionadoItem;
		    $scope.mostrarAguarde    = false;
		    $scope.visualizaCadastro = true;
		    $('#modalItem').modal();
    }

    $scope.btnEditarFinanceiro = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = "financeiro"
    	
    	if (!$scope.objetoSelecionadoPagamentoPedido) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    
    	    $scope.pedidoPagamento = $scope.objetoSelecionadoPagamentoPedido;
		    $scope.mostrarAguarde    = false;
		    $scope.visualizaCadastro = true;
		    $('#modalFinanceiro').modal();
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
    	$scope.atualizarValorItem();
    }

    $scope.btnExcluirFinanceiro = function(){
    	if (!$scope.objetoSelecionadoItem) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	    	
    	var posicao = $scope.pedido.pagamentos.indexOf($scope.objetoSelecionadoPagamentoPedido);
    	$scope.pedido.pagamentos.splice(posicao,1);
    	$scope.atualizarValorItem();
    }
     
    $scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }
    
    $scope.btnSalvar = function(ppedido){
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
    		$scope.atualizarValorItem();
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
    
    $scope.btnSalvarFinanceiro = function(ppagamentoPedido){
    	$scope.mensagemRodape = ""; 
    	
    	if($scope.objetoSelecionadoPagamentoPedido){
    		var posicao = $scope.pedido.pagamentos.indexOf($scope.objetoSelecionadoPagamentoPedido);
    		$scope.pedido.pagamentos[posicao] = ppagamentoPedido;
    	} else {
    		$scope.pedido.pagamentos.push(ppagamentoPedido);
    	}
		$('#modalFinanceiro').modal('hide');	
    }
    
    $scope.atualizarValorItem = function(){
			
		if($scope.pedidoItem.acrescimo != 0||$scope.pedidoItem.desconto == 0){

			$scope.valor = $scope.pedidoItem.acrescimo;
			$scope.porcentagem = ($scope.valor)*0.01;
			$scope.resultado = ($scope.pedidoItem.valorUnitario * $scope.porcentagem);
			$scope.resultadoAcrescimo = parseFloat($scope.pedidoItem.valorUnitario) + ($scope.resultado);
			$scope.pedidoItem.valorTotal = parseFloat($scope.resultadoAcrescimo * $scope.pedidoItem.quantidade);
			
		} else if ($scope.pedidoItem.desconto != 0||$scope.pedidoItem.acrescimo == 0){
			
			$scope.valor = $scope.pedidoItem.desconto;
			$scope.porcentagem = ($scope.valor)*0.01;
			$scope.resultado = ($scope.pedidoItem.valorUnitario * $scope.porcentagem);
			$scope.resultadoDesconto = parseFloat($scope.pedidoItem.valorUnitario) - ($scope.resultado);
			$scope.pedidoItem.valorTotal = parseFloat($scope.resultadoDesconto * $scope.pedidoItem.quantidade);				
		}
    }
    
    $scope.atualizarValorPedido = function(){


		if($scope.pedido.desconto != 0||$scope.pedido.acrescimo == 0){
			$scope.pedido.valorLiquido = $scope.pedidoItem.valorTotal;

			$scope.valor = $scope.pedido.desconto;
			$scope.porcentagem = ($scope.valor)*0.01;
			$scope.resultado = ($scope.pedido.valorLiquido * $scope.porcentagem);
			$scope.resultadoDesconto = parseFloat($scope.pedido.valorLiquido) - ($scope.resultado);
			$scope.pedido.valorTotal = parseFloat($scope.resultadoDesconto);
	
			
		} else if ($scope.pedido.acrescimo != 0||$scope.pedido.desconto == 0){
			$scope.pedido.valorLiquido = $scope.pedidoItem.valorTotal;

			
			$scope.valor = $scope.pedido.acrescimo;
			$scope.porcentagem = ($scope.valor)*0.01;
			$scope.resultado = ($scope.pedido.valorLiquido * $scope.porcentagem);
			$scope.resultadoAcrescimo = parseFloat($scope.pedido.valorLiquido) + ($scope.resultado);
			$scope.pedido.valorTotal = parseFloat($scope.resultadoAcrescimo);
			
		} 
    	
    }
 
    $scope.fecharModalItem = function(){
    	$('#modalItem').modal('hide');
    }
 
    $scope.fecharModalFinanceiro = function(){
    	$('#modalFinanceiro').modal('hide');
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
	
			for(i in $scope.pedidos){
				$scope.pedidos[i].dataStr = dateToStr(new Date($scope.pedidos[i].data));

			}
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
    	
    	requisicaoService.requisitarGET("tipoCobranca/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.tipoCobrancas = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
	}
 
	$scope.pesquisar = function(){
		$scope.pedidosFiltradas = orderByFilter(filterFilter($scope.pedidos,{id:$scope.idFilter}), $scope.campoOrdenacao);
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
	