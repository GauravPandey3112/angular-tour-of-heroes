import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService  } from './auth.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Tour of Heroes';
  watcher!:Subscription;
  deviceXs:boolean=false;

  constructor(public authService:AuthService, public mediaObserver: MediaObserver) {
  }

  ngOnInit(){
    this.watcher=this.mediaObserver.media$.subscribe((change:MediaChange)=>{
      this.deviceXs=change.mqAlias==='xs' ? true: false;
      
    })
  }

  ngOnDestroy(){
    this.watcher.unsubscribe()
  }
}
