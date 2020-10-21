app.controller("caixaController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
		
	$scope.vizualizarCadastro = false;
	$scope.mostrarAguarde = false;
	$scope.tela = "Caixa > Caixa"	
	
    $scope.caixaMovimentacoes = [];
	$scope.caixas                = [];
	$scope.showModalConfirmacao = false;
	$scope.showModalAviso       = false;
	$scope.mostrarAguarde       = false;
	$scope.visualizaCadastro 	= false;
	$scope.mensagemModal 	 	= '';
	$scope.mensagemRodape 	 	= '';
	$scope.mostrarAguarde 		= true;
	$scope.campoOrdenacao 		= 'descricao';
	
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
    	$scope.mostrarAguarde = true;
    	
    	$scope.caixa		       = {};
    	$scope.caixa.id       = null;
    	$scope.caixa.dataAbertura   = null;
    	$scope.caixa.dataFechamento   = null;
    	$scope.caixa.valorAbertura   = null;
    	$scope.caixa.valorFechamento   = null;
    	$scope.caixa.status	   = 1;
    	$scope.caixa.caixaMovimentacoes = [];
    	
    	
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
    	var param = {
			int1: $scope.objetoSelecionado.id
		}
    	$scope.mostrarAguarde = true;
    	//obter a caixa
    	requisicaoService.requisitarPOST("caixa/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			
			$scope.caixa			   = retorno.data;
			$scope.caixa.dataAbertura  = new Date($scope.caixa.dataAbertura)
			$scope.caixa.dataFechamento  = new Date($scope.caixa.dataFechamento)	
	    	$scope.mostrarAguarde    = false;
	        $scope.visualizaCadastro = true;
		});
    }
    
    $scope.fecharModalCaixaMovimentacao = function(){
    	$('#modalCaixaMovimentacao').modal('hide');
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

    	//deletar
    	requisicaoService.requisitarPOST("caixa/removerPorId", param, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
    		
    		$scope.mostrarAguarde       = false;
    		$scope.showModalConfirmacao = false;
			$('#modalExcluir').modal('hide');
    		atualizarTela();
    	});
    }

    $scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }

    $scope.btnSalvar = function(pcaixa){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!pcaixa.dataAbertura) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Data de Abertura!";
    		document.getElementById("cDataAbertura").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pcaixa.dataFechamento) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Data de Fechamento!";
    		document.getElementById("cDataFechamento").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pcaixa.valorAbertura) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Valor de Abertura!";
    		document.getElementById("cValorAbertura").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if (!pcaixa.valorFechamento) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Valor de Fechamento!";
    		document.getElementById("cValorFechamento").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

    	requisicaoService.requisitarPOST("caixa/salvar", pcaixa, function(retorno){
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
    
    $scope.btnSalvarCaixaMovimentacao = function(pcaixaMovimentacao){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!pcaixaMovimentacao.dataMovimentacao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Data de Movimentacao!";
    		document.getElementById("cDataMovimentacao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

    	if (!pcaixaMovimentacao.valorMovimentacao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Valor de Movimentacao!";
    		document.getElementById("cValorMovimentacao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (!pcaixaMovimentacao.tipo) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Tipo!";
    		document.getElementById("cTipo").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (!pcaixaMovimentacao.observacao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Observacao!";
    		document.getElementById("cObservacao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	
    	if (pcaixaMovimentacao.observacao > 300) {
        	$scope.mensagemRodape = "O campo Observacao deve ter no maximo 300 caracteres!";
    		document.getElementById("cObservacao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

    	requisicaoService.requisitarPOST("caixaMovimentacao/salvar", pcaixaMovimentacao, function(retorno){
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
	// PAGINAÇÃO E TABELA                                          //
    /////////////////////////////////////////////////////////////////
    */
    
    function atualizarTela(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		//obter todos os registros
    	requisicaoService.requisitarGET("caixa/obterTodos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.caixas = retorno.data;
			
			$scope.pesquisar();
			
			$scope.mostrarAguarde = false;
		});
    	
    	requisicaoService.requisitarGET("caixaMovimentacao/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			$scope.caixaMovimentacoes = retorno.data;
			
			$scope.pesquisar();
			
			$scope.mostrarAguarde = false;
		});
	}
	
	$scope.pesquisar = function(){
		$scope.caixasFiltradas = orderByFilter(filterFilter($scope.caixas,{id:$scope.idFilter,
													                     dataAbertura: $scope.dataAberturaFilter,
													                     dataFechamento: $scope.dataFechamentoFilter,
													                     valorAbertura: $scope.valorAberturaFilter,
													                     valorFechamento: $scope.valorFechamentoFilter,
													                     caixaStatus: $scope.caixaStatusFilter}), $scope.campoOrdenacao);
		
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
	
	 $scope.btnIncluirCaixaMovimentacao = function(){
	    	$scope.caixaMovimentacao = {};
	    	$('#modalCaixaMovimenatcao').modal();
	    }
	 
	 $scope.btnSalvarCaixaMovimentacao = function(caixaMovimentacao){
			$scope.caixa.caixaMovimentacoes.push(caixaMovimentacao);
			$('#modalCaixaMovimentacao').modal('hide');
		}  
		
});
