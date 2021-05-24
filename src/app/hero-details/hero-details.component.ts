import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Heroes } from '../heroes';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  // @Input() hero?:Hero;
  @Input() hero?:Heroes;
  toEdit=false;

  constructor(
    private route:ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero():void{
    const id:string= this.route.snapshot.paramMap.get('id') || '';
    this.heroService.getHero(id)
      .subscribe(data=> this.hero=data)
  }

  goBack():void{
    this.location.back();
  }

  save():void{
    if(this.hero){
      this.heroService.updateHero(this.hero)
        .subscribe(()=> {
          this.goBack()
        })
    }
  }

  edit():void{
    this.toEdit=true;
    console.log("Hllo");
    
  }
}
