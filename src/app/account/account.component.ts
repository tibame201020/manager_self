import { AddItemService } from './../add-item.service';
import { ItemService } from './../item.service';
import { Component, OnInit } from '@angular/core';
import { HOME_SIDE_BAR_CONFIG } from '../home/side-bar-config';
import { SideBarService } from '../side-bar/side-bar.service';
import { UserInfoService } from '../share/user-info.service';
import { AddItem } from '../model/addItem';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  dataRange: any;
  startDate: any;
  endDate: any;
  category = 'account';
  itemLength = 1;
  rangeData:AddItem[] = [];

  constructor(private SideBarService:SideBarService, private ItemService:ItemService, public AddItemService:AddItemService, public UserInfoService:UserInfoService ) {}

  ngOnInit(): void {
    this.SideBarService.setSideBar(HOME_SIDE_BAR_CONFIG);
  }

  getDataRange(dataRange: any) {
    this.dataRange = dataRange;
    const startDate = this.dataRange.start ? this.dataRange.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    const endDate = this.dataRange.end ? this.dataRange.end.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    this.startDate = startDate;
    this.endDate = endDate;

    if (startDate && endDate && this.dataRange) {
      this.ItemService.getItemsByCategory(this.category, startDate, endDate).subscribe(
        res => {
          this.rangeData = res;
        }
      )
    }
  }

  refreshData(itemLength:number) {
    this.itemLength = itemLength;
    this.ItemService.getItemsByCategory(this.category, this.startDate, this.endDate).subscribe(
      res => {
        this.rangeData = res;
        this.itemLength = 1;
      }
    )
  }

  getRefresh() {
    this.ItemService.getItemsByCategory(this.category, this.startDate, this.endDate).subscribe(
      res => {
        this.rangeData = res;
      }
    )
  }

}
