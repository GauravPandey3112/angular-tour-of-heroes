import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map , tap } from 'rxjs/operators'

import { Hero } from './hero';
import { Heroes } from './heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // :base/:collectionName
  private heroesUrl='http://localhost:3000/heroes'
  httpOptions={
    headers:new HttpHeaders({'responseType':'text'})
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
  // getHeroes():Observable<Hero[]>{
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched Heroes')),
  //       catchError(this.handleError<Hero[]>('getHeroes',[]))
  //     )
  // }

  get_Heroes(){
    return this.http.get<any>(this.heroesUrl)
        .pipe(
              tap(_ => this.log('fetched Heroes')),
                // catchError(this.handleError<Hero[]>('getHeroes',[]))
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

  getHero(id:string):Observable<Heroes>{
    const url=`${this.heroesUrl}/${id}`;
    return this.http.get<Heroes>(url)
      .pipe(
        tap(_ => this.log(`fetched Hero with ID= ${id}`)),
        catchError(this.handleError<Heroes>(`getHero id=${id}`))
      )
  }

  updateHero(hero:Heroes):Observable<any>{
    return this.http.post(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(_=> this.log(`Update Hero with ID=${hero._id}`)),
      catchError(this.handleError<any>('Update Hero'))
    )
  }

  addHero(hero: Partial<Heroes>):Observable<Heroes>{
    const url=`http://localhost:3000/add-hero`
    return this.http.post<Heroes>(url,hero,this.httpOptions).pipe(
      tap((newHero:Heroes)=> this.log(`Added hero ${newHero.name}`)),
      catchError(this.handleError<Heroes>('Add Hero'))
    )
  }

  deleteHero(id:string):Observable<Heroes>{
    const url=`http://localhost:3000/delete/${id}`

    return this.http.delete<Heroes>(url).pipe(
      tap(_=> this.log(`deleted Hero with Id= ${id}`)),
      catchError(this.handleError<Heroes>('Delete Hero'))
    )
  }

  searchHeroes(term:string):Observable<Heroes[]>{
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Heroes[]>(`http://localhost:3000/search/?name=${term}`).pipe(
      tap(x=> x.length? this.log(`found Heroes matching "${term}"`): this.log(`no Heroes matching "${term}"`)),
      catchError(this.handleError<Heroes[]>('searchHeroes',[]))
      
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
