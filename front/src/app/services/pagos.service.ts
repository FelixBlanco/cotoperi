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
export class PagosService {

  constructor(private router: HttpClient) { }

  pagosPendientes(){    
    return this.router.get(`${environment.apiHost}/api/v1/pagos-pendientes`, httpOptions);
  }

  pagar(data){    
    return this.router.post(`${environment.apiHost}/api/v1/pagar`,data, httpOptions);
  }
  
  pagos(data){    
    return this.router.post(`${environment.apiHost}/api/v1/pagos`,data, httpOptions);
  }  

  getTipos(){
    return this.router.get(`${environment.apiHost}/api/v1/tipos`, httpOptions);
  }
  
  ultimosPagos(){
    return this.router.get(`${environment.apiHost}/api/v1/ultimos-pagos`, httpOptions);    
  }

  deletePagos(id){
    return this.router.get(`${environment.apiHost}/api/v1/delete-pagos/${id}`, httpOptions);    
  }

  addPagoEmpleados(data){
    return this.router.post(`${environment.apiHost}/api/v1/add-pago-empleado`,data, httpOptions);
  }
  
  listaFechaPagos(){
    return this.router.get(`${environment.apiHost}/api/v1/lista-pagos`, httpOptions);    
  }

  seachNomina(date){
    return this.router.get(`${environment.apiHost}/api/v1/seach-nomina/${date}`, httpOptions);        
  }

}
