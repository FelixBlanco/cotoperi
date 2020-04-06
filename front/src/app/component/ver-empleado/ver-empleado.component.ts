import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css']
})
export class VerEmpleadoComponent implements OnInit {

  empleado  : any = null
  pagos     : any = []
  cuentas   : any = []
  tipos     : any = []

  formCuentas   : FormGroup

  constructor(
    private rutaActiva : ActivatedRoute,
    private _empleado : EmpleadosService,
    private _cuentas : CuentasService ,
    private fb : FormBuilder,
    private _pago : PagosService
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
    const id = this.rutaActiva.snapshot.params.idEmpleado    
    this.getEmpleado(id)
    this.getTipos()
  }

  getTipos(){
    this._pago.getTipos().subscribe((resp:any) => {
      this.tipos = resp
    })
  }

  getEmpleado(id){
    this._empleado.showEmpleado(id).subscribe((resp:any) => {
      this.empleado = resp.empleado
      this.pagos = resp.pagos
      this.getCuentasEmpleados(id)
    })
  }

  getCuentasEmpleados(idEmpleado){
    this._cuentas.cuentasEmpleados(idEmpleado).subscribe((resp:any) => {
      this.cuentas = resp
    })
  }


  newCuenta(){
    const dataValue = this.formCuentas.value
    const data = {
      'nro'       : dataValue.nro,
      'titular'   :  dataValue.titular,
      'telefono'  : dataValue.telefono,
      'cedula'    : dataValue.cedula,
      'empleado_id' : this.empleado.id,
      'tipo_id'     : dataValue.tipo
    }
    this._cuentas.cuentasStore(data).subscribe((resp:any) => {
      this.getCuentasEmpleados(this.empleado.id)
      this.formCuentas.reset()      
    })
  }
}
