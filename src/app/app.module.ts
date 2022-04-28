import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ShareModule } from './share/share.module';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { JwtInterceptor } from './inteceotor/jwt.interceptor';
import { AccountComponent } from './account/account.component';
import { EatComponent } from './eat/eat.component';
import { FitComponent } from './fit/fit.component';
import { NoteComponent } from './note/note.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddFormComponent } from './add-form/add-form.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    AccountComponent,
    EatComponent,
    FitComponent,
    NoteComponent,
    AddItemComponent,
    AddFormComponent,
    EditItemComponent,
    HomeComponent
  ],
  imports: [
    ShareModule,
    BrowserAnimationsModule,
    HomeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
