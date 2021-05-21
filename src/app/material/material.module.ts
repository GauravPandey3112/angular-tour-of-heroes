import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatInputModule} from '@angular/material/input'
import { MatRippleModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'

const materialComponents=[
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
]


@NgModule({
  
  imports: [materialComponents],
  exports:[materialComponents]
})
export class MaterialModule { }
