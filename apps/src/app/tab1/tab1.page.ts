import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tab1Service } from './tab1.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  empleados : any = []
  formEmpleados : FormGroup
  isLoading : boolean = false
  isLoadingGetEmpleados  : boolean = false
  
  filterSeach : string = null // para filtrar
   
  constructor(
    private _empleados : Tab1Service,
    private fb : FormBuilder
  ) { 
    this.formEmpleados = this.fb.group({
      username : ['',[Validators.required]],
      ubicacion : ['San Felix']
    })
  }

  ngOnInit() {
    this.getEmpleado()    
  }

  getEmpleado(){    
    this.isLoadingGetEmpleados = true;
    this._empleados.getEmpleado().subscribe((resp:any) => {
      this.empleados = resp
      this.isLoadingGetEmpleados = false
    })
  }

  newEmpleado(){
    this.isLoading = true;
    this._empleados.storeEmpleado(this.formEmpleados.value).subscribe((resp:any) => {
      this.getEmpleado();
      this.isLoading = false
      this.formEmpleados.reset()      
    })
  }
}
