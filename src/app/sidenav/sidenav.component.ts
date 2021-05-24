import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInput } from '../user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  user={name:"",email:""};
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser():void{
    this.authService.getUser()
      .subscribe(
        data=> {
          console.log("User",data);
          
          this.user=data
        }
        ,
        err=> {
          if(err instanceof HttpErrorResponse){
            if(err.status===401){
              this.router.navigate(['/login'])
            }
          }
        }
        )
  }

}
