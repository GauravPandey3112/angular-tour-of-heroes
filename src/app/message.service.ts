import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages:string[]= [];

  constructor() { }

  add(message:string){
    if(localStorage.getItem('logs')===null){
      this.messages=[]
    }else{
     const logs=(localStorage.getItem('logs'))
      if(typeof logs === 'string'){
        this.messages=JSON.parse(logs);
      }
    }
    this.messages.push(message);
    localStorage.setItem('logs',JSON.stringify(this.messages))
  }

  getMessages():string[]{
     const logs=(localStorage.getItem('logs'));
     if(typeof logs === 'string'){
       this.messages=JSON.parse(logs)
     }

     return this.messages;
  }

  clear(){
    localStorage.removeItem('logs');
    this.messages=[];
  }
}
