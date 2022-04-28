import { SplitItemsService } from 'src/app/split-items.service';
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
    public AddItemService: AddItemService,
    private SplitItemsService:SplitItemsService) { }

  dataRange: any;
  startDate: any;
  endDate: any;

  data:AddItem[] = [];
  xAxisData:string[]=[];
  accountData:any[] = [];
  eatData:any[] = [];
  fitData:any[] = [];
  itemLength = 1;

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
  }

  getDataRange(dataRange: any) {
    this.dataRange = dataRange;
    const startDate = this.dataRange.start ? this.dataRange.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    const endDate = this.dataRange.end ? this.dataRange.end.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    this.startDate = startDate;
    this.endDate = endDate;

    if (startDate && endDate && this.UserInfoService.isLogin()) {
      this.ItemService.getItemsByCategory(window.location.pathname.replace('/manager_self/', ''), startDate, endDate).subscribe(
        res => {
         if (res.length) {
          this.data = res;
          this.generateDateArray();
         }
        }
      )
    }
  }

  generateDateArray() {
    let dateArray: string[] = [];
    for (let date = new Date(this.dataRange.start); date <= new Date(this.dataRange.end); date.setDate(date.getDate() + 1)) {
      dateArray.push(date.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("/", "-").replace("/", "-"));
    }
    this.xAxisData = dateArray;
    this.generateLineData();
  }

  generateLineData() {
    let groupByCategoryObj = this.SplitItemsService.splitItmGroupByKey(this.data, 'category', 'obj');
    if (groupByCategoryObj.account) {
      let groupByDateObj = this.SplitItemsService.splitItmGroupByKey(groupByCategoryObj.account, 'date', 'obj');
      this.accountData = this.SplitItemsService.generateLineEchartsData(this.xAxisData, groupByDateObj);
    } else {
      this.accountData = []
    }
    if (groupByCategoryObj.eat) {
      let groupByDateObj = this.SplitItemsService.splitItmGroupByKey(groupByCategoryObj.eat, 'date', 'obj');
      this.eatData = this.SplitItemsService.generateLineEchartsData(this.xAxisData, groupByDateObj);
    } else {
      this.eatData = []
    }
    if (groupByCategoryObj.fit) {
      let groupByDateObj = this.SplitItemsService.splitItmGroupByKey(groupByCategoryObj.fit, 'date', 'obj');
      this.fitData = this.SplitItemsService.generateLineEchartsData(this.xAxisData, groupByDateObj);
    } else {
      this.fitData = []
    }
  }

  getRefresh() {
    if (this.UserInfoService.isLogin()) {
      this.ItemService.getItemsByCategory(window.location.pathname.replace('/manager_self/', ''), this.startDate, this.endDate).subscribe(
        res => {
         if (res.length) {
          this.data = res;
          this.generateDateArray();
          this.itemLength = 1;
         }
        }
      )
    }
  }

  refreshData(itemLength:number) {
    this.itemLength = itemLength;
    this.getRefresh();
  }

}
