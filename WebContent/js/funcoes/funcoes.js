/*----------------------------------------------------------------------------*/
/* validação de CNPJ                                                          */
/*----------------------------------------------------------------------------*/
function validar_cnpj( cnpj ) {
	 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function currToStr(valor, casas, separador_decimal, separador_milhar){ 
	 
    var valor_total = parseInt(valor * (Math.pow(10,casas)));
    var inteiros =  parseInt(parseInt(valor * (Math.pow(10,casas))) / parseFloat(Math.pow(10,casas)));
    var centavos = parseInt(parseInt(valor * (Math.pow(10,casas))) % parseFloat(Math.pow(10,casas)));
  
    if(centavos%10 == 0 && centavos+"".length<2 ){
        centavos = centavos+"0";
    }else if(centavos<10){
        centavos = "0"+centavos;
    }
  
    var milhares = parseInt(inteiros/1000);
    inteiros = inteiros % 1000; 
 
    var retorno = "";
 
    if(milhares>0){
        retorno = milhares+""+separador_milhar+""+retorno
        if(inteiros == 0){
            inteiros = "000";
        } else if(inteiros < 10){
            inteiros = "00"+inteiros; 
        } else if(inteiros < 100){
            inteiros = "0"+inteiros; 
        }
    }
    retorno += inteiros+""+separador_decimal+""+centavos;
    return retorno; 
}

function lpad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function formatarDateTime(pdata){
	var d = new Date;
    
	dformat = [lpad(d.getDate(), 2, '0'),
	           lpad(d.getMonth()+1, 2, '0'),
               d.getFullYear()].join('/')+' '+
              [lpad(d.getHours(), 2, '0'),
               lpad(d.getMinutes(), 2, '0'),
               lpad(d.getSeconds(), 2, '0')].join(':');
	
	return dformat;
}

function dateToStr(pdata){
    if (!isNaN(pdata)) {
		var dia = pdata.getDate();
	    if (dia.toString().length == 1)
	      dia = "0"+dia;
	    var mes = pdata.getMonth()+1;
	    if (mes.toString().length == 1)
	      mes = "0"+mes;
	    var ano = pdata.getFullYear();  
	    return dia+"/"+mes+"/"+ano;
	}
}

function dateTimeToStr(pdata){
	if(typeof pdata == "number"){
		pdata = new Date(pdata);
	}
    if (!isNaN(pdata)) {
		var dia = pdata.getDate();
	    if (dia.toString().length == 1)
	      dia = "0"+dia;
	    var mes = pdata.getMonth()+1;
	    if (mes.toString().length == 1)
	      mes = "0"+mes;
	    var ano = pdata.getFullYear(); 
	    
	    var hora = lpad(pdata.getHours(),2,'0');
	    var minuto = lpad(pdata.getMinutes(),2,'0');
	    var segundos = lpad(pdata.getSeconds(),2,'0');
	    
	    return dia+"/"+mes+"/"+ano+" "+hora+":"+minuto+":"+segundos;
	}
}

function timeToStr(pdata){
	if(typeof pdata == "number"){
		pdata = new Date(pdata);
	}
    if (!isNaN(pdata)) {
	    var hora = lpad(pdata.getHours(),2,'0');
	    var minuto = lpad(pdata.getMinutes(),2,'0');
	    var segundos = lpad(pdata.getSeconds(),2,'0');
	    
	    return hora+":"+minuto+":"+segundos;
	}
}

function browserUsuario(){

    var b = navigator.appName;
    var ua = navigator.userAgent.toLowerCase();
    var Browser = {};
    Browser.safari = ua.indexOf('safari') > -1 && ua.indexOf('chrome') == -1;
    Browser.opera = ua.indexOf('opera') > -1;
    Browser.firefox = ua.indexOf('firefox') > -1;
    Browser.ie = !Browser.opera && b == 'Microsoft Internet Explorer';
    Browser.gecko = ua.indexOf('gecko') > -1;
    delete b;
    delete ua;

	var ret = "outro";
	if (Browser.firefox){ // firefox
		ret = "mozilla";
	} else if (Browser.ie){ //Internet Explorer (do mal)
		ret = "ie";
	} else if (Browser.safari){ //Safari
		ret = "safari";
	} else if (Browser.opera){ // Opera 
		ret = "opera";
	} 
	
	return ret;
}

function montaData(str) {
	if (str != undefined) {
		var parts = str.split('/');
	    return new Date(parts[2],parts[1]-1,parts[0]);
	}
}

function montaDataHora(pData, pHora) {
	if ((pData != undefined) &&
	    (pHora != undefined)) {
		var partsData = pData.split('/');
		var partsHora = pHora.split(':');
		
	    return new Date(partsData[2],partsData[1]-1,partsData[0], partsHora[0], partsHora[1], partsHora[2]);
	}
}

function mostraData(str) {

	var ano = str.substring(0, 4);
	var mes = str.substring(6, 8);
	var dia = str.substring(9, 10);

	var data;

	data = mes;
	data += "-";
	data += dia;
	data += "-";
	data += ano;

	return data;
}

function dataValida(str) {
	var data = str;
    var dia = data.substring(0,2)
    var mes = data.substring(3,5)
    var ano = data.substring(6,10)
 
    //Criando um objeto Date usando os valores ano, mes e dia.
    var novaData = new Date(ano,(mes-1),dia);
 
    var mesmoDia = parseInt(dia,10) == parseInt(novaData.getDate());
    var mesmoMes = parseInt(mes,10) == parseInt(novaData.getMonth())+1;
    var mesmoAno = parseInt(ano) == parseInt(novaData.getFullYear());
 
    if (!((mesmoDia) && (mesmoMes) && (mesmoAno))){
        return false;
    }  
    
    return true;    
}

function horaValida(str) {
	if (str == undefined){
		return false;
	}
	
	var partsHora = str.split(':');
	
	//validar preenchimento
	if (!partsHora[0]){
		return false;
	}
	
	if (!partsHora[1]){
		return false;
	}
	
	if (!partsHora[2]){
		return false;
	}
	
	//validar tamanho
	if (partsHora[0].length != 2){
		return false;
	}
	
	if (partsHora[1].length != 2){
		return false;
	}
	
	if (partsHora[2].length != 2){
		return false;
	}
	
	//validar valor
	if (parseInt(partsHora[0]) > 23){
		return false;
	}
	
	if (parseInt(partsHora[1]) > 59){
		return false;
	}
	
	if (parseInt(partsHora[2]) > 59){
		return false;
	}
	
	return true;
}
