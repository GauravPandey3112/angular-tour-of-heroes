import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nav1',
  templateUrl: './nav1.component.html',
  styleUrls: ['./nav1.component.css']
})
export class Nav1Component implements OnInit {
  title='Tour of Heroes'
  showSearch:boolean=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    user={name:"",email:""};
  constructor(private breakpointObserver: BreakpointObserver,
    public authService: AuthService, private router: Router) {}
  
  ngOnInit(){
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
