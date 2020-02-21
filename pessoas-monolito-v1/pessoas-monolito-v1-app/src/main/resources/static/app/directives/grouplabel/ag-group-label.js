angular
	.module('diretivas')
	.directive('agGroupLabel', function($compile) {
	  return {
        replace: false,
		restrict     : 'EA',
	    templateUrl  : 'app/directives/grouplabel/ag-group-label.html',
	    controller   : 'AgGroupLabelController',
	    controllerAs : 'agGroupLabelController',
	    require: ['^form', 'ngModel'],
	    scope: {
	    	ngLabel: '@',
	    	ngObrigatorio: '=',
	    	ngFor: '@',
	    	ngName: '@',
			ngBlur: '=',
	    	ngForm: '@',
	    	ngValor: '=',
	    	ngType: '@',
	    	placeholder: '@',
	    	ngIcon: '@',
			ngBloqueado: '='
	      },
	      
	    link: function(scope, element, attrs, ctrls){

			scope.ngDisabled = scope.ngDisabled == null || scope.ngDisabled == undefined ? false : scope.ngDisabled;

	    	if( scope.ngType == null ){
	    		scope.ngType = "text";
	    	}
	    	
	        var campo = element.find("input")[0];
	        campo.name=scope.ngName;
	        
	        $compile(campo)(scope);
	        
	        scope.form = ctrls[0];
	        scope.campo = scope.form[scope.ngName];
	        
	        var ngModel = ctrls[1];
	        
	        scope.$watch('ngValor', function() {
	        	scope.nome = scope.ngValor;
	        });
	        
	        scope.$watch('nome', function() {
	            ngModel.$setViewValue(scope.nome);
	        });
	        
	    	scope.passouOnChange = false;
	    	scope.classPrincipal = '';
	    	scope.validarClass = function(){
	    		
	    		if( !scope.ngObrigatorio ){
	    			return 'form-group';
	    		}
	    		
	    		if( !scope.passouOnChange ) 
	    			return 'form-group' 
    			else if( scope.campo.$invalid ) 
    				return 'form-group has-error' 
				else 
					return ' form-group ';//has-success
	    	};
	    	
	    	scope.validarClassBasic = function(){
	    		
	    		if( !scope.ngObrigatorio ){
	    			return 'form-group';
	    		}
	    		
    			if( scope.campo.$invalid ){
    				scope.$parent.setErroForm();
    				scope.passouOnChange = true;
    				return 'form-group has-error' 
    			}else 
					return ' form-group ';//has-success
	    	}
	    	
	    	
	    	 scope.$on('formClickValidation', function(event, data) { 
		    	  scope.validarClassBasic(); 
	    	  });
	    	 
	    	scope.valid = function(){

	    		scope.passouOnChange = true;
	    		/*
	    		if( !scope.ngObrigatorio ){
	    			scope.classPrincipal = '';
	    			return;
	    		}
	    		
	    		var campo = scope.form[scope.ngName];
	    		
	    		var verf = angular.toJson(campo.$error) != '{}';
	    		scope.classPrincipal = verf ? 'has-error' : 'has-success';
	    		*/
	    		
	        };
	    }  
	  };
	});