import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading : boolean = false
  formLogin : FormGroup

  constructor(
    private fb : FormBuilder,
    private _login : LoginService
  ) { 
    this.formLogin = this.fb.group({
      'email' : [''],
      'password' : ['']
    })
  }

  ngOnInit(): void {
  }

  entrar(){
    this._login._entrar(this.formLogin.value).subscribe((resp:any) => {
      console.log(resp)      
      localStorage.setItem('_token',resp.access_token);
      location.reload()
    })
  }



}
