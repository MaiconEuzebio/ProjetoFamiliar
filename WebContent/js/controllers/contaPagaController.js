app.controller("contaPagaController", function ($scope, $routeParams, requisicaoService, filterFilter, orderByFilter) {

	$scope.tela 				= 'Consulta > Contas Pagas';
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
    	requisicaoService.requisitarGET("capCar/exibirTodosInativosP", function(retorno) {
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
    	requisicaoService.requisitarGET("capCar/obterTodosInativosP", function(retorno) {
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



  	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL PESQUISAR QUE RECEBE UMA FUNÇÃO QUE RECEBE UMA VARIÁVEL capCarSFiltradas E ORDENA PELOS FILTROS DECLARADOS NO HTML capCar//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $scope.pesquisar = function(){
		$scope.capCarSFiltradas = orderByFilter(filterFilter($scope.capCarS,{
																			id:$scope.idFilter,
																			cliente:{nomeRzSocial:$scope.nomeRzSocialFilter},
																			tipoCobranca:{descricao:$scope.descricaoFilter},
																			dataInicialStr:$scope.dataInicialFilter,
																			dataVencimentoStr:$scope.dataVencimentoFilter,
																			dataPagamentoStr:$scope.dataPagamentoFilter,
																			desconto:$scope.descontoFilter,
																			acrescimo:$scope.acrescimoFilter,
																			valorLiquido:$scope.valorLiquidoFilter,
																			valorTotal:$scope.valorTotalFilter}), $scope.campoOrdenacao);				
																			}
												              			
		$scope.selecionarLinha = function(objeto) {
       		$scope.objetoSelecionado = objeto;
    	}	
});