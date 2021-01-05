import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { EmpleadosService } from 'src/app/services/empleados.service';

declare var $ : any

@Component({
  selector: 'app-new-empleado',
  templateUrl: './new-empleado.component.html',
  styleUrls: ['./new-empleado.component.css']
})
export class NewEmpleadoComponent implements OnInit {

  @Output() getEmpleados : EventEmitter = new EventEmitter()
  formEmpleados : FormGroup
  isLoading : boolean = false
  

  constructor(
    private fb : FormBuilder,
    private _empleados : EmpleadosService,
  ) { 
    this.formEmpleados = this.fb.group({
      username : ['',[Validators.required]],
      ubicacion : ['San Felix']
    })
  }

  ngOnInit(): void {
  }

  newEmpleado(){    
    this._empleados.storeEmpleado(this.formEmpleados.value).subscribe((resp:any) => {      
      this.formEmpleados.reset() 
      $("#staticBackdrop").modal('hide');
      // this.getEmpleados.emit(resp)     
    })
  }

}
