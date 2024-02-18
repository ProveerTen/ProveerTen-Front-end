import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public searchOption = new BehaviorSubject('products');

  constructor() { }

  changeSearchOption(newValue: string): void {
    this.searchOption.next(newValue);
  }
}
