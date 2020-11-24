app.controller("contaRecebidaController", function ($scope, $routeParams, requisicaoService, filterFilter, orderByFilter) {
	
	$scope.tela				    = 'Consulta > Contas Recebidas'
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
	$scope.ac					= 0;
	$scope.desc					= 0;
	$scope.porcentagem			= null;
	$scope.resultado			= null;
	$scope.resultadoAcrecimo 	= null;
	$scope.resultadoDesconto	= null;
	
	
	
	
	
	 //////////////////////////////////////////////////////////////////
	// FUNÇÃO ATUALIZAR TELA ------>TRAZ OS DADOS DA BD NA TABELA   //
   //////////////////////////////////////////////////////////////////
	function atualizarTela(){
	
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";											
    	$scope.mostrarAguarde = true;
    	
		
		//tras todos os atributos de capCar descritos em capCar.html
    	requisicaoService.requisitarGET("capCar/exibirTodosInativosR", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
				
    			$scope.capCarS = retorno.data;

				//preciso para formatar a data e se quiser, a hora no formato correto para ser entendido pela BD
				for(i in $scope.capCarS){
					$scope.capCarS[i].dataInicialStr = dateToStr(new Date($scope.capCarS[i].dataInicial));
					$scope.capCarS[i].dataVencimentoStr = dateToStr(new Date($scope.capCarS[i].dataVencimento));
					$scope.capCarS[i].dataPagamentoStr = dateToStr(new Date($scope.capCarS[i].dataPagamento));
				}

				$scope.pesquisar();
				$scope.mostrarAguarde = false;
		});
    	requisicaoService.requisitarGET("capCar/obterTodosInativosR", function(retorno) {
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
	 //////////////////////////////////////////////////////////////////////
	// FIM DA FUNÇÃO ATUALIZAR TELA 									//
   //////////////////////////////////////////////////////////////////////









	atualizarTela();	//CHAMADA DA FUNÇÃO ATUALIZAR TELA













	 /////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO BTN ESTORNO ------> CASO NÃO HAJA REGISTRO SELECIONADO EMITE MENSAGEM ABRINDO O MODAL//
   /////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.btnEstornar = function(){
		$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja estornar!";
        	$('#modalAtencao').modal();
    		return;
    	}

    	$scope.mensagemModal        = 'Deseja realmente estornar este recebimento?';
		$('#modalEstornar').modal();
		
		
	}
 	 /////////////////////////////////////
	// FIM DA FUNÇÃO FUNÇÃO BTN ESTORNO//
   /////////////////////////////////////
   //
   //
   //
   //
   //
   //
   //
	///////////////////////////////////////////////////////////////////////////////////////////////////
   // FUNÇÃO CONFIRMA ESTORNO ------> FUNÇÃO QUE EFETIVAMENTE CONFIRMAÇÃO DE EXCLUSÃO  				//
  ///////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.confirmaEstornar = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		var param = {
			int1: $scope.objetoSelecionado.id
		}
			

    	//deletar
    	requisicaoService.requisitarPOST("capCar/removerPorId", param, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.data.str1;
    			$('#modalAtencao').modal();
    			$scope.mostrarAguarde = false;
        		return;
    		}
    		
			
    		$scope.mostrarAguarde       = false;
    		$scope.showModalConfirmacao = false;
			$('#modalEstornar').modal('hide');
    		atualizarTela();
    	});
    }
	
	 //////////////////////////////////////////
	// FIM DA FUNÇÃO FUNÇÃO CONFIRMA ESTORNO//
   //////////////////////////////////////////



	 /////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO BTN EDITAR ------>CHAMA A TELA COM OS IMPUTS DE INCLUSÃO DE DADOS    //
   /////////////////////////////////////////////////////////////////////////////////
	$scope.btnVisualizar = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja visualizar!";
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
	







	





	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL voltar RECEBE UMA FUNÇÃO SEM PARÂMETRO QUE CONTÉM A VARIÁVEL visualizaCadastro INICIALMENTE true AGORA COMO false//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    	$scope.voltar = function(){					
    		$scope.visualizaCadastro 	= false;
    	}
  	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL voltar RECEBE UMA FUNÇÃO SEM PARÂMETRO QUE CONTÉM A VARIÁVEL visualizaCadastro INICIALMENTE true AGORA COMO false//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL PESQUISAR QUE RECEBE UMA FUNÇÃO QUE RECEBE UMA VARIÁVEL capCarSFiltradas E ORDENA PELOS FILTROS DECLARADOS NO HTML capCar//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $scope.pesquisar = function(){
		$scope.capCarSFiltradas = orderByFilter(filterFilter($scope.capCarS,{
																			id:$scope.idFilter,
																			cliente:{nomeRzSocial:$scope.nomeRzSocialFilter},
																			tipoCobranca:{tipoCobranca:$scope.tipoCobrancaFilter},
																			dataInicialStr:$scope.dataInicialFilter,
																			dataVencimentoStr:$scope.dataVencimentoFilter,
																			desconto:$scope.descontoFilter,
																			acrescimo:$scope.acrescimoFilter,
																			valorLiquido:$scope.valorLiquidoFilter,
																			valorTotal:$scope.valorTotalFilter}), $scope.campoOrdenacao);				
																			}         			
		$scope.selecionarLinha = function(objeto) {
       		$scope.objetoSelecionado = objeto;
    	}
		
		
	 ////////////////////////////////////////////////////////////////////											              			
	// VARIÁVEL ORDENAÇÃO QUE ORDENA OS DADOS CONFORME CLICK NA TABELA//
   ////////////////////////////////////////////////////////////////////



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