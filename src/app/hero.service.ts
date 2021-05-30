import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map , tap } from 'rxjs/operators'

import { Hero } from './hero';
import { Heroes } from './heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // :base/:collectionName
  private heroesUrl=`${environment.api_url}/heroes`
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
    const url=`${this.heroesUrl}/view-heroes`
    return this.http.get<any>(url)
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
    const url=`${this.heroesUrl}/hero/${id}`;
    return this.http.get<Heroes>(url)
      .pipe(
        tap(_ => this.log(`fetched Hero with ID= ${id}`)),
        catchError(this.handleError<Heroes>(`getHero id=${id}`))
      )
  }

  updateHero(id:string,name:string,description:string, image:File):Observable<any>{
      const heroData = new FormData();
      heroData.append("id", id);
      heroData.append("name", name);
      heroData.append("description", description);
      heroData.append("image", image, name);
      const url=`${this.heroesUrl}/update-hero`
    return this.http.post(url,heroData,this.httpOptions).pipe(
      tap(_=> this.log(`${name} details Updated`)),
      // catchError(this.handleError<any>('Update Hero'))
    )
  }

  updateHeroWithoutImage(id:string,name:string,description:string):Observable<any>{
    console.log("ID:",id);
    
    const heroData = {
      id,
      name,
      description,
    }
    console.log("api:",heroData);
    
    const url=`${this.heroesUrl}/update-hero-details`
  return this.http.post(url,heroData,this.httpOptions).pipe(
    tap(_=> this.log(`${name} details Updated`)),
    // catchError(this.handleError<any>('Update Hero'))
  )
}

  addHero(name:string,description:string, image:File ):Observable<Heroes>{
    const heroData = new FormData();
    heroData.append("name", name);
    heroData.append("description", description);
    heroData.append("image", image, name);
    const url=`${this.heroesUrl}/add-hero`
    return this.http.post<Heroes>(url,heroData,this.httpOptions).pipe(
      tap((newHero:Heroes)=> this.log(`Added hero ${newHero.name}`)),
      // catchError(this.handleError<Heroes>('Add Hero'))
    )
  }

  deleteHero(id:string):Observable<Heroes>{
    console.log("DeleteL",id);
    
    const url=`${this.heroesUrl}/delete/${id}`

    return this.http.delete<Heroes>(url).pipe(
      tap(_=> this.log(`deleted Hero with Id= ${id}`)),
      catchError(this.handleError<Heroes>('Delete Hero'))
    )
  }

  searchHeroes(term:string):Observable<Heroes[]>{
    if(!term.trim()){
      return of([])
    }
    console.log(term);
    const url=`${this.heroesUrl}/search?name=${term}`
    return this.http.get<Heroes[]>(url).pipe(
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
