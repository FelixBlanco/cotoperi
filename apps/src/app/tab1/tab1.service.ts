import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

const _token = localStorage.getItem('_token')

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Authorization':  'Bearer '+_token   
  })
};

@Injectable({
  providedIn: 'root'
})
export class Tab1Service {

  constructor(private router: HttpClient) { }

  getEmpleado(){    
    return this.router.get(`${environment.apiHost}/api/v1/empleados`, httpOptions);
  }

  showEmpleado(idEmpleado){    
    return this.router.get(`${environment.apiHost}/api/v1/empleados/${idEmpleado}`, httpOptions);
  }
  
  storeEmpleado(data){    
    return this.router.post(`${environment.apiHost}/api/v1/empleados`, data, httpOptions);
  }  

  deletesEmpleado(id){
    return this.router.delete(`${environment.apiHost}/api/v1/empleados/${id}`, httpOptions);
  }
}
