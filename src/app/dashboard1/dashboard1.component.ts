import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Heroes } from '../heroes';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {
  heroes:Heroes[]=[];

  constructor(private heroService:HeroService) {}

  ngOnInit(){
    this.getHeroes();
  }

  getHeroes():void{
    this.heroService.get_Heroes()
      .subscribe(heroes => {
        if(heroes.length>=2)
        this.heroes=heroes.slice(0,5)
        // this.heroes=heroes;
        console.log("He:",this.heroes);
        
      });
  }
}
