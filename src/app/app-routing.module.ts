import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AccessGuard } from './guards/access.guard';
import { Nav1Component } from './nav1/nav1.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';

const routes: Routes = [
  {path:'', redirectTo:'/dashboard',pathMatch:'full'},
  {path:'',children:[
    {path:'heroes', component:HeroesComponent},
    {path:'dashboard', component:Dashboard1Component,canActivate:[AuthGuard]},
    {path:'detail/:id', component:HeroDetailsComponent},
    {path:'logs',component:MessageComponent},
  ],canActivate:[AuthGuard]},
  // {path:'heroes', component:HeroesComponent,canActivate:[AuthGuard]},
  // {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  // {path:'detail/:id', component:HeroDetailsComponent},
  // {path:'logs',component:MessageComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent,canActivate:[AccessGuard]},
  {path:'register',component:RegisterComponent, canActivate:[AccessGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
