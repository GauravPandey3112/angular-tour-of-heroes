import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInput } from './user';
import { Observable } from 'rxjs';
import {catchError, map , tap } from 'rxjs/operators'
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl=`${environment.api_url}/register`
  private loginUrl=`${environment.api_url}/login`
  private userUrl=`${environment.api_url}/user`
  
  constructor(
    private http:HttpClient,
    private messageService:MessageService,
    private router:Router) { }

  registerUser(user:UserInput){
    return  this.http.post<any>(this.registerUrl,user)
  }

  loginUser(user:Partial<UserInput>){
    return this.http.post<any>(this.loginUrl,user)
  }

  getUser(){
    return this.http.get<any>(this.userUrl)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token')
  }
  private log(message:string){
    this.messageService.add(`User: ${message}`)
  }
}
