import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public searchOption = new BehaviorSubject('products');
  public valueRoute = new BehaviorSubject<any>(null);
  public chatList = new BehaviorSubject<string[]>([]);
  public companyOrder = new BehaviorSubject<object>(null);

  constructor() { }

  changeSearchOption(newValue: string): void {
    this.searchOption.next(newValue);
  }

  changeValueRoute(newValue: string): void {
    this.valueRoute.next(newValue);
  }
  changeChatList(list: string[]): void {
    this.chatList.next(list);
  }

  changeCompanyOrder(newValue: object): void {
    this.companyOrder.next(newValue);
  }

  getSearchOption() {
    return this.searchOption.asObservable();
  }
}