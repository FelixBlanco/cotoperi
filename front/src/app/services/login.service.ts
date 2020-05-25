import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

const _token = localStorage.getItem('_token')

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin' : '*'
  })
};

const httpOptionsAuth = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Authorization':  'Bearer '+_token   
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: HttpClient) { }

  _entrar(data){    
    return this.router.post(`${environment.apiHost}api/v1/login`,data, httpOptions);
  }

  _user(){
    return this.router.get(`${environment.apiHost}api/v1/user`, httpOptionsAuth);
  }

  _logout(){
    return this.router.get(`${environment.apiHost}api/v1/logout`,httpOptionsAuth);
  }
}
