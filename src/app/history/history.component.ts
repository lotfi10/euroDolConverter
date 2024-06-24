import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  history: Array<{ rate: number, amount: number, result: number, from: string, to: string }> = [];

  constructor() {}

  addToHistory(entry: { rate: number, amount: number, result: number, from: string, to: string }) {
    this.history.unshift(entry);
    if (this.history.length > 5) {
      this.history.pop();
    }
  }
}
