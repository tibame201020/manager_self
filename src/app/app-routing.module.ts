import { AddFormComponent } from './add-form/add-form.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FitComponent } from './fit/fit.component';
import { NoteComponent } from './note/note.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { HomeRouter } from './home/routing';
import { EatComponent } from './eat/eat.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:"home",component:HomeComponent },
  { path:"account",component:AccountComponent },
  { path:"eat",component:EatComponent },
  { path:"fit",component:FitComponent },
  { path:"note",component:NoteComponent },
  {
    path:"user",
    children:HomeRouter
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
