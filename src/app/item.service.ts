import { AddItem } from './model/addItem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  saveItems(items: AddItem[]): Observable<boolean> {
    return this.http.post<boolean>(environment.baseUrl + 'saveItems', items);
  }

  getItemsByCategory(category: string, start: string, end: string): Observable<AddItem[]> {
    let param = {
      category: category,
      startDate: start,
      endDate: end
    };
    return this.http.post<AddItem[]>(environment.baseUrl + 'getItems', param);
  }
}
