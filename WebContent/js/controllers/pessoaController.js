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
	
	
     /////////////////////////////////////////////////////////////////
	// 							FUNÇÕES						       //
   /////////////////////////////////////////////////////////////////
   
   
   
   
   
   
   
   
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






    $scope.btnEditar = function(){
		
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
           		$scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        		$('#modalAtencao').modal();
    			return;
    		}	
				$scope.endereco = $scope.objetoSelecionadoEndereco;
				$scope.mostrarAguarde    = false;
       			$scope.visualizaCadastro = true;
			
	};
	
	
	$scope.btnEditarContato = function(){
			console.log('TESTE CONTATO')
				$scope.mensagemRodape = "";
    			$scope.mensagemModal  = "";
    			$scope.abaSelecionada = 'contato';

			if (!$scope.objetoSelecionadoContato) {
           		$scope.mensagemModal   = "É necessário selecionar o registro que deseja editar!";
        		$('#modalAtencao').modal();
    			return;
    		}	
				$scope.contato = $scope.objetoSelecionadoContato;
				$scope.mostrarAguarde    = false;
       			$scope.visualizaCadastro = true;
	};
    






	$scope.apagarEnderecoOuContato = function(){
		if($scope.objetoSelecionadoEndereco){
			var posicaoDoElementoNoArray = $scope.pessoa.enderecos.indexOf($scope.objetoSelecionadoEndereco);
			$scope.pessoa.enderecos.splice(posicaoDoElementoNoArray,1);
		}else if($scope.objetoSelecionadoContato){
			var posicaoDoElementoNoArray = $scope.pessoa.contatos.indexOf($scope.objetoSelecionadoContato);
			$scope.pessoa.contatos.splice(posicaoDoElementoNoArray,1);
		}
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
    	requisicaoService.requisitarPOST("pessoa/removerPorId", param, function(retorno){
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



	/*
    $scope.confirmaExcluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal        = 'Deseja realmente excluir o registro?';
    	$scope.mostrarAguarde = true;
    	
		var param = {
			int1: $scope.objetoSelecionado.id
		}

    	//deletar
    	requisicaoService.requisitarPOST("pessoa/removerPorId", param, function(retorno){
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
    }*/





    $scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }






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
	
	$scope.pesquisar = function(){
		$scope.pessoasFiltradas = orderByFilter(filterFilter($scope.pessoas,{id:$scope.idFilter,
													                     nomeRzSocial: $scope.nomeRzSocialFilter}), $scope.campoOrdenacao);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    $scope.selecionarLinha = function(objeto) {
       $scope.objetoSelecionado = objeto;
    }
    
   	 ///////////////////////////////////////////////////////////////////////////////////////////////////////
	//		FUNÇÃO CHAMADA NO NG-CLICK QUE FAZ COM QUE UMA LINHA CLICADA SEJA UMA LINHA SELECIONADA		 //
   ///////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $scope.selecionarLinhaEndereco = function(endereco){
    	$scope.objetoSelecionadoEndereco = endereco;
    }
    
    $scope.selecionarLinhaContato = function(contato){
    	$scope.objetoSelecionadoContato = contato;
    }
    
     ///////////////////////////////////////////////////////////////////////////////////////////////////////
	//	variavel que recebe uma funcao que recebe um endereco, esse endereco recebe um objeto selecionado//
   ///////////////////////////////////////////////////////////////////////////////////////////////////////












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
    
    $scope.changeTipoPessoa = function(){
    	if($scope.pessoa.tipo == 'F'){
			$scope.descricaoNomeRzSocial = 'Nome';
			$scope.descricaoCnpjCpf = 'CPF';
    	}else if($scope.pessoa.tipo == 'J'){
    		$scope.descricaoNomeRzSocial = 'Razão social';
			$scope.descricaoCnpjCpf = 'CNPJ';
    	}
    	
    }
    
    $scope.btnIncluirEndereco = function(){
   		$scope.mensagemRodape = "";
    	$scope.endereco = {};
    	$scope.endereco.status = 1;
    	$('#modalEndereco').modal();
    }
    
     $scope.btnIncluirContato = function(){
     	$scope.mensagemRodape = "";
     	$scope.contato = {};
     	$scope.contato.status = 1;
     	$('#modalContato').modal();
     	
    }
    
    
    
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// VARIÁVEL QUE RECEBE UMA FUNÇÃO QUE RECEBE UM ENDEREÇO. SE NÃO endereco.rua, DÁ-SE UM FOCO NO CAMPO 'Rua'E PARA O FLUXO		//
	// SE TUDO ESTIVER CORRETO, VARIÁVEL pessoa.enderecos (QUE É UMA LISTA EM PESSOA), DÁ UM push E ENDEREÇO E O INSERE NA LISTA   //
	// MÉTODO .modal('hide') QUE TEM COMO PARÂMETRO $(#nomeDoModal)																  //
   	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.btnSalvarEndereco = function(endereco){
		$scope.mensagemRodape = "";
    	if (!endereco.rua){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Rua!";
    		document.getElementById("eRua").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
        $scope.pessoa.enderecos.push(endereco);
		$('#modalEndereco').modal('hide');
	}   
		
		
	$scope.btnSalvarContato = function(contato){
		$scope.mensagemRodape = "";
		if (!contato.nome){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Nome!";
    		document.getElementById("cNome").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
       	$scope.pessoa.contatos.push(contato);
		$('#modalContato').modal('hide');
	} 
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// VARIÁVEL QUE RECEBE UMA FUNÇÃO QUE RECEBE UM ENDEREÇO. SE NÃO endereco.rua, DÁ-SE UM FOCO NO CAMPO 'Rua'E PARA O FLUXO		//
	// SE TUDO ESTIVER CORRETO, VARIÁVEL pessoa.enderecos (QUE É UMA LISTA EM PESSOA), DÁ UM push E ENDEREÇO E O INSERE NA LISTA   //
	// MÉTODO .modal('hide') QUE TEM COMO PARÂMETRO $(#nomeDoModal)																  //
   	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
});