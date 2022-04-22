import { AddItem, AddItemGroupByKey } from './model/addItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SplitItemsService {

  constructor() { }

  splitItmGroupByKey(items : any[], key:string) {
    let rtnObj:any = {};
    items.forEach(item => {
      if (!rtnObj[item[key]]) {
        rtnObj[item[key]] = [];
      }
      rtnObj[item[key]].push(item);
    });

    let rtnArray:AddItemGroupByKey[] = [];

    Object.keys(rtnObj).forEach(key => {
      let data:AddItemGroupByKey = {
        key: key,
        dataArray: rtnObj[key]
      }
      rtnArray.push(data);
    });


    console.log(rtnObj)
    console.log(rtnArray)
    return rtnArray;
  }


}
