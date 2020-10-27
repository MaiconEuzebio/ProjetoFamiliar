app.controller("capCarController", function ($scope, $routeParams, requisicaoService, filterFilter, orderByFilter) {
	
	//VARIÁVEIS
	$scope.qualTela 			= $routeParams.tipo //CRIADO VARIÁVEL $scope.qualTela QUE RECEBE $routeParams.tipo (BIBLIOTECA DO ANGULAR)
	console.log($routeParams.tipo);
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
	$scope.tela 			    = ""
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
    	$scope.mensagemModal  = "";											//AO INICIAR TELA...
    	$scope.mostrarAguarde = true;
    	
		var tipo;															//CRIADA VARIAVEL tipo QUE NÃO RECEBE NADA.
		if($routeParams.tipo == 'cap'){										//SE, $routeParams.tipo LA DE CIMA FOR cap NA MUDANÇA DE TELA
			tipo = 'P';														//VARIAVEL CRIADA VAZIA tipo RECEBE STRING 'P'.
			$scope.tela 			    = "Financeiro > Contas a Pagar"
		}
		else if($routeParams.tipo == 'car'){
			tipo = 'R';												//ENTÃO SE,  $routeParams.tipo LA DE CIMA FOR car NA MUDANÇA DE TELA
			$scope.tela 			    = "Financeiro > Contas a Receber"	//VARIAVEL CRIADA VAZIA tipo RECEBE STRING 'R'.
		}
		
		var param = {str1:tipo};								//param QUE É UMA VARIÁVEL OBJETO RECEBE ATRIBUTO str1 QUE RECEBE tipo 'R' OU 'P'.		
				
			
		console.log(param)
		
		//tras todos os atributos de capCar descritos em capCar.html
    	requisicaoService.requisitarPOST("capCar/exibirTodosAtivos", param , function(retorno) {
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
    


	
		




	 //////////////////////////////////////////////////////////////////
	// FUNÇÃO  CALCULAR O PERCENTUAL DE DESCONTO OU ACRÉSCIMO		//
   //////////////////////////////////////////////////////////////////		
		$scope.opcaoBtnCalcular = function(){
			
			if($scope.capCar.acrescimo != 0||$scope.capCar.desconto == 0){
				
				$scope.valor = $scope.capCar.acrescimo;
				$scope.porcentagem = ($scope.valor)*0.01;
				$scope.resultado = ($scope.capCar.valorLiquido * $scope.porcentagem);
				$scope.resultadoAcrecimo = parseInt($scope.capCar.valorLiquido) + parseInt($scope.resultado);
				$scope.capCar.valorTotal = parseInt($scope.resultadoAcrecimo);
				console.log($scope.resultadoAcrecimo);
			}
			else if($scope.capCar.desconto != 0||$scope.capCar.acrescimo == 0){
				
				$scope.valor = $scope.capCar.desconto;
				$scope.porcentagem = ($scope.valor)*0.01;
				$scope.resultado = ($scope.capCar.valorLiquido * $scope.porcentagem);
				$scope.resultadoDesconto = parseInt($scope.capCar.valorLiquido) - parseInt($scope.resultado);
				$scope.capCar.valorTotal = parseInt($scope.resultadoDesconto);
				console.log($scope.resultadoDesconto);
			}else{
				console.log("teste");
				$scope.mensagemRodape = "Não é possível dar desconto e acréscimo ao mesmo tempo!";
				return;
			}
		
			
		}
     //////////////////////////////////////////////////////////////////
	// FIM DA FUNÇÃO  CALCULAR O PERCENTUAL DE DESCONTO OU ACRÉSCIMO//
   //////////////////////////////////////////////////////////////////
    





	
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
		
		$scope.capCar.desconto	=		0
		$scope.capCar.acrescimo	=		0
    	$scope.capCar.status =			1;

		if($routeParams.tipo == 'cap'){
			$scope.capCar.tipo = 'P';
		}
		else if($routeParams.tipo == 'car'){
			$scope.capCar.tipo = "R";
		}
    	
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
	
	
	
	
	
	
	
	
	
	 /////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO BTN EXCLUIR ------> CASO NÃO HAJA REGISTRO SELECIONADO EMITE MENSAGEM ABRINDO O MODAL//
   /////////////////////////////////////////////////////////////////////////////////////////////////
	
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
	
	
	
	
	
	
	
	 /////////////////////////////////////////////////////////////////////////////////////////
	//MODAL DE PAGAMENTO ----> O BOTÃO DESTE MODAL É QUE CHAMA A FUNÇÃO CONFIRMAR PAGAMENTO//
   /////////////////////////////////////////////////////////////////////////////////////////	
	$scope.btnPagamento = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	
    	
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal   = "É necessário selecionar o registro que deseja efetuar o pagamento!";
        	$('#modalAtencao').modal();
    		return;
    	}
		
		var param = {
			int1: $scope.objetoSelecionado.id
		}
		
		$scope.mensagemModal        = 'Deseja realmente efetuar o pagamento?';
		$('#modalPagamento').modal();
	
    }
	 /////////////////////////////////////
	// FIM DO MODAL					   //
   /////////////////////////////////////
	//
	//
	//
	//
	//
	//
	//
	//
	 //////////////////////////////////////
	//FUNÇÃO DE CONFIRMAÇÃO DO PAGAMENTO// 
   //////////////////////////////////////	
	$scope.confirmaPagamento = function(){
			$scope.mensagemRodape = "";
    		$scope.mostrarAguarde = true;
			$scope.objetoSelecionado.status = 0;
			$scope.objetoSelecionado.dataPagamento = new Date();
			/*console.log($scope.objetoSelecionado.cliente);
			console.log($scope.objetoSelecionado.status);
			console.log($scope.objetoSelecionado.dataPagamento);*/
		
			requisicaoService.requisitarPOST("capCar/salvar",$scope.objetoSelecionado, function(retorno){
				if (!retorno.isValid) {
    				$scope.mensagemRodape = retorno.msg;
    				$scope.mostrarAguarde = false;
        			return;
    			}
    			$('#modalPagamento').modal('hide');
				
    			$scope.mostrarAguarde    = false;
    			$scope.visualizaCadastro = false;
    			atualizarTela();
			});
		}
 	 /////////////////////////////////////////////
	//FIM DA FUNÇÃO DE CONFIRMAÇÃO DO PAGAMENTO// 
   /////////////////////////////////////////////
	
	
	
	
	
	
	
	
	
	
	
	 //////////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO BTN EXCLUIR ------> CHAMA MODAL COM TELA DE CONFIRMAÇÃO DE EXCLUSÃO  						//
   //////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
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
	 //////////////////////////////////////////////////////
	// FIM DA FUNÇÃO BTN EXCLUIR 						//
   //////////////////////////////////////////////////////
   //
   //
   //
   //
   //
   //
   //
	///////////////////////////////////////////////////////////////////////////////////////////////////
   // FUNÇÃO CONFIRMA EXCLUIR ------> FUNÇÃO QUE EFETIVAMENTE CONFIRMAÇÃO DE EXCLUSÃO  				//
  ///////////////////////////////////////////////////////////////////////////////////////////////////
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
	
	 //////////////////////////////////////////
	// FIM DA FUNÇÃO FUNÇÃO CONFIRMA EXCLUIR//
   //////////////////////////////////////////
	
	
	
	
	
	
	
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
  
  
  
  
  
  
  
  
  
  
 	///////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL BTN SALVAR QUE PERSISTE OS DADOS NOS IMPUTS NA BASE DE DADOS E VALIDAÇÕES//
  ///////////////////////////////////////////////////////////////////////////////////////
  
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
			$scope.capCar.dataPagamento 	= null;
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
		$scope.capCarSFiltradas = orderByFilter(filterFilter($scope.capCarS,{
																			id:$scope.idFilter,
																			cliente:{nomeRzSocial:$scope.nomeRzSocialFilter},
																			categoria:{descricao:$scope.descricaoFilter},
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
