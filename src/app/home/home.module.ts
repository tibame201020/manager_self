import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class HomeModule { }
