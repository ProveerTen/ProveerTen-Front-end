import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public searchTerm = new BehaviorSubject('');
  public type = new BehaviorSubject<string>('products');
  public chatList = new BehaviorSubject<string[]>([]);
  public companyOrder = new BehaviorSubject<object>(null);
  public categoriesList = new BehaviorSubject<string[]>([]);
  public department_and_city = new BehaviorSubject<object>({ deparment: 'Quindío', city: 'Armenia' } as { deparment: string, city: string });

  constructor() { }

  changeSearchOption(newValue: string): void {
    this.searchTerm.next(newValue);
  }

  changeType(newValue: string): void {
    this.type.next(newValue);
  }

  changeChatList(list: string[]): void {
    this.chatList.next(list);
  }

  changeDepartmentCity(newValue: object): void {
    console.log(newValue);
    this.department_and_city.next(newValue);
  }

  changeCompanyOrder(newValue: object): void {
    this.companyOrder.next(newValue);
  }

  changeCategoriesList(list: string[]): void {
    this.categoriesList.next(list);
  }

  /*
  getSearchOption() {
    return this.searchOption.asObservable();
  }
  */
}