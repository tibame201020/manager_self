import { UserInfoService } from 'src/app/share/user-info.service';
import { AddItemService } from './../add-item.service';
import { ItemService } from './../item.service';
import { Component, OnInit } from '@angular/core';
import { HOME_SIDE_BAR_CONFIG } from '../home/side-bar-config';
import { SideBarService } from '../side-bar/side-bar.service';

@Component({
  selector: 'app-eat',
  templateUrl: './eat.component.html',
  styleUrls: ['./eat.component.css']
})
export class EatComponent implements OnInit {

  dataRange: any;
  startDate: any;
  endDate: any;

  category = 'eat';

  constructor(private SideBarService:SideBarService, private ItemService:ItemService, private AddItemService : AddItemService, public UserInfoService:UserInfoService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(HOME_SIDE_BAR_CONFIG);
  }

  getDataRange(dataRange: any) {
    this.dataRange = dataRange;
    const startDate = this.dataRange.start ? this.dataRange.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    const endDate = this.dataRange.end ? this.dataRange.end.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    this.startDate = startDate;
    this.endDate = endDate;

    if (startDate && endDate) {
      this.ItemService.getItemsByCategory(this.category, startDate, endDate).subscribe(
        res => {console.log(res)}
      )
    }
  }

  refreshData(itemLength:number) {
    if (itemLength == 0) {
      this.ItemService.getItemsByCategory(this.category, this.startDate, this.endDate).subscribe(
        res => {console.log(res)}
      )
    }
  }

}
