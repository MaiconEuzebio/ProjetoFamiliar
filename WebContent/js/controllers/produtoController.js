app.controller("produtoController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
	

	$scope.vizualizarCadastro = false;
	$scope.mostrarAguarde = false;
	$scope.tela = "Produto"	
	
	$scope.produtos             = [];
	$scope.showModalConfirmacao = false;
	$scope.showModalAviso       = false;
	$scope.mostrarAguarde       = false;
	$scope.visualizaCadastro 	= false;
	$scope.mensagemModal 	 	= '';
	$scope.mensagemRodape 	 	= '';
	$scope.mostrarAguarde 		= true;
	$scope.campoOrdenacao 		= '-id';
	$scope.produtoMovimentacoes = [];
	
	
	atualizarTela();	
	
	/*
    /////////////////////////////////////////////////////////////////
	// FUNÇÕES                                                     //
    /////////////////////////////////////////////////////////////////
    */
    $scope.voltar = function(){
    	$scope.visualizaCadastro = false;
    }

    $scope.btnIncluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	$scope.produto		             = {};
    	$scope.produto.id                = null;
    	$scope.produto.descricao         = null;
    	$scope.produto.quantidadeMaxima  = null;
    	$scope.produto.quantidadeMinima  = null;
    	$scope.produto.quantidadeAtual   = null;
    	$scope.produto.precoCusto        = null;
    	$scope.produto.precoVenda        = null;
    	$scope.produto.cor               = null;
    	$scope.produto.marca             = null;
    	$scope.produto.tamanho           = null;
    	$scope.produto.unidadeMedida     = null;
    	$scope.produto.status	         = 1;
		$scope.produtoMovimentacoes.tipo = null;
		
    	
    	$scope.mostrarAguarde    = false;
    	$scope.visualizaCadastro = true;
    }

    $scope.btnEditar = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	var param = {int1: $scope.objetoSelecionado.id}
    	$scope.mostrarAguarde = true;
    	
    	//obter o produto
    	requisicaoService.requisitarPOST("produto/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			
			$scope.produto			 = retorno.data;
	    	$scope.mostrarAguarde    = false;
	        $scope.visualizaCadastro = true;
		});
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
    	requisicaoService.requisitarPOST("produto/removerPorId", param, function(retorno){
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
    
    
    

    $scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }




    $scope.btnSalvar = function(pproduto){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	
    	if (!pproduto.descricao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Descrição!";
    		document.getElementById("cDescricao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (pproduto.quantidadeMaxima < 1) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Quantidade Maxima!";
    		document.getElementById("cQuantidadeMaxima").focus();
    		$scope.mostrarAguarde = false;
    		return;	
        }
    	if (!pproduto.quantidadeMaxima) {
        	$scope.mensagemRodape = "O campo Quantidade Maxima deve ter no maximo 10 caracteres!";
    		document.getElementById("cQuantidadeMaxima").focus();
    		$scope.mostrarAguarde = false; 
    		return;
        }
    	
    	
    	if (pproduto.quantidadeMinima < 1) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Quantidade Minima!";
    		document.getElementById("cQuantidadeMinima").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (!pproduto.quantidadeMinima) {
        	$scope.mensagemRodape = "O campo Quantidade Minima deve ter no maximo 10 caracteres!";
    		document.getElementById("cQuantidadeMinima").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (pproduto.quantidadeAtual < 1) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Quantidade Atual!";
    		document.getElementById("cQuantidadeAtual").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (!pproduto.quantidadeAtual) {
        	$scope.mensagemRodape = "O campo Quantidade Atual deve ter no maximo 10 caracteres!" ;
    		document.getElementById("cQuantidadeAtual").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (pproduto.precoCusto < 1 ) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Preco Custo!";
    		document.getElementById("cPrecoCusto").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pproduto.precoCusto) {
        	$scope.mensagemRodape = "O campo Preco Custo deve ter no maximo 10 caracteres!" ;
    		document.getElementById("cPrecoCusto").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (pproduto.precoVenda < 1 ) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Preco Venda!";
    		document.getElementById("cPrecoVenda").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pproduto.precoVenda) {
        	$scope.mensagemRodape = "O campo Preco Venda deve ter no maximo 10 caracteres!" ;
    		document.getElementById("cPrecoVenda").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (!pproduto.cor) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Cor!";
    		document.getElementById("cCor").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pproduto.marca) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Marca!";
    		document.getElementById("cMarca").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pproduto.tamanho) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Tamanho!";
    		document.getElementById("cTamanho").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pproduto.unidadeMedida) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Unidade de Medida!";
    		document.getElementById("cUnidadeMedida").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	

    	requisicaoService.requisitarPOST("produto/salvar", pproduto, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mensagemRodape = retorno.msg;
    			$scope.mostrarAguarde = false;
        		return;
    		}
    		
    		$scope.mostrarAguarde    = false;
    		$scope.visualizaCadastro = false;
    		atualizarTela();
    	});
    }



    /*
    /////////////////////////////////////////////////////////////////
	//                                           //
    /////////////////////////////////////////////////////////////////
    */
    
    function atualizarTela(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		//obter todos os registros
    	requisicaoService.requisitarGET("produto/obterTodos", function(retorno) {
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
    	
    	requisicaoService.requisitarGET("cor/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.cores = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
    	
    	requisicaoService.requisitarGET("marca/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.marcas = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
    	
    	requisicaoService.requisitarGET("tamanho/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.tamanhos = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
    	
    	requisicaoService.requisitarGET("unidadeMedida/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.unidadeMedidas = retorno.data;
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
	}
	
	$scope.pesquisar = function(){
		$scope.produtosFiltradas = orderByFilter(filterFilter($scope.produtos,{id:$scope.idFilter,
													                     		descricao: $scope.descricaoFilter,
													                     		quantidadeMaxima: $scope.quantidadeMaximaFilter,
													                     		quantidadeMinima: $scope.quantidadeMinimaFilter,
													                    		quantidadeAtual: $scope.quantidadeAtualFilter,
													                    		precoCusto: $scope.precoCustoFilter,
													                     		precoVenda: $scope.precoVendaFilter,
													                     		cor:{descricao:$scope.descricaoCorFilter},
													                     		marca:{descricao:$scope.descricaoMarcaFilter},
													                     		tamanho:{descricao:$scope.descricaoTamanhoFilter},
													                     		unidadeMedida:{descricao:$scope.descricaoUnidadeMedidaFilter},
													                     		descStatus:$scope.descStatusFilter}), $scope.campoOrdenacao);
		
	}
	
	
    $scope.selecionarLinha = function(objeto) {
       $scope.objetoSelecionado = objeto;
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
