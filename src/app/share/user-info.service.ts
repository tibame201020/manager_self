import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private router: Router) { }

  setAccessToken(token: string) {
    sessionStorage.setItem("access_token", token);
  }

  getAccessToken() {
    let storage_token = sessionStorage.getItem('access_token');
    return storage_token;
  }

  logOut(){
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("picture");
    this.router.navigate(['user/login']);
  }

  isLogin(): boolean {
    if (this.getAccessToken()) {
      return true;
    } else {
      return false;
    }
  }

  setName(name: string) {
    sessionStorage.setItem("name", name);
  }
  getName() {
    return sessionStorage.getItem('name');
  }
  setPicture(picture: string) {
    sessionStorage.setItem("picture", picture);
  }
  getPicture() {
    return sessionStorage.getItem('picture');
  }

}
