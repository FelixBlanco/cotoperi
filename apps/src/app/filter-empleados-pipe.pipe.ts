import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpleadosPipe'
})
export class FilterEmpleadosPipePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(args[0] == null){
      return value
    }else{        
      const resulUsername = [];
      for (const valor of value) {              
        if (valor.username.toLowerCase().indexOf(args[0].toLowerCase()) > -1) {
          resulUsername.push(valor);
        };        
      };
       return resulUsername;    
    }  
  }

}
