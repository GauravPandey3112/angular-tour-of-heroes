import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatInputModule} from '@angular/material/input'
import { MatRippleModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const materialComponents=[
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatCardModule,
  MatDividerModule,
  MatDialogModule,
  MatGridListModule,
  MatMenuModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatSnackBarModule
]


@NgModule({
  
  imports: [materialComponents],
  exports:[materialComponents]
})
export class MaterialModule { }
