import { AddItemService } from './../add-item.service';
import { ItemService } from './../item.service';
import { AddItem } from './../model/addItem';
import { LoginService } from './../login.service';
import { SideBarService } from './../side-bar/side-bar.service';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/share/user-info.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HOME_SIDE_BAR_CONFIG } from './side-bar-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public UserInfoService: UserInfoService,
    private router: Router,
    private SideBarService: SideBarService,
    private LoginService: LoginService,
    private ItemService: ItemService,
    public AddItemService:AddItemService) { }

  selected: Date = new Date();

  accounts: AddItem[] = [];
  eats: AddItem[] = [];
  fits: AddItem[] = [];
  notes: AddItem[] = [];

  ngOnInit(): void {
    if (this.UserInfoService.isLogin()) {
      this.loginInit();
    } else {
      this.LoginService.wakeUp();
      this.router.navigate(['user/login']);
    }
  }

  loginInit() {
    this.SideBarService.setSideBar(HOME_SIDE_BAR_CONFIG);
    this.refreshData();
  }

  changeSelect() {
    this.refreshData();
  }

  refreshData(){
    this.accounts = [];
    this.getData('account', this.accounts);
    this.eats = [];
    this.getData('eat', this.eats);
    this.fits = [];
    this.getData('fit', this.fits);
    this.notes = [];
    this.getData('note', this.notes);
  }

  getData(category:string, targetArray: AddItem[]) {
    this.ItemService.getItemsByCategory(category,
      this.selected.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }),
      this.selected.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" })
    ).subscribe(
      res => {
        if (res.length) {
          res.forEach(element => {
            targetArray.push(element)
          });
        }
      })
  }

}
