import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { HistoryComponent } from './history/history.component';
import { ExchangeRateService } from './exchange-rate.service';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    ExchangeRateComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
    
  ],
  providers: [ExchangeRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
