import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate{
  
  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  canActivate():boolean{
    if(!this.authService.loggedIn()){
      
      return true
    }else{
      this.router.navigate(['/dashboard'])
      return false
    }
  }
}
