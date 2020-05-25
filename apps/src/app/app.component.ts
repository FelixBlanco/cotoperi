import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './login/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  isLogin : boolean = false
  isLoading : boolean = false
  formLogin : FormGroup

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _login : AuthService,
    private fb : FormBuilder,
  ) {
    this.initializeApp();

    this.formLogin = this.fb.group({
      'email' : [''],
      'password' : ['']
    })
  }

  ngOnInit(){
    this.getUser();
  }

  getUser(){
    this._login._user().subscribe((resp:any) => {
      console.log(resp)
      if(resp.isSession){
        this.isLogin = resp.isSession
      }else{
        this.isLogin = resp.isSession
      }
    })
  }


  logout(){
    this._login._logout().subscribe((resp:any) => {
      console.log(resp);
      location.reload()
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  entrar(){    
    this.isLoading = true
    this._login._entrar(this.formLogin.value).subscribe((resp:any) => {
      console.log(resp)      
      localStorage.setItem('_token',resp.access_token);
      location.reload()
      this.isLoading = false      
    })
  }
}
