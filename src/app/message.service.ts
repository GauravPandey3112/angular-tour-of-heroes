import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages:string[]=[];

  constructor() { }

  add(message:string){
    this.messages.push(message);
  }

  getMessages():string[]{
    return this.messages;
  }

  clear(){
    this.messages=[];
  }
}
