import { Injectable } from '@angular/core';
import { Sidebar } from './side-bar';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  private hide:boolean = true;
  private sidebar: Sidebar = new Sidebar;
  constructor() { }

  hideSideBar() {
    this.hide = true;
  }
  showSideBar() {
    this.hide = false;
  }
  hideOrShow() {
    return this.hide;
  }
  setSideBar(sidebar: Sidebar) {
    this.sidebar = sidebar;
    this.hide = false;
  }
  getSideBar(){
    return this.sidebar;
  }
}
