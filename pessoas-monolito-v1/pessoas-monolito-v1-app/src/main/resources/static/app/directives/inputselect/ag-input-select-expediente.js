
angular
	.module('diretivas')
    .service('AgInputSelectExpediente', AgInputSelectExpediente );


	AgInputSelectExpediente.$inject = [
		'HttpService',
		'ConfigService'
    ];

    function AgInputSelectExpediente(HttpService, ConfigService){
    	
    	this.consultar = function(codigo, pos, nome, ignore, funcSucesso, funcError){

			pos = pos == undefined || pos == null ? 0 : pos;

			var args = "pos="+pos;


			if( codigo != null && codigo != "" ){
    			args = "codigo="+codigo;
    		}
    		
    		if( nome != null && nome != "" ){
    			if( args != "" ){
    				args = args + "&";
    			}
    			args = args + "nome="+nome;
    		}
    		
    		if( ignore != null && ignore != "" ){
    			if( args != "" ){
    				args = args + "&";
    			}
    			args = args + "ignorar="+ignore;
    		}
    		
    		if( args != "" ){
    			args = "?" + args; 
    		}
    		
    		HttpService.get("/expediente/consulta/componente"+args, funcSucesso, funcError);
    	}
    	
    }