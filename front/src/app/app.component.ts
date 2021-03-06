import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isSession : boolean = false

  constructor(private _login : LoginService){}

  ngOnInit(){
    this.getUser();
  }

  getUser(){
    this._login._user().subscribe((resp:any) => {      
      if(resp.isSession){
        this.isSession = resp.isSession
      }else{
        this.isSession = resp.isSession
      }
    })
  }
}
