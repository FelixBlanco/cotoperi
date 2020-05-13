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
export class CuentasService {

  constructor(private router: HttpClient) { }

  cuentasIndex(){    
    return this.router.get(`${environment.apiHost}/api/v1/cuentas`, httpOptions);
  }

  cuentasStore(data){    
    return this.router.post(`${environment.apiHost}/api/v1/cuentas`, data, httpOptions);
  }  

  cuentasEmpleados(idEmpleado){    
    return this.router.get(`${environment.apiHost}/api/v1/cuentas-empleados/${idEmpleado}`, httpOptions);
  }

  cuentasUpgrade(data){    
    return this.router.put(`${environment.apiHost}/api/v1/cuentas/${data.id}`, data, httpOptions);
  }  

  deleteCuentas(id){
    return this.router.delete(`${environment.apiHost}/api/v1/delete-cuenta/${id}`, httpOptions);
  }

}
