app.controller("pessoaController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
	
	$scope.vizualizarCadastro = false;
	$scope.mostrarAguarde = false;
	$scope.tela = "Pessoa"
	$scope.abaSelecionada = 'pessoa'
	
	$scope.descricaoNomeRzSocial = 'Nome';
	$scope.descricaoCnpjCpf = 'CPF';
	
	$scope.tiposContato = [];
	$scope.tiposEndereco = [];
	$scope.pessoas                = [];
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
	// 							FUNÇÕES						       //
   /////////////////////////////////////////////////////////////////
    */
    $scope.voltar = function(){
    	$scope.visualizaCadastro 	= false;
    }

    $scope.btnIncluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	$scope.mostrarAguarde = true;
    	
    	$scope.pessoa		       = {};
    	$scope.pessoa.id       = null;
    	$scope.pessoa.nomeRzSocial   = null;
    	$scope.pessoa.cnpjCpf   = null;
    	$scope.pessoa.status	   = 1;
    	$scope.pessoa.contatos	=[];
    	$scope.pessoa.enderecos		=[];
    	
    	
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
    	//obter a pessoa
    	requisicaoService.requisitarPOST("pessoa/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			$scope.mensagemModal  = retorno.msg;
    			$scope.showModalAviso = true;
    			$scope.mostrarAguarde = false;
        		return;
    		}
			
			$scope.pessoa			   = retorno.data;

	    	$scope.mostrarAguarde    = false;
	        $scope.visualizaCadastro = true;
		});
    }
    
    $scope.fecharModalEndereco = function(){
    	$('#modalEndereco').modal('hide');
    }
    
     $scope.fecharModalContato = function(){
    	$('#modalContato').modal('hide');
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

    $scope.retornarPesquisa = function (){
    	$scope.visualizaCadastro = false;
    }

    $scope.btnSalvarPessoa = function(ppessoa){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!ppessoa){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Descrição!";
    		document.getElementById("cDescricao").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }
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
    
    
    
    
    
    
    
    
    
    
    
    
    $scope.btnSalvarContato = function(ccontato){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!ccontato){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Nome!";
    		document.getElementById("cnome").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

    	requisicaoService.requisitarPOST("contato/salvar", ccontato, function(retorno){
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
    
     $scope.btnSalvarEndereco = function(eendereco){
    	$scope.mensagemRodape = "";
    	$scope.mostrarAguarde = true;
    	
    	if (!eendereco){
    		$scope.mensagemRodape = "É necessário o preenchimento do campo Rua!";
    		document.getElementById("erua").focus();
    		$scope.mostrarAguarde = false;
    		return;
        }

    	requisicaoService.requisitarPOST("endereco/salvar", eendereco, function(retorno){
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
     //////////////////////////////////////////////////////////////////
	//           			FUNÇÃO ATUALIZAR TELA          			//
   //////////////////////////////////////////////////////////////////
    */
    
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
    	$scope.endereco = {};
    	$scope.endereco.status = 1;
    	$('#modalEndereco').modal();
    }
    
     $scope.btnIncluirContato = function(){
     	$scope.contato = {};
     	$scope.contato.status = 1;
     	$('#modalContato').modal();
     	
    }
	
	// dado push na lista enderecos no controller 
	
	$scope.btnSalvarEndereco = function(endereco){
		$scope.pessoa.enderecos.push(endereco);
		$('#modalEndereco').modal('hide');
	}    
	
	// dado push na lista contatos no controller 
	
	$scope.btnSalvarContato = function(contato){
		$scope.pessoa.contatos.push(contato);
		$('#modalContato').modal('hide');
	} 
    
});