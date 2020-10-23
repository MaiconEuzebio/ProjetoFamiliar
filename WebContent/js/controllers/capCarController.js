app.controller("capCarController", function ($scope, $routeParams, requisicaoService, filterFilter, orderByFilter) {
	
	//VARIÁVEIS
	$scope.qualTela 			= $routeParams.tipo
	$scope.showModalConfirmacao = false;
	$scope.showModalAviso       = false;
	$scope.mostrarAguarde       = false;
	$scope.visualizaCadastro 	= false;
	$scope.mensagemModal 	 	= '';
	$scope.mensagemRodape 	 	= '';
	$scope.mostrarAguarde 		= true;
	$scope.campoOrdenacao 		= 'descricao';
	$scope.vizualizarCadastro 	= false;
	$scope.mostrarAguarde 		= false;
	$scope.telaReceber 			= "Financeiro > Contas a receber"
	
	
	
	//////////////////////////////////////////////////////////////////
	// FUNÇÃO ATUALIZAR TELA ------>TRAZ OS DADOS DA BD NA TABELA   //
    //////////////////////////////////////////////////////////////////
	function atualizarTela(){
	
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		
    	requisicaoService.requisitarGET("capCar/obterTodos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
    			$scope.capCarS = retorno.data;
				$scope.pesquisar();
				$scope.mostrarAguarde = false;
		});
    	requisicaoService.requisitarGET("capCar/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
				$scope.tipoCapCarS = retorno.data;
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
		requisicaoService.requisitarGET("categoria/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
				$scope.categorias = retorno.data;
				$scope.pesquisar();
				$scope.mostrarAguarde = false;
		});		
    
    
    
    	
	}
	//////////////////////////////////////////////////////////////////////
	// FIM DA FUNÇÃO ATUALIZAR TELA 									//
    //////////////////////////////////////////////////////////////////////
    
    
    
	
	atualizarTela();	//CHAMADA DA FUNÇÃO ATUALIZAR TELA
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO BTN INCLUIR ------>CHAMA A TELA COM OS IMPUTS DE INCLUSÃO DE DADOS   //
    /////////////////////////////////////////////////////////////////////////////////
	$scope.btnIncluir = function(){
    	$scope.mensagemRodape = 		"";
    	$scope.mensagemModal  =		 	"";
    	$scope.mostrarAguarde = 		true;
    	
    	$scope.capCar = 				{};
    	$scope.capCar.id = 				null;
    	$scope.capCar.dataInicial = 	new Date();
    	$scope.capCar.dataVencimento = 	null;
    	$scope.capCar.dataPagamento = 	null;
    	$scope.capCar.valorLiquido = 	null;
    	$scope.capCar.valorTotal = 		null;
    	$scope.capCar.status =			1;
    	
    	$scope.mostrarAguarde = 		false;
    	$scope.visualizaCadastro = 		true;
    }
    //////////////////////////////////////////////////////////////////////
	// FIM DA FUNÇÃO FUNÇÃO BTN INCLUIR 								//
    //////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO BTN EDITAR ------>CHAMA A TELA COM OS IMPUTS DE INCLUSÃO DE DADOS    //
    /////////////////////////////////////////////////////////////////////////////////
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
    	
    	//OBTER A CAPCAR
    	requisicaoService.requisitarPOST("capCar/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			
			$scope.capCar			   		= retorno.data;
			$scope.capCar.dataInicial 		= new Date($scope.capCar.dataInicial);
			$scope.capCar.dataVencimento 	= new Date($scope.capCar.dataVencimento);
			$scope.capCar.dataPagamento 	= new Date($scope.capCar.dataPagamento);
	       	$scope.mostrarAguarde   	 	= false;
	        $scope.visualizaCadastro 		= true;
		});
    }
	//////////////////////////////////////////////////////////////////////
	// FIM DA FUNÇÃO FUNÇÃO BTN EDITAR	 								//
    //////////////////////////////////////////////////////////////////////
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO BTN EXCLUIR ------> CASO NÃO HAJA REGISTRO SELECIONADO EMITE MENSAGEM ABRINDO O MODAL//
    ////////////////////////////////////////////////////////////////////////////////////////////////
	
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
	/////////////////////////////////////
	// FIM DA FUNÇÃO FUNÇÃO BTN EXCLUIR//
    /////////////////////////////////////
	
	
	
	
	
	
	
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO BTN EXCLUIR ------> EXCLUSÃO DOS DADOS E EXECUTA SCRIPT DE EXCLUSÃO  						//
    /////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
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
    	requisicaoService.requisitarPOST("capCar/removerPorId", param, function(retorno){
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
	
	/////////////////////////////////////
	// FIM DA FUNÇÃO FUNÇÃO BTN EXCLUIR//
    /////////////////////////////////////
	
	
	
	
	$scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }
	
	
	
	
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL voltar RECEBE UMA FUNÇÃO SEM PARÂMETRO QUE CONTÉM A VARIÁVEL visualizaCadastro INICIALMENTE true AGORA COMO false//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    	$scope.voltar = function(){					
    		$scope.visualizaCadastro 	= false;
    	}
  	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL voltar RECEBE UMA FUNÇÃO SEM PARÂMETRO QUE CONTÉM A VARIÁVEL visualizaCadastro INICIALMENTE true AGORA COMO false//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  
  
  
  
  
  
		////////////////////////////
		//VARIÁVEL selecionarLinha//
		////////////////////////////	
								              			
		$scope.selecionarLinha = function(objeto) {
       		$scope.objetoSelecionado = objeto;
    	}
    	
    	////////////////////////////////////
    	// FIM DA VARIÁVEL selecionarLinha//
		////////////////////////////////////
  
  
  
  
  
  
  
  
  
  
 	//////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL BTN SALVAR QUE PERSISTE OS DADOS NOS IMPUTS NA BASE DE DADOS E VALIDAÇÕES//
  ////////////////////////////////////////////////////////////////////////////////////////
  
  $scope.btnSalvar = function(ccapCar){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!ccapCar.dataInicial) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Data de Abertura!";
    		document.getElementById("cDataInicial").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
        if (!ccapCar.dataVencimento) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Data de Vencimento!";
    		document.getElementById("cDataVencimento").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
        if (!ccapCar.dataPagamento) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Data de Pagamento!";
    		document.getElementById("cDataPagamento").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
        if (!ccapCar.cliente) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Cliente!";
    		document.getElementById("cCliente").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
        if (!ccapCar.categoria) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Categoria!";
    		document.getElementById("cCategoria").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
        if (!ccapCar.valorLiquido) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Valor Liquido!";
    		document.getElementById("cValorLiquido").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
        if (!ccapCar.valorTotal) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Valor Total!";
    		document.getElementById("cValorTotal").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
       
		requisicaoService.requisitarPOST("capCar/salvar", ccapCar, function(retorno){
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
    /////////////////////////////////////////////////////////////////////////////////
   // FIM DA VARIÁVEL BTN SALVAR QUE PERSISTE OS DADOS NOS IMPUTS NA BASE DE DADOS//
  /////////////////////////////////////////////////////////////////////////////////
  
  
  
   
  
  
  
  
  
  
  
  
  	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL PESQUISAR QUE RECEBE UMA FUNÇÃO QUE RECEBE UMA VARIÁVEL capCarSFiltradas E ORDENA PELOS FILTROS DECLARADOS NO HTML capCar//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $scope.pesquisar = function(){
		$scope.capCarSFiltradas = orderByFilter(filterFilter($scope.capCarS,{id:$scope.idFilter,
													                     	dataInicial: $scope.dataInicialFilter,
													                     	dataVencimento: $scope.dataVencimentoFilter,
													                     	dataPagamento: $scope.dataPagamentoFilter,
													                     	dataValorLiquido: $scope.valorLiquidoFilter,
													                     	dataValorTotal: $scope.valorTotalFilter,
													                     	cliente: $scope.descricaoClienteFilter,
													                     	categoria: $scope.descricaoCategoriaFilter}), $scope.campoOrdenacao);
	
												              			}
												              			
		
		
		
	////////////////////////////////////////////////////////////////////											              			
	// VARIÁVEL ORDENAÇÃO QUE ORDENA OS DADOS CONFORME CLICK NA TABELA//
	////////////////////////////////////////////////////////////////////
	
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
   ///////////////////////////////// 
   // FIM DA VARIÁVEL DE ORDENAÇÃO//
   /////////////////////////////////
   
   
   
});
	//////////////////////////////
   // FIM DA VARIÁVEL ORDENAÇÃO//
  //////////////////////////////
