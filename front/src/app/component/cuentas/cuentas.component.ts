import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CuentasService } from 'src/app/services/cuentas.service';
import { PagosService } from 'src/app/services/pagos.service';


declare var $:any

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  
  @Input() idEmpleado : any = null
  @Output() aCuenta = new EventEmitter()

  formCuentas     : FormGroup
  tipos : any = []

  constructor(
    private fb : FormBuilder,
    private _cuentas : CuentasService,
    private _pago : PagosService,
  ) { 
    this.formCuentas = this.fb.group({
      tipo      : [''],
      nro       : [''],
      titular   : [''],
      telefono  : [''],
      cedula    : [''],
    }) 
  }

  ngOnInit(): void {
    this.getTipos()
  }


  getTipos(){
    this._pago.getTipos().subscribe((resp:any) => {
      this.tipos = resp
    })
  }

  newCuenta(){
    const dataValue = this.formCuentas.value
    const data = {
      'nro'       : dataValue.nro,
      'titular'   :  dataValue.titular,
      'telefono'  : dataValue.telefono,
      'cedula'    : dataValue.cedula,
      'empleado_id' : this.idEmpleado,
      'tipo_id'     : dataValue.tipo
    }
    this._cuentas.cuentasStore(data).subscribe((resp:any) => {      
      this.aCuenta.emit(resp)
      this.formCuentas.reset()      
      $("#nuevaCuenta").modal('hide')
    })
  }
}
