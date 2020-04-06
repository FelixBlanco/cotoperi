import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados : any = []
  formEmpleados : FormGroup

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
    this._empleados.indexEmpleado().subscribe((resp:any) => {
      this.empleados = resp
    })
  }

  newEmpleado(){
    this._empleados.storeEmpleado(this.formEmpleados.value).subscribe((resp:any) => {
      this.getEmpleado();
      this.formEmpleados.reset()
    })
  }
}
