import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData={
    email:"",
    password:""
  }
  authorized=true;
  constructor(
    private auth : AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }
   loginUser(){
    this.auth.loginUser(this.loginData)
      .subscribe(
        data=> {
          localStorage.setItem('token',data.token)
          this.router.navigate(['/dashboard'])
        },
        err=> {
          if(err instanceof HttpErrorResponse){
            if(err.status===401){
              this.authorized=false;
            }
          }
        }
        
        )
     
   }

   change(){
     this.authorized=true;
   }
}
