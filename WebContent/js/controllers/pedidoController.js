app.controller("pedidoController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
		
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
		$scope.itens = null;
    	$scope.visualizaCadastro 	= false;
		
    }

    $scope.btnIncluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = 'principal'
        	
        $scope.pedido		          = {};
        $scope.pedido.id              = null;
        $scope.pedido.data            = new Date();
        $scope.pedido.pessoa          = null;
        $scope.pedido.valorLiquido    = null;
        $scope.pedido.acrescimo       = null;
        $scope.pedido.desconto        = null;
        $scope.pedido.valorTotal      = null;
        $scope.pedido.observacao      = null;
        $scope.pedido.status          = 1;
        $scope.pedido.itens           = [];
        $scope.pedido.pagamentos      = [];
        $scope.pedido.pagamentosPrazo = [];
        $scope.visualizaCadastro      = true;  
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
    	//$scope.pedidoPagamento.status     = 0;
    	$('#modalFinanceiro').modal();
    	
    	$scope.mostrarAguarde    = false;
    	$scope.visualizaCadastro = true;
    }
    
    $scope.btnIncluirFinanceiroPrazo = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	$scope.pedidoPagamentoPrazo		           = {};
    	$scope.pedidoPagamentoPrazo.id             = null;
        $scope.pedidoPagamentoPrazo.valor          = null;
        $scope.pedidoPagamentoPrazo.tipoCobranca   = null;
        $scope.pedidoPagamentoPrazo.dataVencimento = new Date();
    	$scope.pedidoPagamentoPrazo.observacao     = null;
    	//$scope.pedidoPagamento.status            = 1;

    	$('#modalFinanceiroPrazo').modal();
    	
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
    	if ($scope.objetoSelecionado.status == 0) {
            $scope.mensagemModal  = "Pedido Fechado!";
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
    
    	    $scope.pedidoPagamento   = $scope.objetoSelecionadoPagamentoPedido;
		    $scope.mostrarAguarde    = false;
		    $scope.visualizaCadastro = true;
		    $('#modalFinanceiro').modal();
    }
    
    $scope.btnEditarFinanceiroPrazo = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = "financeiro"
    	
    	if (!$scope.objetoSelecionadoPagamentoPedidoPrazo) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    
    	    $scope.pedidoPagamentoPrazo 			   = $scope.objetoSelecionadoPagamentoPedidoPrazo;
		    $scope.mostrarAguarde    			       = false;
		    $scope.pedidoPagamentoPrazo.dataVencimento = new Date();
		    $scope.visualizaCadastro 			       = true;
		    $('#modalFinanceiroPrazo').modal();
    }

    $scope.btnExcluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}

    	$scope.mensagemModal = 'Deseja realmente excluir o registro?';
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
    }

    $scope.btnExcluirFinanceiro = function(){
    	if (!$scope.objetoSelecionadoPagamentoPedido) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	    	
    	var posicao = $scope.pedido.pagamentos.indexOf($scope.objetoSelecionadoPagamentoPedido);
    	$scope.pedido.pagamentos.splice(posicao,1);
    }
    
    $scope.btnExcluirFinanceiroPrazo = function(){
    	if (!$scope.objetoSelecionadoPagamentoPedidoPrazo) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	    	
    	var posicao = $scope.pedido.pagamentosPrazo.indexOf($scope.objetoSelecionadoPagamentoPedidoPrazo);
    	$scope.pedido.pagamentosPrazo.splice(posicao,1);
    }

    $scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }

    $scope.btnSalvar = function(ppedido){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!ppedido.pessoa) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Cliente!";
    		document.getElementById("cPessoa").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	requisicaoService.requisitarPOST("pedido/salvar", ppedido, function(retorno){
    		if (!retorno.isValid) {
	        	$('#modalAtencao').modal();
	    		$scope.mostrarAguarde = false;
	    		return;
    		}

     		$scope.mostrarAguarde    = false;
    		$scope.visualizaCadastro = false;

			$scope.atualizarEstoque();
    		$scope.atualizarValorItem();
    		$scope.atualizarValorPedido();
    		atualizarTela();

    	});
    }

    $scope.btnSalvarItem = function(pitem){
    	$scope.mensagemRodape = ""; 
    	
    	if (!pitem.produto) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Produto!";
    		document.getElementById("cProduto").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (!pitem.quantidade) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Quantidade!";
    		document.getElementById("cQuantidade").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (!pitem.valorUnitario) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Valor Unitario!";
    		document.getElementById("cValorUnitario").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if($scope.objetoSelecionadoItem){
    		var posicao = $scope.pedido.itens.indexOf($scope.objetoSelecionadoItem);
    		$scope.pedido.itens[posicao] = pitem;
    	} else {
    		$scope.pedido.itens.push(pitem);
			$scope.estoque = null;
    	}
    	
		$('#modalItem').modal('hide');
		$scope.atualizarValorPedido();

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
    
    $scope.btnSalvarFinanceiroPrazo = function(ppagamentoPedidoPrazo){
    	$scope.mensagemRodape = ""; 

    		
    	if($scope.objetoSelecionadoPagamentoPedidoPrazo){
    		var posicao = $scope.pedido.pagamentosPrazo.indexOf($scope.objetoSelecionadoPagamentoPedidoPrazo);
    		$scope.pedido.pagamentosPrazo[posicao] = ppagamentoPedidoPrazo;
    	} else {
    		$scope.pedido.pagamentosPrazo.push(ppagamentoPedidoPrazo);
    	}
		$('#modalFinanceiroPrazo').modal('hide');	
    }

    $scope.btnFecharPedido = function(){
    	$scope.pedido = $scope.objetoSelecionado;
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o pedido que deseja fechar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	if ($scope.objetoSelecionado.status == 0) {
            $scope.mensagemModal  = "Pedido Fechado!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	$scope.pedido.data = new Date($scope.pedido.data);
    	$scope.mostrarAguarde    = false;
        $scope.visualizaCadastro = true;
        $('#modalPedidoFechamento').modal();	

    }
    	$scope.btnConfirmarFechamento = function(ppedido){ 
        	$scope.mensagemRodape = "";
        	$scope.mostrarAguarde = true;
        	$scope.pedido.data = new Date();
        	//$scope.pedido.status = 0;

    	requisicaoService.requisitarPOST("pedido/salvarFechamento", ppedido, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.data.str1;
    			$('#modalAtencao').modal();
    			$scope.mostrarAguarde = false;
        		return;
    		}
        	$('#modalPedidoFechamento').modal('hide');

    		$scope.mostrarAguarde    = false;
    		$scope.visualizaCadastro = false;
    		atualizarTela();
    	});
    }
    
    $scope.atualizarValorItem = function(){

    		if($scope.pedidoItem.acrescimo != 0||$scope.pedidoItem.desconto == 0){
	
				$scope.valor = $scope.pedidoItem.acrescimo;
				$scope.porcentagem = ($scope.valor)*0.01;
				$scope.resultado = ($scope.pedidoItem.valorUnitario * $scope.porcentagem);
				$scope.resultadoAcrescimo = parseFloat($scope.pedidoItem.valorUnitario) + ($scope.resultado);
				$scope.pedidoItem.valorTotal = parseFloat($scope.resultadoAcrescimo * $scope.pedidoItem.quantidade);
				if($scope.pedidoItem.quantidade > $scope.pedidoItem.produto.quantidadeAtual){
						$scope.mensagemRodape  = "Quantidade em estoque insuficiente";
						document.getElementById("cQuantidade").focus();
						$scope.pedidoItem.quantidade = null;
    					$scope.mostrarAguarde = false;
						return;
						
				}
				
			} else if ($scope.pedidoItem.desconto != 0||$scope.pedidoItem.acrescimo == 0){
				
				$scope.valor = $scope.pedidoItem.desconto;
				$scope.porcentagem = ($scope.valor)*0.01;
				$scope.resultado = ($scope.pedidoItem.valorUnitario * $scope.porcentagem);
				$scope.resultadoDesconto = parseFloat($scope.pedidoItem.valorUnitario) - ($scope.resultado);
				$scope.pedidoItem.valorTotal = parseFloat($scope.resultadoDesconto * $scope.pedidoItem.quantidade);
				if($scope.pedidoItem.quantidade > $scope.pedidoItem.produto.quantidadeAtual){
						$scope.mensagemRodape  = "Quantidade em estoque insuficiente";
						document.getElementById("cQuantidade").focus();
						$scope.pedidoItem.quantidade = null;
    					$scope.mostrarAguarde = false;
						return;
				}				
			}
    	
    }


	
	$scope.estoque = null;
	
	$scope.mostrarEstoqueProduto = function(){
		$scope.estoque = $scope.pedidoItem.produto.quantidadeAtual;
	}
	$scope.atualizarEstoque = function(){
		
		$scope.estoque = $scope.pedidoItem.valorTotal;
		console.log($scope.estoque);	

	}

    $scope.atualizarValorPedido = function(){
    	$scope.pedido.valorLiquido = 0;

    	for(i in $scope.pedido.itens){
			$scope.pedido.valorLiquido += parseFloat($scope.pedido.itens[i].valorTotal);
    	}
    	
		if($scope.pedido.desconto != 0||$scope.pedido.acrescimo == 0){

			$scope.valor = $scope.pedido.desconto;
			$scope.porcentagem = ($scope.valor)*0.01;
			$scope.resultado = ($scope.pedido.valorLiquido * $scope.porcentagem);
			$scope.resultadoDesconto = parseFloat($scope.pedido.valorLiquido) - ($scope.resultado);
			$scope.pedido.valorTotal = parseFloat($scope.resultadoDesconto);
			
		} else if ($scope.pedido.acrescimo != 0||$scope.pedido.desconto == 0){
	
			$scope.valor = $scope.pedido.acrescimo;
			$scope.porcentagem = ($scope.valor)*0.01;
			$scope.resultado = ($scope.pedido.valorLiquido * $scope.porcentagem);
			$scope.resultadoAcrescimo = parseFloat($scope.pedido.valorLiquido) + ($scope.resultado);
			$scope.pedido.valorTotal = parseFloat($scope.resultadoAcrescimo);
    	}	
    }

    $scope.fecharModalItem = function(){
	 	$scope.estoque = null;
    	$('#modalItem').modal('hide');
    }

    $scope.fecharModalFinanceiro = function(){
    	$('#modalFinanceiro').modal('hide');
    }
    
    $scope.fecharModalFinanceiroPrazo = function(){
    	$('#modalFinanceiroPrazo').modal('hide');
    }
    
    $scope.fecharModalPedidoFechamento = function(){
    	$('#modalPedidoFechamento').modal('hide');
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
    	
    	requisicaoService.requisitarGET("produto/obterTodosAtivosEmEstoque", function(retorno) {
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
			$scope.tipoCobrancas  = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
	}

	$scope.pesquisar = function(){
		$scope.pedidosFiltradas = orderByFilter(filterFilter($scope.pedidos,{id:$scope.idFilter,
																			dataStr: $scope.dataFilter,
																			pessoa: {nomeRzSocial:$scope.pessoaFilter},
																			valorLiquido: $scope.valorLiquidoFilter,
																			acrescimo: $scope.acrescimoFilter,
																			desconto: $scope.descontoFilter,
																			valorTotal: $scope.valorTotalFilter,
																			descStatus: $scope.descStatusFilter}), $scope.campoOrdenacao);
		$scope.totalItems = $scope.pedidosFiltradas.length;

	}
	
	    $scope.selecionarLinha = function(objeto) {
	       $scope.objetoSelecionado = objeto;
	    }

	    $scope.selecionarLinhaItem = function(objeto) {
	       $scope.objetoSelecionadoItem = objeto;
	    }
	    
	    $scope.selecionarLinhaPagamentoPedido = function(objeto) {
		       $scope.objetoSelecionadoPagamentoPedido = objeto;
		}
	    
	    $scope.selecionarLinhaPagamentoPedidoPrazo = function(objeto) {
		       $scope.objetoSelecionadoPagamentoPedidoPrazo = objeto;
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
	