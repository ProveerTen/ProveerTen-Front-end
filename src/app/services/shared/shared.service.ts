import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public chatear = new BehaviorSubject<boolean>(false);
  public searchTerm = new BehaviorSubject('');
  public type = new BehaviorSubject<string>('products');
  //public chatList = new BehaviorSubject<string[]>([]);
  public companyOrder = new BehaviorSubject<object>(null);
  public category = new BehaviorSubject<string>('');
  public home_category = new BehaviorSubject<string>('');
  public sub_category = new BehaviorSubject<string>('');
  public department_and_city = new BehaviorSubject<object>({ deparment: localStorage.getItem('data_location_department_name'), city: localStorage.getItem('data_location_city') } as { deparment: string, city: string });

  constructor() { }

  changeSearchOption(newValue: string): void {
    this.searchTerm.next(newValue);
  }

  changeType(newValue: string): void {
    this.type.next(newValue);
  }
  /*
  changeChatList(list: string[]): void {
    this.chatList.next(list);
  }*/

  changeDepartmentCity(newValue: object): void {
    //console.log(newValue);
    this.department_and_city.next(newValue);
  }
  changeCompanyOrder(newValue: object): void {
    this.companyOrder.next(newValue);
  }

  changeCategory(category: string): void {
    this.category.next(category);
  }
  changeHomeCategory(category: string): void {
    this.home_category.next(category);
  }

  changeProduct_sub_category(sub_category: string): void {
    this.sub_category.next(sub_category);
  }

  changeStatusChat(value: boolean): void {
    this.chatear.next(value);
  }
}