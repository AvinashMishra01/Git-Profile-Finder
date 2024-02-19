import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule,HttpClientJsonpModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material-ui
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatFormFieldModule } from '@angular/material/form-field';
 

import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    BrowserAnimationsModule,
    // material
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
