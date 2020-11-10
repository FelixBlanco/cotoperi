import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados : any = []
  formEmpleados : FormGroup
  isLoading : boolean = false
  isLoadingGetEmpleados  : boolean = false
  
  filterSeach : string = null // para filtrar
   
  // Open Informacion
  openEmpleado : boolean = false
  empleado : any = []
  cuentas : any = []
  pagos : any = []

  constructor(
    private _empleados : EmpleadosService,
    private fb : FormBuilder
  ) { 
    this.formEmpleados = this.fb.group({
      username : ['',[Validators.required]],
      ubicacion : ['San Felix']
    })
  }

  ngOnInit(): void {
    this.getEmpleado()    
  }

  getEmpleado(){
    this.isLoadingGetEmpleados = true
    this._empleados.indexEmpleado().subscribe((resp:any) => {
      this.empleados = resp.empleados
      this.isLoadingGetEmpleados = false
    })
  }

  newEmpleado(){
    this.isLoading = true
    this._empleados.storeEmpleado(this.formEmpleados.value).subscribe((resp:any) => {
      this.getEmpleado();
      this.isLoading = false
      this.formEmpleados.reset()      
    })
  }

  verEmpleado(data){
    console.log(data)
    this.openEmpleado = true
    this.empleado = data
    this.cuentas = data.cuentas
    this.pagos = data.ultimo_dos_pagos
  }

  showLista(){
    this.openEmpleado = false
  }
}
