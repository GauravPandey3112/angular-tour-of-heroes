import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const heroes=[
      {id:1,name:'Spider Man'},
      {id:2,name:'Iron Man'},
      {id:3,name:'Dr.Strange'},
      {id:4,name:'Captain America'},
      {id:5,name:'Captain Marvel'},
      {id:6,name:'Bruce Banner'},
      {id:7,name:'Black Widow'},
    ];
    return {heroes}
  }

  genId(heroes:Hero[]):number{
    return heroes.length>0 ? Math.max(...heroes.map(hero=> hero.id))+1:1;
  }
  constructor() { }
}
