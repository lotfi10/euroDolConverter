import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private rate = new BehaviorSubject<number>(1.1);
  private fixedRate: number | null = null;

  constructor() {
    interval(3000).subscribe(() => {
      if (this.fixedRate === null) {
        const randomChange = (Math.random() * 0.1) - 0.05;
        const newRate = this.rate.value + randomChange;
        this.rate.next(newRate);
      }
    });
  }

  getRate() {
    return this.rate.asObservable();
  }

  setFixedRate(rate: number) {
    this.fixedRate = rate;
    this.rate.next(rate);
  }

  clearFixedRate() {
    this.fixedRate = null;
  }
}
