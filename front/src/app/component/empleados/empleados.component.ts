import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as $ from 'jquery';
import { PagosService } from 'src/app/services/pagos.service';

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
  empleado  : any = []
  cuentas   : any = []
  pagos     : any = []

  formCancela : FormGroup

  constructor(
    private _empleados : EmpleadosService,
    private fb : FormBuilder,
    private _pago : PagosService,
  ) { 
    this.formEmpleados = this.fb.group({
      username : ['',[Validators.required]],
      ubicacion : ['San Felix']
    })

    this.formCancela = this.fb.group({
      code : ['']
    })     

  }

  ngOnInit(): void {
    this.getEmpleado()    
  }

  getEmpleado(isUpdate : boolean = false, idEmpleado = null ){

    this.isLoadingGetEmpleados = true
    this._empleados.indexEmpleado().subscribe((resp:any) => {
      this.empleados = resp.empleados
      this.isLoadingGetEmpleados = false
      
      if(isUpdate){
        this.verEmpleado([], true, idEmpleado)
      }

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

  verEmpleado(data, isUpdate: boolean = false , idEmpleado: any = 'null'){ 
    
    this.openEmpleado = true

    if(isUpdate == true){      
      const setData = this.empleados.find((e) => e.id == idEmpleado )
      this.empleado = setData
      this.cuentas = setData.cuentas
      this.pagos = setData.ultimo_dos_pagos
    }else{      
      this.empleado = data
      this.cuentas = data.cuentas
      this.pagos = data.ultimo_dos_pagos
    }  
  }

  showLista(){
    this.openEmpleado = false
  }

  codePago(idPago){
    const formData = this.formCancela.value
    const info = { code : formData.code, idPago : idPago }    
    this._pago.pagar(info).subscribe((resp:any) => {      
      this.formCancela.reset();
      this.openEmpleado = false
      this.getEmpleado(true,resp.empleado_id)       
    })
  }
}
