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
      this.empleados = resp
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
}
