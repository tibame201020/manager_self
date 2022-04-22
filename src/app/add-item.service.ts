import { ItemService } from './item.service';
import { AddItem } from './model/addItem';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  itemList: AddItem[] = [];

  constructor(private ItemService: ItemService) {
  }



  addItemList(addItem: AddItem) {
    this.itemList.push(addItem);
    this.sortItemList();
  }

  sortItemList() {
    this.itemList.sort(function (a, b): number {
      if (a.date > b.date) {
        return 1;
      }
      if (b.date > a.date) {
        return -1;
      }
      if (a.category > b.category) {
        return 1;
      }
      if (b.category > a.category) {
        return -1;
      }
      if (a.subCategory > b.subCategory) {
        return 1;
      }
      if (b.subCategory > a.subCategory) {
        return -1;
      }
      return 0;
    })
  }

  deleteItemByIndex(index: number) {
    this.itemList.splice(index, 1);
    this.sortItemList();
  }

  saveEditItem(item: AddItem, index: number) {
    if ('note' == item.category) {
      item.subCategory = '';
      item.itemValue = null;
    }
    this.itemList[index] = item;
    this.sortItemList();

  }

  getEditItemToTmpItem(index: number) {
    return this.itemList[index];
  }

  saveItems() : Observable<any>{
    return this.ItemService.saveItems(this.itemList);
  }

  getSubCategory(category: string, SubCategory: string) {
    if ('account' == category) {
      switch (SubCategory) {
        case '0':
          return '食';
        case '1':
          return '衣';
        case '2':
          return '住';
        case '3':
          return '行';
        case '4':
          return '育';
        case '5':
          return '樂';
      }
    }
    if ('eat' == category) {
      switch (SubCategory) {
        case '0':
          return '早餐';
        case '1':
          return '中餐';
        case '2':
          return '晚餐';
        case '3':
          return '消夜';
        case '4':
          return '其他';
      }

    }
    if ('fit' == category) {
      switch (SubCategory) {
        case '0':
          return '有氧';
        case '1':
          return '重訓';
        case '2':
          return '其他';
      }
    }
    if ('note' == category) {
      return null;
    }
    return null;
  }

  getCategory (category:string) {
    switch (category) {
      case 'account':
        return '支出';
      case 'eat':
        return '飲食管理';
      case 'fit':
        return '運動紀錄';
      case 'note':
        return '筆記';
    }
    return null;
  }


}
