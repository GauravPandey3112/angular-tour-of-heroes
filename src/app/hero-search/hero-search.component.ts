import { Component, OnInit, HostListener, ElementRef,ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Heroes } from '../heroes';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  @ViewChild("searchBox",{ static: false }) _el!: ElementRef;

  heroes$!: Observable<Heroes[]>;
  private searchTerms= new Subject<string>();

  constructor(private heroService: HeroService, public elementRef: ElementRef) { }
  showSearch:boolean=false

  search(term:string):void{
    this.searchTerms.next(term)
  }

//   @HostListener('document:click', ['$event.target'])
// public onPageClick(targetElement: any) {
//   const clickedInside = this.elementRef.nativeElement.contains(targetElement);
//   if (!clickedInside) {
//     this.showSearch=false;
//   }
// }
  count!:any;
  ngOnInit(): void {
    this.heroes$=this.searchTerms.pipe(
      //wait 300ms after every letter typed before searching
      debounceTime(300),
      distinctUntilChanged(),

      switchMap((term:string) => this.heroService.searchHeroes(term))
    )
  }

  setFocus() {
    this.showSearch=true;
    setTimeout(() => {
      this._el.nativeElement.focus();
    }, 5);
    
  }
  checkSearch(){
    this.showSearch=false
  }
  op(v:any){
     
    v.openMenu()  }
}
