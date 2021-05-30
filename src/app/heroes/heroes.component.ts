import { Component, OnInit, Inject ,ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Hero } from '../hero';
import { Heroes } from '../heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddHeroDialogComponent } from '../add-hero-dialog/add-hero-dialog.component';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class HeroesComponent implements OnInit {
  //property to expose Heroes array for binding
  // heroes:Hero[]=[];
  heroes:Heroes[]=[];
  
  
  // property of type Hero
  // selectedHero?:Hero
  constructor(
    private heroService: HeroService,
    private router:Router,
    public dialog: MatDialog,
    ) { }

  // getHeroes():void{
  //   this.heroService.getHeroes()
  //       .subscribe(data=> this.heroes=data);
  // }   
    getHeroes():void{
      this.heroService.get_Heroes()
        .subscribe(
          data=> this.heroes=data
          ,
          err=> {
            if(err instanceof HttpErrorResponse){
              if(err.status===401){
                this.router.navigate(['/login'])
              }
            }
          }
          )
    }

  //   add(name:string):void{
  //   name=name.trim()
  //   console.log("Name:",name);
    
  //   if(!name){return; }
  //   this.heroService.addHero({name} as Heroes)
  //     .subscribe(hero=> this.heroes.push(hero))
  // }

  delete(hero:Heroes):void{
    console.log("G\:",hero);
    
    this.heroes=this.heroes.filter(h=>h!==hero);
    this.heroService.deleteHero(hero._id).subscribe();
  }
  // onSelect(hero:Hero):void{
  //   this.selectedHero=hero
  //   this.messageService.add(`HeroesComponent: Selected hero Id= ${hero.id}`);
  // }
  ngOnInit(): void {
    this.getHeroes();
  }

  openDialog(){
    const dialogRef= this.dialog.open(AddHeroDialogComponent,{
      disableClose:true,
      width:'400px',
      height:'auto'
    })
    dialogRef.afterClosed().subscribe(data=>{

      if(data !== ''){
        this.heroes.push(data)
      }
      
      
    })
  }

 

}


