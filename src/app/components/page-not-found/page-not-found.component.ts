import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  
  ngOnInit(): void {
    this.animateDigits();
  }

  private animateDigits(): void {
    let time = 30;
    let i = 0;
    const selector3 = document.querySelector('.thirdDigit');
    const selector2 = document.querySelector('.secondDigit');
    const selector1 = document.querySelector('.firstDigit');

    const loop3 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop3);
        selector3.textContent = '4';
      } else {
        selector3.textContent = this.randomNum().toString();
        i++;
      }
    }, time);

    const loop2 = setInterval(() => {
      if (i > 80) {
        clearInterval(loop2);
        selector2.textContent = '0';
      } else {
        selector2.textContent = this.randomNum().toString();
        i++;
      }
    }, time);

    const loop1 = setInterval(() => {
      if (i > 100) {
        clearInterval(loop1);
        selector1.textContent = '4';
      } else {
        selector1.textContent = this.randomNum().toString();
        i++;
      }
    }, time);
  }

  private randomNum(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

}
