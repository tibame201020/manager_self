import { AddItemService } from './add-item.service';
import { AddItem, AddItemGroupByKey } from './model/addItem';
import { Injectable } from '@angular/core';
import { formatDate } from '@fullcalendar/angular';

@Injectable({
  providedIn: 'root'
})
export class SplitItemsService {

  constructor(private AddItemService: AddItemService) { }

  splitItmGroupByKey(items: any[], key: string, type: string) {
    let rtnObj: any = {};
    items.forEach(item => {
      if (!rtnObj[item[key]]) {
        rtnObj[item[key]] = [];
      }
      rtnObj[item[key]].push(item);
    });

    if (type == 'obj') {
      return rtnObj;
    }

    let rtnArray: AddItemGroupByKey[] = [];

    Object.keys(rtnObj).forEach(key => {
      let data: AddItemGroupByKey = {
        key: key,
        dataArray: rtnObj[key]
      }
      rtnArray.push(data);
    });

    return rtnArray;
  }

  formatDateFromDb(date: string) {
    let dateStr = formatDate(date, {
      month: 'numeric',
      year: 'numeric',
      day: 'numeric'
    });
    let rtn = new Date(dateStr).toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("/", "-").replace("/", "-");
    return rtn;
  }

  generateFullcalendarEvents(items: AddItemGroupByKey[]) {
    let rtnArray: any[] = [];
    items.forEach(item => {
      let fullcalendarEvent = {
        start: '',
        title: ''
      };
      fullcalendarEvent.start = this.formatDateFromDb(item.key);
      let total = 0;
      item.dataArray.forEach((data: AddItem) => {
        total = total + parseInt(data.itemValue);
      })
      let title = '';
      if ('account' == window.location.pathname.replace("/", "")) {
        title = '$' + total;
      } else if('home' == window.location.pathname.replace("/", "")) {
        title = total + '';
      } else {
        title = total + 'cal';
      }

      fullcalendarEvent.title = title;
      rtnArray.push(fullcalendarEvent)
    })
    return rtnArray;
  }

  generateCircleEchartsData(items: AddItemGroupByKey[]) {
    let rtnArray: any[] = [];
    items.forEach(item => {
      let rtnObj = {
        subCategory: this.AddItemService.getSubCategory(window.location.pathname.replace("/", ""), item.key),
        total: 0
      }
      let total = 0;
      item.dataArray.forEach((data: AddItem) => {
        total = total + parseInt(data.itemValue);
      })
      rtnObj.total = total;
      rtnArray.push(rtnObj)
    });

    return rtnArray;
  }

  generateLineEchartsData(dateArray: string[], itemsObj: { [x: string]: any; }) {
    let rtnArray: any[] = [];

    dateArray.forEach((date: string) => {
      const key = date.replace("-", "").replace("-", "");
      let result = 0;
      if (itemsObj[key]) {
        itemsObj[key].forEach((data: AddItem) => {
          result = result + parseInt(data.itemValue);
        })
        rtnArray.push(result);
      } else {
        rtnArray.push(result);
      }
    })

    return rtnArray;
  }

}
