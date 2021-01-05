import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-show-empleado',
  templateUrl: './show-empleado.component.html',
  styleUrls: ['./show-empleado.component.css']
})
export class ShowEmpleadoComponent implements OnInit {

  @Input() dataEmpleado : any = []
  @Output() closeShowEmpleado = new EventEmitter
  @Output() changePagoPendiente = new EventEmitter

  empleado  : any = []
  cuentas   : any = []
  ultimos_pagos     : any = []

  formCancela : FormGroup

  constructor(
    private fb : FormBuilder,
    private _pago : PagosService,
  ) {
    this.formCancela = this.fb.group({
      code : ['']
    })     
  }
  
  ngOnInit(): void {    
    this.cuentas = this.dataEmpleado.cuentas
    this.ultimos_pagos = this.dataEmpleado.ultimo_dos_pagos      
  }

  codePago(idPago){
    const formData = this.formCancela.value
    const info = { code : formData.code, idPago : idPago }    
    this._pago.pagar(info).subscribe((resp:any) => {      
      
      this.ultimos_pagos.find((u) => {
        if(u.idPago == idPago){
          u.code = formData.code;
          u.is_pago = 1;
          
          this.changePagoPendiente.emit(this.dataEmpleado.id) // Cambiamos el status en la lista de afuera
        }
      })
      
      this.formCancela.reset();               
      
    })
  }

  cShowEmpleado(){
    this.closeShowEmpleado.emit(false)
  }

  addCuenta(e){
    this.cuentas.push(e)
  }
  
  setUltimosPagos(e){    
    this.ultimos_pagos.push(e)
  }
}
