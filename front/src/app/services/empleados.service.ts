import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin' : '*'    
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private router: HttpClient) { }

  indexEmpleado(){    
    return this.router.get(`${environment.apiHost}/api/v1/empleados`, httpOptions);
  }

  showEmpleado(idEmpleado){    
    return this.router.get(`${environment.apiHost}/api/v1/empleados/${idEmpleado}`, httpOptions);
  }
  
  storeEmpleado(data){    
    return this.router.post(`${environment.apiHost}/api/v1/empleados`, data, httpOptions);
  }  
}
