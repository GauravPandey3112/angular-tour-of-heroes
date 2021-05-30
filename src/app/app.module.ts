import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ngModel belongs to form module
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { MessageComponent } from './message/message.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { AddHeroDialogComponent } from './add-hero-dialog/add-hero-dialog.component';
import { UpdateHeroDialogComponent } from './update-hero-dialog/update-hero-dialog.component';
import { Nav1Component } from './nav1/nav1.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailsComponent,
    MessageComponent,
    HeroSearchComponent,
    LoginComponent,
    SidenavComponent,
    RegisterComponent,
    AddHeroDialogComponent,
    UpdateHeroDialogComponent,
    Nav1Component,
    Dashboard1Component,
    NotificationComponent
  ],
  entryComponents: [
    AddHeroDialogComponent,
    UpdateHeroDialogComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false}
    // ),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgMatSearchBarModule,
    TextFieldModule
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
