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
        $scope.pedido.acrescimo       = 0;
        $scope.pedido.desconto        = 0;
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
    	$scope.pedidoItem.acrescimo     = 0;
    	$scope.pedidoItem.desconto      = 0;
    	$scope.pedidoItem.valorTotal    = 0;
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
        $scope.pedidoPagamento.valorTotal   = null;
        $scope.pedidoPagamento.tipoCobranca = null;
    	$scope.pedidoPagamento.observacao   = null;
    	//$scope.pedidoPagamento.status     = 0;
    	$('#modalFinanceiro').modal();
	    $scope.atualizarValorPagamento();

    	
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
        $scope.pedidoPagamentoPrazo.valorTotal     = null;
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
			
			$scope.pedido			    = retorno.data;
			$scope.pedido.data          = new Date($scope.pedido.data);
	    	$scope.mostrarAguarde       = false;
	        $scope.visualizaCadastro    = true;
	        $scope.pedidoPagamento      = {};
	        $scope.pedidoPagamentoPrazo = {};
	        $scope.atualizarValorPagamento();
	        $scope.atualizarValorPagamentoPrazo();
	        
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
    	
    	if (!$scope.objetoSelecionadoPedidoPagamento) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    
    	    $scope.pedidoPagamento   = $scope.objetoSelecionadoPedidoPagamento;
		    $scope.mostrarAguarde    = false;
		    $scope.visualizaCadastro = true;
		    $('#modalFinanceiro').modal();
		    $scope.atualizarValorPagamento();
    }
    
    $scope.btnEditarFinanceiroPrazo = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = "financeiro"
    	
    	if (!$scope.objetoSelecionadoPedidoPagamentoPrazo) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    
    	    $scope.pedidoPagamentoPrazo 			   = $scope.objetoSelecionadoPedidoPagamentoPrazo;
		    $scope.mostrarAguarde    			       = false;
		    $scope.pedidoPagamentoPrazo.dataVencimento = new Date();
		    $scope.visualizaCadastro 			       = true;
		    $('#modalFinanceiroPrazo').modal();
	    	$scope.atualizarValorPagamentoPrazo();

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
    	if (!$scope.objetoSelecionadoPedidoPagamento) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	    	
    	var posicao = $scope.pedido.pagamentos.indexOf($scope.objetoSelecionadoPedidoPagamento);
    	$scope.pedido.pagamentos.splice(posicao,1); 
		$scope.atualizarValorPagamento();

    }
    
    $scope.btnExcluirFinanceiroPrazo = function(){
    	if (!$scope.objetoSelecionadoPedidoPagamentoPrazo) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	    	
    	var posicao = $scope.pedido.pagamentosPrazo.indexOf($scope.objetoSelecionadoPedidoPagamentoPrazo);
    	$scope.pedido.pagamentosPrazo.splice(posicao,1);
		$scope.atualizarValorPagamentoPrazo();


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
    	if (ppedido.acrescimo < 0) {
        	$scope.mensagemRodape = "Acrescimo nao pode ser negativo!";
    		document.getElementById("cAcrescimo").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (ppedido.desconto < 0) {
        	$scope.mensagemRodape = "Desconto nao pode ser negativo!";
    		document.getElementById("cAcrescimo").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	
    	requisicaoService.requisitarPOST("pedido/salvar", ppedido, function(retorno){

     		$scope.mostrarAguarde    = false;
    		$scope.visualizaCadastro = false;

			$scope.atualizarEstoque();
    		$scope.atualizarValorItem();
    		$scope.atualizarValorPedido();
    		$scope.atualizarValorPagamento();
    		atualizarTela();

    	});
    }

    $scope.btnSalvarItem = function(pitem){
    	$scope.mensagemRodape = ""; 
    	
    	if (!pitem) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Produto!";
    		document.getElementById("cProduto").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
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
    	if (pitem.acrescimo < 0) {
        	$scope.mensagemRodape = "Acrescimo nao pode ser negativo!";
    		document.getElementById("cAcrescimo").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (pitem.desconto < 0) {
        	$scope.mensagemRodape = "Desconto nao pode ser negativo!";
    		document.getElementById("cAcrescimo").focus();
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

    $scope.btnSalvarFinanceiro = function(ppedidoPagamento){
    	$scope.mensagemRodape = ""; 
    	
    	if (!ppedidoPagamento.tipoCobranca){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Tipo de Cobranca!";
    		document.getElementById("cTipoCobranca").focus();
    		$scope.mostrarAguarde =  false;
    		return;
    	}
    	
    	if (ppedidoPagamento.valor <= 0){
    		$scope.mensagemRodape = "É necessário o preenchimento valido do campo valor!";
    		document.getElementById("cValor").focus();
    		$scope.mostrarAguarde = false;
    		return;
    	}
    	
    	if (ppedidoPagamento.valor > $scope.pedido.valorLiquido) {
        	$scope.mensagemRodape = "Valor maior que o total do pedido!";
    		document.getElementById("cValor").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (ppedidoPagamento.valorTotal > $scope.pedido.valorLiquido){
    		$scope.mensagemRodape = "Valor maior que total do pedido";
    		document.getElementById("cValorTotal").focus();
    		$scope.mostrarAguarde = false;
    		return;
    	}
    		
    	if($scope.objetoSelecionadoPedidoPagamento){
    		var posicao = $scope.pedido.pagamentos.indexOf($scope.objetoSelecionadoPedidoPagamento);
    		$scope.pedido.pagamentos[posicao] = ppedidoPagamento;
    	} else {
    		$scope.pedido.pagamentos.push(ppedidoPagamento);
    	}
		$('#modalFinanceiro').modal('hide');
		$scope.atualizarValorPagamento();

    }
    
    $scope.btnSalvarFinanceiroPrazo = function(ppedidoPagamentoPrazo){
    	$scope.mensagemRodape = ""; 
    	
    	if (!ppedidoPagamentoPrazo.tipoCobranca){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Tipo de Cobranca!";
    		document.getElementById("cTipoCobranca").focus();
    		$scope.mostrarAguarde =  false;
    		return;
    	}
    	
    	if (ppedidoPagamentoPrazo.valor <= 0){
    		$scope.mensagemRodape = "É necessário o preenchimento valido do campo valor!";
    		document.getElementById("cValor").focus();
    		$scope.mostrarAguarde = false;
    		return;
    	}
    	
    	if (ppedidoPagamentoPrazo.valor > $scope.pedido.valorLiquido) {
        	$scope.mensagemRodape = "Valor maior que o total do pedido!";
    		document.getElementById("cValor").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (ppedidoPagamentoPrazo.valorTotal > $scope.pedido.valorTotal){
    		$scope.mensagemRodape = "Valor maior que total do pedido";
    		document.getElementById("cValorTotal").focus();
    		$scope.mostrarAguarde = false;
    		return;
    	}
    		
    	if($scope.objetoSelecionadoPedidoPagamentoPrazo){
    		var posicao = $scope.pedido.pagamentosPrazo.indexOf($scope.objetoSelecionadoPedidoPagamentoPrazo);
    		$scope.pedido.pagamentosPrazo[posicao] = ppedidoPagamentoPrazo;
    	} else {
    		$scope.pedido.pagamentosPrazo.push(ppedidoPagamentoPrazo);
    	}
		$('#modalFinanceiroPrazo').modal('hide');	
		$scope.atualizarValorPagamentoPrazo();
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
    	$scope.pedido.data       = new Date($scope.pedido.data);
    	$scope.mostrarAguarde    = false;
        $scope.visualizaCadastro = false;
        $('#modalPedidoFechamento').modal();	

    }
    	$scope.btnConfirmarFechamento = function(ppedido){ 
        	$scope.mensagemRodape = "";
        	$scope.mostrarAguarde = true;
        	$scope.pedido.data    = new Date();
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
	
				$scope.valor                 = $scope.pedidoItem.acrescimo;
				$scope.porcentagem           = ($scope.valor)*0.01;
				$scope.resultado             = ($scope.pedidoItem.valorUnitario * $scope.porcentagem);
				$scope.resultadoAcrescimo    = parseFloat($scope.pedidoItem.valorUnitario) + ($scope.resultado);
				$scope.pedidoItem.valorTotal = parseFloat($scope.resultadoAcrescimo * $scope.pedidoItem.quantidade).toFixed(2);
				if($scope.pedidoItem.quantidade > $scope.pedidoItem.produto.quantidadeAtual){
						$scope.mensagemRodape        = "Quantidade em estoque insuficiente";
						document.getElementById("cQuantidade").focus();
						$scope.pedidoItem.quantidade = null;
    					$scope.mostrarAguarde        = false;
						return;
						
				}
				
			} else if ($scope.pedidoItem.desconto != 0||$scope.pedidoItem.acrescimo == 0){
				
				$scope.valor				 = $scope.pedidoItem.desconto;
				$scope.porcentagem           = ($scope.valor)*0.01;
				$scope.resultado             = ($scope.pedidoItem.valorUnitario * $scope.porcentagem);
				$scope.resultadoDesconto     = parseFloat($scope.pedidoItem.valorUnitario) - ($scope.resultado);
				$scope.pedidoItem.valorTotal = parseFloat($scope.resultadoDesconto * $scope.pedidoItem.quantidade).toFixed(2);
				if($scope.pedidoItem.quantidade > $scope.pedidoItem.produto.quantidadeAtual){
						$scope.mensagemRodape        = "Quantidade em estoque insuficiente";
						document.getElementById("cQuantidade").focus();
						$scope.pedidoItem.quantidade = null;
    					$scope.mostrarAguarde        = false;
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

			$scope.valor             = $scope.pedido.desconto;
			$scope.porcentagem       = ($scope.valor)*0.01;
			$scope.resultado         = ($scope.pedido.valorLiquido * $scope.porcentagem);
			$scope.resultadoDesconto = parseFloat($scope.pedido.valorLiquido) - ($scope.resultado);
			$scope.pedido.valorTotal = parseFloat($scope.resultadoDesconto).toFixed(2);
			
		} else if ($scope.pedido.acrescimo != 0||$scope.pedido.desconto == 0){
	
			$scope.valor 			  = $scope.pedido.acrescimo;
			$scope.porcentagem 		  = ($scope.valor)*0.01;
			$scope.resultado 		  = ($scope.pedido.valorLiquido * $scope.porcentagem);
			$scope.resultadoAcrescimo = parseFloat($scope.pedido.valorLiquido) + ($scope.resultado);
			$scope.pedido.valorTotal  = parseFloat($scope.resultadoAcrescimo).toFixed(2);
    	}	
    }
    
    $scope.atualizarValorPagamento =  function(){
    	$scope.pedidoPagamento.valorTotal = 0;
    	for (i in $scope.pedido.pagamentos){
    		$scope.pedidoPagamento.valorTotal += parseFloat($scope.pedido.pagamentos[i].valor);
        	$scope.pedidoPagamento.valorTotal = $scope.pedidoPagamento.valorTotal;

    	}

    }
    
    $scope.atualizarValorPagamentoPrazo =  function(){
    	$scope.pedidoPagamentoPrazo.valorTotal = 0;
    	for (i in $scope.pedido.pagamentosPrazo){
    		$scope.pedidoPagamentoPrazo.valorTotal += parseFloat($scope.pedido.pagamentosPrazo[i].valor)
    	}
    	$scope.pedidoPagamentoPrazo.valorTotal = $scope.pedidoPagamentoPrazo.valorTotal;
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
    	requisicaoService.requisitarGET("pedido/obterTodosAtivos", function(retorno) {
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
	}
	
	    $scope.selecionarLinha = function(objeto) {
	       $scope.objetoSelecionado = objeto;
	    }

	    $scope.selecionarLinhaItem = function(objeto) {
	       $scope.objetoSelecionadoItem = objeto;
	    }
	    
	    $scope.selecionarLinhaPedidoPagamento = function(objeto) {
		       $scope.objetoSelecionadoPedidoPagamento = objeto;
		}
	    
	    $scope.selecionarLinhaPedidoPagamentoPrazo = function(objeto) {
		       $scope.objetoSelecionadoPedidoPagamentoPrazo = objeto;
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
	