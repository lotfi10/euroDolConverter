import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HistoryComponent } from './history/history.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(HistoryComponent) historyComponent!: HistoryComponent;

  private pendingConversions: Array<{ rate: number, amount: number, result: number, from: string, to: string }> = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Ensuring ViewChild is initialized
    this.cdr.detectChanges();
    
    // Process any pending conversions
    this.processPendingConversions();
  }

  addConversionToHistory(entry: { rate: number, amount: number, result: number, from: string, to: string }) {
    if (this.historyComponent) {
      this.historyComponent.addToHistory(entry);
    } else {
      // Store the entry until the component is initialized
      this.pendingConversions.push(entry);
    }
  }

  private processPendingConversions() {
    if (this.historyComponent) {
      this.pendingConversions.forEach(entry => {
        this.historyComponent.addToHistory(entry);
      });
      this.pendingConversions = [];
    } else {
      // Retry after a short delay
      setTimeout(() => this.processPendingConversions(), 100);
    }
  }
}