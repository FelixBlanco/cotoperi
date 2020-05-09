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
export class LoginService {

  constructor(private router: HttpClient) { }

  _entrar(data){    
    return this.router.post(`${environment.apiHost}/api/v1/login`,data, httpOptions);
  }
}
