import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private _login : LoginService){}

  ngOnInit(): void {
  }

  logout(){
    this._login._logout().subscribe((resp:any) => {   
      location.reload()
    })
  }
}
