app.controller("pessoaController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
	
	$scope.vizualizarCadastro = false;				//VARIÁVEL vizualizarCadastro		INICIADA COMO false		
	$scope.mostrarAguarde = false;					//VARIÁVEL mostrarAguarde			INICIADA COMO false
	$scope.tela = "Pessoa"							//VARIÁVEL tela 					INICIADA COMO String 'Pessoa'
	$scope.abaSelecionada = 'pessoa'				//VARIÁVEL abaSelecionada 			INICIADA COMO String 'pessoa'
	$scope.descricaoNomeRzSocial = 'Nome';			//VARIÁVEL descricaoNomeRzSocial 	INICIADA COMO String 'Nome'
	$scope.descricaoCnpjCpf = 'CPF';				//VARIÁVEL descricaoCnpjCpf 		INICIADA COMO String 'CPF'
	$scope.tiposContato 		= 	[];				//LISTA tiposContato 				INICIADA
	$scope.tiposEndereco 		= 	[];				//LISTA tiposEndereco 				INICIADA
	$scope.pessoas              =	[];				//LISTA pessoas 					INICIADA
	$scope.showModalConfirmacao = false;			//VARIÁVEL showModalConfirmacao 	INICIADA COMO false
	$scope.showModalAviso       = false;			//VARIÁVEL showModalAviso  			INICIADA COMO false
	$scope.mostrarAguarde       = false;			//VARIÁVEL mostrarAguarde  			INICIADA COMO false
	$scope.visualizaCadastro 	= false;			//VARIÁVEL visualizaCadastro 		INICIADA COMO false
	$scope.mensagemModal 	 	= '';				//VARIÁVEL mensagemModal 			INICIADA
	$scope.mensagemRodape 	 	= '';				//VARIÁVEL mensagemRodape 			INICIADA
	$scope.mostrarAguarde 		= true;				//VARIÁVEL mostrarAguarde 			INICIADA COMO true
	$scope.campoOrdenacao 		= 'descricao';		//VARIÁVEL campoOrdenacao 			INICIADA COMO String 'descricao'
	
						
						
						
	
	
		atualizarTela();							//CHAMADA DA FUNÇÃO ATUALIZAR TELA ANTES DE TODO O SCRIPT
	
   
   
   
   
   
   
   
   
   	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL voltar RECEBE UMA FUNÇÃO SEM PARÂMETRO QUE CONTÉM A VARIÁVEL visualizaCadastro INICIALMENTE true AGORA COMO false//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    	$scope.voltar = function(){					
    	$scope.visualizaCadastro 	= false;
    }
  	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // VARIÁVEL voltar RECEBE UMA FUNÇÃO SEM PARÂMETRO QUE CONTÉM A VARIÁVEL visualizaCadastro INICIALMENTE true AGORA COMO false//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    
    
    
    
    
    
    
    
    

    $scope.btnIncluir = function(){
    	$scope.mensagemRodape = 		"";
    	$scope.mensagemModal  =		 	"";
    	$scope.mostrarAguarde = 		true;
		$scope.endereco = 				{};
		$scope.contato =				{};
    	$scope.pessoa = 				{};
    	$scope.pessoa.id = 				null;
    	$scope.pessoa.nomeRzSocial = 	null;
    	$scope.pessoa.cnpjCpf = 		null;
    	$scope.pessoa.status = 			1;
    	$scope.pessoa.contatos =		[];
    	$scope.pessoa.enderecos =		[];
    	
    	$scope.mostrarAguarde = 		false;
    	$scope.visualizaCadastro = 		true;
    }






    $scope.btnEditarPessoa = function(){
		
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
		$scope.abaSelecionada = 'pessoa';
    	
    		if (!$scope.objetoSelecionado) {
           		$scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        		$('#modalAtencao').modal();
    			return;
    		}
    		var param = {int1: $scope.objetoSelecionado.id}
    			$scope.mostrarAguarde = true;
    			//obter a pessoa
    		requisicaoService.requisitarPOST("pessoa/obterPorId", param , function(retorno) {
				if (!retorno.isValid) {
    				$scope.mensagemModal  = retorno.msg;
    				$scope.showModalAviso = true;
    				$scope.mostrarAguarde = false;
        			return;
    			}
			
					$scope.pessoa = retorno.data;
	    			$scope.mostrarAguarde    = false;
	        		$scope.visualizaCadastro = true;
			});
					
	
   }








	$scope.btnEditarEndereco = function(){
			console.log('TESTE ENDERECO')
				$scope.mensagemRodape = "";
    			$scope.mensagemModal  = "";
    			$scope.abaSelecionada = 'endereco';

			if (!$scope.objetoSelecionadoEndereco) {
           		$scope.mensagemModal   = "É necessário selecionar o endereço que deseja editar!";
        		$('#modalAtencao').modal();
    			return;
    		}	
				$scope.endereco = $scope.objetoSelecionadoEndereco;
				$scope.mostrarAguarde    = false;
       			$scope.visualizaCadastro = true;
				$('#modalEndereco').modal();
	};
	
	
	
	
	
	
	
	$scope.btnEditarContato = function(){
			console.log('TESTE CONTATO')
				$scope.mensagemRodape = "";
    			$scope.mensagemModal  = "";
    			$scope.abaSelecionada = 'contato';

			if (!$scope.objetoSelecionadoContato) {
           		$scope.mensagemModal   = "É necessário selecionar o contato que deseja editar!";
        		$('#modalAtencao').modal();
    			return;
    		}	
				$scope.contato = $scope.objetoSelecionadoContato;
				$scope.mostrarAguarde    = false;
       			$scope.visualizaCadastro = true;
				$('#modalContato').modal();
	};
	
	
	
	

    






	
    
    

    
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//VARIÁVEL RECEBE UMA FUNÇÃO VAZIA. VARIÁVEL POSIÇÃO DO VETOR, RECEBE INDEX DA POSIÇÃO DA LISTA DE ENDEREÇOS DE PESSOA//
 	// SPLICE DÁ UM CORTE EM LISTA DE ENDEREÇOS DA PESSOA (NA POSIÇÃO VARIÁVEL POSIÇÃO DO VETOR, 1 VEZ)					  //  
   	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
     $scope.apagarEndereco = function(){
     	var posicaoDoElementoNoArray = $scope.pessoa.enderecos.indexOf($scope.objetoSelecionadoEndereco);
		$scope.pessoa.enderecos.splice(posicaoDoElementoNoArray,1);
	};
    
   
	
	$scope.apagarContato = function(){
     	var posicaoDoElementoNoArray = $scope.pessoa.contatos.indexOf($scope.objetoSelecionadoContato);
		$scope.pessoa.contatos.splice(posicaoDoElementoNoArray,1);
	};
	
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//VARIÁVEL RECEBE UMA FUNÇÃO VAZIA. VARIÁVEL POSIÇÃO DO VETOR, RECEBE INDEX DA POSIÇÃO DA LISTA DE ENDEREÇOS DE PESSOA//
 	// SPLICE DÁ UM CORTE EM LISTA DE ENDEREÇOS DA PESSOA (NA POSIÇÃO VARIÁVEL POSIÇÃO DO VETOR, 1 VEZ)					  //  
   	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    
    
    
    
    
    
    
    
    
    
     /////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO VAZIA QUE TEM COMO PARÂMETRO $(#nomeDoModal) O MÉTODO .modal('hide');//
   /////////////////////////////////////////////////////////////////////////////////
    
    
    $scope.fecharModalEndereco = function(){
    	$('#modalEndereco').modal('hide');
    }
    
    
    
     $scope.fecharModalContato = function(){
    	$('#modalContato').modal('hide');
    }
    
     /////////////////////////////////////////////////////////////////////////////////
	// FUNÇÃO VAZIA QUE TEM COMO PARÂMETRO $(#nomeDoModal) O MÉTODO .modal('hide');//
   /////////////////////////////////////////////////////////////////////////////////
  












   ////////////////////////////////////////////////////////////////////////////
  //         FUNÇÃO ESPECIFICA QUE ABRE O MODAL DE EXCLUSÃO DE PESSOA       //
 ////////////////////////////////////////////////////////////////////////////

    $scope.btnExcluirPessoa = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionado) {
            $scope.mensagemModal  = "É necessário selecionar o registro que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}

    	$scope.mensagemModal        = 'Deseja realmente excluir o registro?';
		$('#modalExcluirPessoa').modal();
    }
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////
   //
   //
   //
   //
   //
   //
   //
   //
   ////////////////////////////////////////////////////////////////////////////////////////
  //         FUNÇÃO ESPECÍFICA USADA PARA MODAL PESSOA CHAMADA NO BOTÃO DO MODAL        //
 ////////////////////////////////////////////////////////////////////////////////////////

	$scope.confirmaExcluirPessoa = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		var param = {
			int1: $scope.objetoSelecionado.id
		}
			
		$('#modalExcluirPessoa').modal('hide');
    	//deletar
    	requisicaoService.requisitarPOST("pessoa/removerPorId", param, function(retorno){
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
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////









   ////////////////////////////////////////////////////////////////////////////
  //         FUNÇÃO ESPECIFICA QUE ABRE O MODAL DE EXCLUSÃO DE ENDERECO     //
 ////////////////////////////////////////////////////////////////////////////

    $scope.btnExcluirEndereco = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionadoEndereco) {
            $scope.mensagemModal  = "É necessário selecionar o endereço que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}

    	$scope.mensagemModal        = 'Deseja realmente excluir o endereço?';
		$('#modalExcluirEndereco').modal();
    }
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////
   //
   //
   //
   //
   //
   //
   //
   //
   ///////////////////////////////////////////////////////////////////////////////
  //         FUNÇÃO USADA PARA MODAL ENDERECO CHAMADA NO BOTÃO DO MODAL        //
 ///////////////////////////////////////////////////////////////////////////////
		$scope.apagarEndereco = function(){
     		var posicaoDoElementoNoArray = $scope.pessoa.enderecos.indexOf($scope.objetoSelecionadoEndereco);
			$scope.pessoa.enderecos.splice(posicaoDoElementoNoArray,1);
			$('#modalExcluirEndereco').modal('hide');
    		atualizarTela();
		};
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////







   ////////////////////////////////////////////////////////////////////////////
  //         FUNÇÃO ESPECIFICA QUE ABRE O MODAL DE EXCLUSÃO DE CONTATO      //
 ////////////////////////////////////////////////////////////////////////////

    $scope.btnExcluirContato = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionadoContato) {
            $scope.mensagemModal  = "É necessário selecionar o contato que deseja excluir!";
        	$('#modalAtencao').modal();
    		return;
    	}

    	$scope.mensagemModal        = 'Deseja realmente excluir o contato?';
		$('#modalExcluirContato').modal();
    }
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////
   //
   //
   //
   //
   //
   //
   //
   //
   ////////////////////////////////////////////////////////////////////////////////////////
  //         FUNÇÃO USADA PARA MODAL CONTATO CHAMADA NO BOTÃO DO MODAL      //
 ////////////////////////////////////////////////////////////////////////////////////////

	$scope.apagarContato = function(){
     	var posicaoDoElementoNoArray = $scope.pessoa.contatos.indexOf($scope.objetoSelecionadoContato);
		$scope.pessoa.contatos.splice(posicaoDoElementoNoArray,1);
		$('#modalExcluirContato').modal('hide');
		atualizarTela();
	};
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////











    






     //////////////////////////////////////////////////////////////////
	//           			FUNÇÃO SALVAR PESSOA           			//
   //////////////////////////////////////////////////////////////////
    $scope.btnSalvarPessoa = function(ppessoa){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	
    	if (!ppessoa.nomeRzSocial) {
        	$scope.mensagemRodape = "É necessário o preenchimento do campo Nome/Razão social!";
    		document.getElementById("cnomeRzSocial").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

    	requisicaoService.requisitarPOST("pessoa/salvar", ppessoa, function(retorno){
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
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   ////////////////////////////// 
    
    
 
    
   







   
     //////////////////////////////////////////////////////////////////
	//           			FUNÇÃO ATUALIZAR TELA          			//
   //////////////////////////////////////////////////////////////////
    
    function atualizarTela(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
		//obter todos os registros
    	requisicaoService.requisitarGET("pessoa/obterTodos", function(retorno) {
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
	}
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   ////////////////////////////// 	
	
	
	
	
	
	
	
	
	
	requisicaoService.requisitarGET("tipoEndereco/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
				$scope.tiposEndereco = retorno.data;
				$scope.pesquisar();
				$scope.mostrarAguarde = false;
		});
		
		
		
		
		
		requisicaoService.requisitarGET("tipoContato/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
				$scope.tiposContato = retorno.data;
				$scope.pesquisar();
				$scope.mostrarAguarde = false;
		});
		
	
	
	 ///////////////////////////////////////////////////////////////////////////////////
	//		FUNÇÃO PARA ORDENAR OS CAMPOS CONFORME OS CRITÉRIOS DE ORDENAÇÃO		 //
   ///////////////////////////////////////////////////////////////////////////////////	
	$scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }
	 //////////////////////////////
	//      FIM DA FUNÇÃO		//
   ////////////////////////////// 
		
		
		
	 ///////////////////////////////////////////////////////////////////////////////////
	//		FUNÇÃO PARA ORDENAR OS CAMPOS CONFORME OS CRITÉRIOS DE ORDENAÇÃO		 //
   ///////////////////////////////////////////////////////////////////////////////////	
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
	//      FIM DA FUNÇÃO		//
   //////////////////////////////  
   //
   //
   //
   //
   //
   //
   //
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //		FUNÇÃO PARA ORDENAR OS CAMPOS CONFORME OS CRITÉRIOS E TAMBÉM PARA EXIBIÇÃO DOS DADOS NA TELA	   //
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.pesquisar = function(){
		$scope.pessoasFiltradas = orderByFilter(filterFilter($scope.pessoas,{id:$scope.idFilter,
													                     	nomeRzSocial: $scope.nomeRzSocialFilter,
																		 	cnpjCpf: $scope.cnpjCpfFilter,
																			tipo: $scope.tipoFilter,
																			descStatus: $scope.descStatusFilter}), $scope.campoOrdenacao);	
	}
	 //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////
	
	
	
	
	
	
	
	
	
	
	 ///////////////////////////////////////////////////////////////////////////
	//		FUNÇÃO PARA MUDAR O TIPO DA PESSOA PARA FISICA OU JURIDICA		 //
   ///////////////////////////////////////////////////////////////////////////	
    $scope.changeTipoPessoa = function(){
    	if($scope.pessoa.tipo == 'F'){
			$scope.descricaoNomeRzSocial = 'Nome';
			$scope.descricaoCnpjCpf = 'CPF';
    	}else if($scope.pessoa.tipo == 'J'){
    		$scope.descricaoNomeRzSocial = 'Razão social';
			$scope.descricaoCnpjCpf = 'CNPJ';
    	}
    	
    }
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   ////////////////////////////// 
	
	
	
	
	
	
	
	
   	 ///////////////////////////////////////////////////////////////////////////////////////////////////////
	//		FUNÇÃO CHAMADA NO NG-CLICK QUE FAZ COM QUE UMA LINHA CLICADA SEJA UMA LINHA SELECIONADA		 //
   ///////////////////////////////////////////////////////////////////////////////////////////////////////	
	//SELECIONAR LINHA DE PESSOA
    $scope.selecionarLinha = function(objeto) {
       $scope.objetoSelecionado = objeto;
    }
	//SELECIONAR LINHA DE ENDERECO
    $scope.selecionarLinhaEndereco = function(objeto){
    	$scope.objetoSelecionadoEndereco = objeto;
    }
    //SELECIONAR LINHA DE CONTATO
    $scope.selecionarLinhaContato = function(objeto){
    	$scope.objetoSelecionadoContato = objeto;
    }
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   ////////////////////////////// 
  






   ////////////////////////////////////////////////////////////////////////////
  //         FUNÇÃO ESPECIFICA QUE ABRE O MODAL DE INCLUSÃO DE ENDERECO     //
 ////////////////////////////////////////////////////////////////////////////
    $scope.btnIncluirEndereco = function(){
   		$scope.mensagemRodape = "";
    	$scope.endereco = {};
    	$scope.endereco.status = 1;
    	$('#modalEndereco').modal();
    }
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   ////////////////////////////// 
   //
   //
   //
   //
   //
   //
   //
   ///////////////////////////////////////////////////
  //         FUNÇÃO USADA NO BOTÃO DO MODAL        //
 ///////////////////////////////////////////////////
	$scope.btnSalvarEndereco = function(endereco){
		$scope.mensagemRodape = "";
    	if (!endereco.rua){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Rua!";
    		document.getElementById("eRua").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
    	if($scope.objetoSelecionadoEndereco){
    		var posicao = $scope.pessoa.enderecos.indexOf($scope.objetoSelecionadoEndereco);
    		$scope.pessoa.enderecos[posicao] = endereco;
    	} else {
    		$scope.pessoa.enderecos.push(endereco);
    	}
		$('#modalEndereco').modal('hide');
	}
	 //////////////////////////////
	//      FIM DA FUNÇÃO		//
   ////////////////////////////// 






   ////////////////////////////////////////////////////////////////////////////
  //         FUNÇÃO ESPECIFICA QUE ABRE O MODAL DE INCLUSÃO DE CONTATO      //
 ////////////////////////////////////////////////////////////////////////////
     $scope.btnIncluirContato = function(){
     	$scope.mensagemRodape = "";
     	$scope.contato = {};
     	$scope.contato.status = 1;
     	$('#modalContato').modal();
     	
    }
     //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////
   //
   //
   //
   //
   //
   //
   //	
   ///////////////////////////////////////////////////
  //         FUNÇÃO USADA NO BOTÃO DO MODAL        //
 ///////////////////////////////////////////////////		
	$scope.btnSalvarContato = function(contato){
		$scope.mensagemRodape = "";
		if (!contato.nome){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Nome!";
    		document.getElementById("cNome").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
		if($scope.objetoSelecionadoContato){
    		var posicao = $scope.pessoa.contatos.indexOf($scope.objetoSelecionadoContato);
    		$scope.pessoa.contatos[posicao] = contato;
    	} else {
    		$scope.pessoa.contatos.push(contato);
    	}
		$('#modalContato').modal('hide');
	} 
	 //////////////////////////////
	//      FIM DA FUNÇÃO		//
   //////////////////////////////

    
});