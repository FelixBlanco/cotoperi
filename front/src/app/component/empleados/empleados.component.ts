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
  
  isLoading : boolean = false
  isLoadingGetEmpleados  : boolean = false

  openEmpleado : boolean = false  // show Empleado
  
  filterSeach : string = null // para filtrar
  pageSize : number = 15  
  p: number = 1;  

  empleado : any = []

  constructor(
    private _empleados : EmpleadosService,    
  ) { 

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
        // this.verEmpleado([], true, idEmpleado)
      }

    })
  }

  showEmpleado(data){
    console.log('empleado',data)    
    this.toggleShowEmpleado(true)
    this.empleado = data
  }

  toggleShowEmpleado(is){    
    this.openEmpleado = is
  }


  setPagoPendiente(e){
    console.log('e public',e)
    this.empleado.find((e) => {
      e.pagosPendientes = (e.id == e)? true : false;
    })
  }

}
