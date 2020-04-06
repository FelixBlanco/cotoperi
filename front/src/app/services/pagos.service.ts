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


}
