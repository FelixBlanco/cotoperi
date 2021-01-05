import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';
declare var $:any 

@Component({
  selector: 'app-agregar-pagos',
  templateUrl: './agregar-pagos.component.html',
  styleUrls: ['./agregar-pagos.component.css']
})
export class AgregarPagosComponent implements OnInit {

  @Input() idEmpleado : any = null
  @Input() cuentas : any = []
  @Output() aUltimosPagos = new EventEmitter()
  formAddPago     : FormGroup

  constructor(
    private fb : FormBuilder,
    private _pago : PagosService,    
  ) { 
    this.formAddPago = this.fb.group({
      'monto'       : [''],
      'observacion' : ['Pago semana'],
      'cuenta_id'   : [''],
      'empleado_id' : [''],    
    })    
  }

  ngOnInit(): void {
    this.formAddPago.controls['empleado_id'].setValue(this.idEmpleado);
  }

  agregarPago(){
    this._pago.addPagoEmpleados(this.formAddPago.value).subscribe((resp:any)=> {        
      this.formAddPago.controls['monto'].setValue('0')
      this.formAddPago.controls['observacion'].setValue('pago semana')
      $("#addPagos").modal('hide')
      this.aUltimosPagos.emit(resp.ultimos_pagos)
    }) 
   }

}
