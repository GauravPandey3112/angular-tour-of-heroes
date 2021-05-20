import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map , tap } from 'rxjs/operators'

import { Hero } from './hero';
import { Heroes } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // :base/:collectionName
  private heroesUrl='api/heroes'
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };


  constructor(
    private http: HttpClient,
    private messageService:MessageService
    ) { }

  //get Heroes with RxJs' of()
  // getHeroes():Observable<Hero[]>{
  //   const heroes=of(Heroes)
  //   return heroes;
  // }

  //get Heroes from server
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched Heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      )
  }

  private log(message:string){
    this.messageService.add(`HeroService: ${message}`)
  }
// get hero by its ID
  // getHero(id:number):Observable<Hero>{
  //   //! is for case whe hero is undefined
  //   const hero =Heroes.find((h:Hero)=>h.id==id)!;
  //   this.messageService.add(`HeroService: fetched Hero of ID= ${hero.id}`);
  //   return of(hero);
  // }

  getHero(id:number):Observable<Hero>{
    const url=`${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched Hero with ID= ${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
  }

  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(_=> this.log(`Update Hero with ID=${hero.id}`)),
      catchError(this.handleError<any>('Update Hero'))
    )
  }

  addHero(hero: Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap((newHero:Hero)=> this.log(`Added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('Add Hero'))
    )
  }

  deleteHero(id:number):Observable<Hero>{
    const url=`${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap(_=> this.log(`deleted Hero with Id= ${id}`)),
      catchError(this.handleError<Hero>('Delete Hero'))
    )
  }

  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x=> x.length? this.log(`found Heroes matching "${term}"`): this.log(`no Heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes',[]))
      
    )
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

  private handleError<T>(operation='operation',result?:T){
    return (error:any):Observable<T> =>{

      console.error(error);

      this.log(`${operation} failed : ${error.message}`);

      //let app running by retuening empty result
      return of(result as T);
    }
  }
}
