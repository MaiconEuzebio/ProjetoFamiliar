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
	$scope.campoOrdenacao 		= '-dataAbertura';
	
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
    	$scope.abaSelecionada = 'caixa'
    		
    		requisicaoService.requisitarGET("caixa/abrirCaixa", function(retorno){
    			if (!retorno.isValid) {
        			$scope.mensagemModal  = retorno.data.str1;
    	        	$('#modalAtencao').modal();
    	    		$scope.mostrarAguarde = false;
    	    		return;
        		}
        		
        		$scope.caixa		       = {};
        		$scope.caixa.id       = null;
        		$scope.caixa.dataAbertura    = new Date();
        		$scope.caixa.dataFechamento   = null;
        		$scope.caixa.valorAbertura = null;
        		$scope.caixa.valorAtual = null;
        		$scope.caixa.valorFechamento   = null;
        		$scope.caixa.status = 1;
        		$scope.caixa.caixaMovimentacoes = [];
        		$scope.visualizaCadastro = true;  
    		});
 	
    }
    
    $scope.btnIncluirCaixaMovimentacao = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	$scope.caixaMovimentacao		       = {};
    	$scope.caixaMovimentacao.id       = null;
    	$scope.caixaMovimentacao.dataMovimentacao  = new Date();
    	$scope.caixaMovimentacao.valorMovimentacao   = null;
    	$scope.caixaMovimentacao.tipo   = null;
    	$scope.caixaMovimentacao.observacao = null;
    	$('#modalCaixaMovimentacao').modal();
    	
    	$scope.mostrarAguarde    = false;
    	$scope.visualizaCadastro = true;
    }
    
    $scope.btnFecharCaixa = function(){

    	$scope.caixa = $scope.objetoSelecionado;
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o caixa que deseja fechar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	
    	if ($scope.objetoSelecionado.status == 0) {
            $scope.mensagemModal  = "Caixa Fechado!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	$scope.caixa.dataFechamento = new Date();

    	$scope.valorFechamento = $scope.objetoSelecionado.valorAbertura;
    	for(i in $scope.caixa.caixaMovimentacoes){
    		//valorTotalCaixa += $scope.objetoSelecionado.caixaMovimentacoes[i].valorMovimentacao;

    		if ($scope.caixa.caixaMovimentacoes[i].tipo == "C"){
	    		$scope.valorFechamento += $scope.caixa.caixaMovimentacoes[i].valorMovimentacao;
	    	} else if ($scope.caixa.caixaMovimentacoes[i].tipo == "D"){
	    		$scope.valorFechamento -= $scope.caixa.caixaMovimentacoes[i].valorMovimentacao;
	    	}
    	}
    	$scope.valorFechamento = $scope.valorFechamento; 
		$scope.caixa.dataFechamento  = new Date($scope.caixa.dataFechamento);
		$scope.caixa.dataAbertura = new Date($scope.caixa.dataAbertura);
    	$scope.mostrarAguarde    = false;
        $scope.visualizaCadastro = true;
        $('#modalCaixaFechamento').modal();	
    }
    
    $scope.btnEditar = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = 'caixa'
    	
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	
    	if ($scope.objetoSelecionado.status == 0) {
            $scope.mensagemModal  = "Caixa Fechado!";
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
			$scope.caixa.dataAbertura  = new Date($scope.caixa.dataAbertura);
			$scope.caixa.dataFechamento  = null;
			$scope.caixa.valorFechamento = $scope.caixa.valorFechamento;
	    	$scope.mostrarAguarde    = false;
	        $scope.visualizaCadastro = true;
		});
    }
    
    $scope.btnEditarMovimentacao = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.abaSelecionada = "caixaMovimentacao"
    	
    	if (!$scope.objetoSelecionadoMovimentacao) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        	$('#modalAtencao').modal();
    		return;
    	}
    
    	    $scope.caixaMovimentacao = $scope.objetoSelecionadoMovimentacao;
    	    $scope.caixaMovimentacao.dataMovimentacao = new Date($scope.caixaMovimentacao.dataMovimentacao);
		    $scope.mostrarAguarde    = false;
		    $scope.visualizaCadastro = true;
		    $('#modalCaixaMovimentacao').modal();
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
    	requisicaoService.requisitarPOST("caixa/removerPorId", param, function(retorno){
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
    
    $scope.btnExcluirMovimentacao = function(){
    	if (!$scope.objetoSelecionadoMovimentacao) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}
    	    	
    	var posicao = $scope.caixa.caixaMovimentacoes.indexOf($scope.objetoSelecionadoMovimentacao);
    	$scope.caixa.caixaMovimentacoes.splice(posicao,1);
    	
    }

    $scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }

    $scope.btnSalvar = function(pcaixa){
    	$scope.caixa.dataFechamento = null;
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!pcaixa.dataAbertura) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Data de Abertura!";
    		document.getElementById("cDataAbertura").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
  
    	if (!pcaixa.valorAbertura) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Valor de Abertura!";
    		document.getElementById("cValorAbertura").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

    	requisicaoService.requisitarPOST("caixa/salvar", pcaixa, function(retorno){
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
    
    $scope.btnSalvarCaixaMovimentacao = function(pcaixaMovimentacao){
    	$scope.mensagemRodape = ""; 
    	
    	if (!pcaixaMovimentacao.dataMovimentacao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Data de Movimentacao!";
    		document.getElementById("cDataMovimentacao").focus();
    		return;
        }

    	if (!pcaixaMovimentacao.valorMovimentacao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Valor de Movimentacao!";
    		document.getElementById("cValorMovimentacao").focus();
    		return;
        }
    	
    	if (!pcaixaMovimentacao.tipo) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Tipo!";
    		document.getElementById("cTipo").focus();
    		return;
        }
    	
    	if (!pcaixaMovimentacao.observacao) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Observacao!";
    		document.getElementById("cObservacao").focus();
    		return;
        }
    	
    	if (pcaixaMovimentacao.observacao > 300) {
        	$scope.mensagemRodape = "O campo Observacao deve ter no maximo 300 caracteres!";
    		document.getElementById("cObservacao").focus();
    		return;
        }
    	
    	if($scope.objetoSelecionadoMovimentacao){
    		var posicao = $scope.caixa.caixaMovimentacoes.indexOf($scope.objetoSelecionadoMovimentacao);
    		$scope.caixa.caixaMovimentacoes[posicao] = pcaixaMovimentacao;
    	} else {
    		$scope.caixa.caixaMovimentacoes.push(pcaixaMovimentacao);
    	}
    	
		$('#modalCaixaMovimentacao').modal('hide');	
		$scope.atualizarValor();
    }
    
    $scope.btnConfirmarFechamento = function(pcaixa){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	$scope.caixa.dataFechamento = new Date();
    	$scope.caixa.valorFechamento = $scope.valorFechamento;
    	$scope.caixa.status = 0;
    	
    	requisicaoService.requisitarPOST("caixa/salvar", pcaixa, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mensagemRodape = retorno.msg;
    			$scope.mostrarAguarde = false;
        		return;
    		}
        	$('#modalCaixaFechamento').modal('hide');
   
    		$scope.mostrarAguarde    = false;
    		$scope.visualizaCadastro = false;
    		atualizarTela();
    	});
    	
    }
    
    $scope.btnVisualizarMovimentacao = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o caixa que deseja visualizar as Movimentações!";
            $('#modalAtencao').modal();
	        return;
	    }
    	
    	$scope.caixa = $scope.objetoSelecionado;
    	$scope.caixa.dataAbertura = new Date($scope.caixa.dataAbertura);
    	$scope.caixa.dataFechamento = new Date($scope.caixa.dataFechamento);
    	$scope.pesquisarCaixaMovimentacao();
	    $('#modalPesquisarMovimentacao').modal();
    }
    
    $scope.fecharModalCaixaMovimentacao = function(){
    	$('#modalCaixaMovimentacao').modal('hide');
    }
    
    $scope.fecharModalCaixaFechamento = function(){
    	$('#modalCaixaFechamento').modal('hide');
    }
    
    $scope.fecharModalPesquisarMovimentacao = function(){
    	$('#modalPesquisarMovimentacao').modal('hide');
    }
    
    $scope.atualizarValor = function (){
    	$scope.caixa.valorAtual = parseFloat($scope.caixa.valorAbertura);
    	for(i in $scope.caixa.caixaMovimentacoes){

    		if ($scope.caixa.caixaMovimentacoes[i].tipo == "C"){
	    		$scope.caixa.valorAtual += parseFloat($scope.caixa.caixaMovimentacoes[i].valorMovimentacao);
	    	} else if ($scope.caixa.caixaMovimentacoes[i].tipo == "D"){
	    		$scope.caixa.valorAtual -= parseFloat($scope.caixa.caixaMovimentacoes[i].valorMovimentacao);
	    	}
    	}
    }; 
    
    function atualizarTela(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  ="";
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
			
			for(i in $scope.caixas){
				$scope.caixas[i].dataAberturaStr = dateToStr(new Date($scope.caixas[i].dataAbertura));
				if($scope.caixas[i].dataFechamento){
				$scope.caixas[i].dataFechamentoStr = dateToStr(new Date($scope.caixas[i].dataFechamento));
				}
			}
			
			$scope.pesquisar();
			$scope.mostrarAguarde = false;
		});
    	
    	requisicaoService.requisitarGET("caixaMovimentacao/obterTodos", function(retorno) {
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
													                     dataAberturaStr: $scope.dataAberturaFilter,
													                     dataFechamentoStr: $scope.dataFechamentoFilter,
													                     valorAbertura: $scope.valorAberturaFilter,
													                     valorAtual: $scope.valorAtualFilter,
													                     valorFechamento: $scope.valorFechamentoFilter,
													                     caixaStatus: $scope.caixaStatusFilter}), $scope.campoOrdenacao);

	}
	$scope.pesquisarCaixaMovimentacao = function(){
		$scope.caixaMovimentacoesFiltradas = orderByFilter(filterFilter($scope.caixaMovimentacoes,{id:$scope.idFilter,
																         dataMovimentacao: $scope.dataMovimentacaoFilter,
																         valorMovimentacao: $scope.valorMovimentacaoFilter,
																         tipo: $scope.tipoFilter,
																         observacao: $scope.observacaoFilter,
																         caixaStatus: $scope.caixaStatusFilter}), $scope.campoOrdenacao);
	}
	
    $scope.selecionarLinha = function(objeto) {
       $scope.objetoSelecionado = objeto;
    }
    
    $scope.selecionarLinhaMovimentacao = function(objeto) {
       $scope.objetoSelecionadoMovimentacao = objeto;
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
