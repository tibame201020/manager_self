import { LoginComponent } from './login/login.component';
import { Routes } from "@angular/router";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

export const HomeRouter = routes;
