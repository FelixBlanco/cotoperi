import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  formEmpleado  : FormGroup
  formPagos     : FormGroup
  formCuentas   : FormGroup

  empleados : any = []
  pagos     : any = []
  cuentas   : any = []
  tipos     : any = []

  newCuenta : boolean = false 
  newEmpleado : boolean = false
  
  empleado_id : string = null
  cuenta_id   : string = null

  procesoEmpleados : any = {
    isLoad  : false,
    data    : []
  }

  procesoCuentas : any = {
    isLoad  : false,
    data    : []
  }  

  ultimos_pagos : any = []

  constructor(
    private _pago : PagosService,
    private _cuenta : CuentasService,
    private _empleado : EmpleadosService,
    private fb : FormBuilder
  ) { 
    this.formEmpleado = this.fb.group({
      username  : ['',[Validators.required]],
      ubicacion : ['San Felix']
    })

    this.formPagos = this.fb.group({
      monto       : ['',[Validators.required]],
      observacion : ['pago semana']
    })

    this.formCuentas = this.fb.group({
      tipo      : [''],
      nro       : [''],
      titular   : [''],
      telefono  : [''],
      cedula    : [''],
    })    
  }

  ngOnInit(): void {
    this.getEmpleados()
    this.getCuentas()
    this.getTipos()
    this.ultimosPagos()
  }

  getTipos(){
    this._pago.getTipos().subscribe((resp:any) => {
      this.tipos = resp
    })
  }

  getEmpleados(){
    this._empleado.indexEmpleado().subscribe((resp : any) => { this.empleados = resp})
  }

  getCuentas(){
    this._cuenta.cuentasIndex().subscribe((resp:any) => this.cuentas = resp )
  }

  ultimosPagos(){
    this._pago.ultimosPagos().subscribe((resp:any) => {
      this.ultimos_pagos = resp
    })
  }

  concluir(){

    const empleados = this.formEmpleado.value
    const cuentas   = this.formCuentas.value
    const pago = this.formPagos.value
    
    this._pago.pagos({
      pago : pago,
      empleados : empleados,
      cuentas   : cuentas,      
      empleado_id : this.empleado_id,
      cuenta_id : this.cuenta_id,
      isNewEmpleado : this.newEmpleado,
      isNewCuenta : this.newCuenta
      
    }).subscribe((resp:any) => {
      this.formEmpleado.reset()
      this.formCuentas.reset()
      this.formPagos.reset()      
      this.newEmpleado = false
      this.newCuenta = false

      this.getEmpleados()
      this.getCuentas()       
      this.ultimosPagos()     
    })

  }
  

  addEmpleado(){
    const empleado = this.formEmpleado.value
    this._empleado.storeEmpleado(empleado).subscribe((resp:any) => {
      this.procesoEmpleados = {
        isLoad : true, data : resp
      }
    })
  }

  addCuentas(){
    const cuentas = this.formCuentas.value
    this._cuenta.cuentasStore(cuentas).subscribe((resp:any) => {
      this.procesoCuentas = {
        isLoad : true, data : resp
      }
    })
  }

  addTitular(event){    
    this.formCuentas.controls['titular'].setValue(event.target.value)
  }
}
