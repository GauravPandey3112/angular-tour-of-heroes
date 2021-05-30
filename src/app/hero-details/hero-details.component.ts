import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Heroes } from '../heroes';
import { UpdateHeroDialogComponent } from '../update-hero-dialog/update-hero-dialog.component';

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
    private location: Location,
    public dialog: MatDialog,
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

  // save():void{
  //   if(this.hero){
  //     this.heroService.updateHero(this.hero)
  //       .subscribe(()=> {
  //         this.goBack()
  //       })
  //   }
  // }

  edit():void{
    this.toEdit=true;
    console.log("Hllo");
    
  }
  openDialog(){
    const dialogRef= this.dialog.open(UpdateHeroDialogComponent,{
      disableClose:true,
      width:'400px',
      height:'auto',
      data:{
        name:this.hero?.name,
        description:this.hero?.description,
        imagePath:this.hero?.imagePath,
        _id:this.hero?._id
      }
    })
    dialogRef.afterClosed().subscribe(data=>{
      console.log("Updated,::",data);
      
      if(data!==''){
        this.hero=data;
      }
      
    })
    
  }
}
