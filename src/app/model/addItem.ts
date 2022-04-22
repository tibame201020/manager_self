export interface AddItem {
  sub:string,
  date:string,
  category:string,
  subCategory:string,
  itemName:string,
  itemValue:any
}

export interface AddItemGroupByKey {
  key:string,
  dataArray:AddItem[];
}
