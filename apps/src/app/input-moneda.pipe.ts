import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputMoneda'
})
export class InputMonedaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
  
    var num = value.replace(/\./g,'');
    
    if(!isNaN(num)){
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
      num = num.split('').reverse().join('').replace(/^[\.]/,'');
      return num;
    }else{       
      return value.replace(/[^\d\.]*/g,'');
    }
    
  }

}
