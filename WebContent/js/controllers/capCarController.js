app.controller("capCarController", function ($scope, $routeParams, requisicaoService, filterFilter, orderByFilter) {
	
	//VARIÁVEIS
	$scope.qualTela 			= $routeParams.tipo
	//$scope.caixaMovimentacoes 	= [];
	//$scope.caixas               = [];
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
	$scope.tela 				= "Financeiro > Contas"
	
	
	
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
				$scope.capCarS = retorno.data;
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
    	$scope.capCar.dataInicial = 	null;
    	$scope.capCar.dataVencimento = 	null;
    	$scope.capCar.dataPagamento = 	null;
    	$scope.capCar.valorLiquido = 	null;
    	$scope.capCar.valorTotal = 		null;
    	$scope.capCar.status =			[];
    	
    	
    	$scope.mostrarAguarde = 		false;
    	$scope.visualizaCadastro = 		true;
    }
    //////////////////////////////////////////////////////////////////////
	// FIM DA FUNÇÃO FUNÇÃO BTN INCLUIR 								//
    //////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL voltar RECEBE UMA FUNÇÃO SEM PARÂMETRO QUE CONTÉM A VARIÁVEL visualizaCadastro INICIALMENTE true AGORA COMO false//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    	$scope.voltar = function(){					
    		$scope.visualizaCadastro 	= false;
    	}
  	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL voltar RECEBE UMA FUNÇÃO SEM PARÂMETRO QUE CONTÉM A VARIÁVEL visualizaCadastro INICIALMENTE true AGORA COMO false//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  
  
  
  
  
  
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL selecionarLinha RECEBE UMA FUNÇÃO COM PARÂMETRO objeto QUE CONTÉM A VARIÁVEL objetoSelecionado RECEBENDO ESTE objeto//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  		
  		$scope.selecionarLinha = function(objeto) {
       		$scope.objetoSelecionado = objeto;
    	}
    	
    ////////////////////////////////////
   // FIM DA VARIÁVEL selecionarLinha//
  ////////////////////////////////////
  
  
  
  
  
  
  
  
  
  
 	//////////////////////////////////////////////////////////////////////////
   // VARIÁVEL BTN SALVAR QUE PERSISTE OS DADOS NOS IMPUTS NA BASE DE DADOS//
  //////////////////////////////////////////////////////////////////////////  
  
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
    
    //////////////////////////////
   // FIM DA VARIÁVEL ORDENAÇÃO//
  //////////////////////////////
  
  
  
  
  
  
  
  
  
  
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
													                     	status: $scope.statusFilter}), $scope.campoOrdenacao);
													                     	
		
	}
	////////////////////
   // FIM DA VARIÁVEL//
  ////////////////////
  
  
});