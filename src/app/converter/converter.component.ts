import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { ExchangeRateService } from '../exchange-rate.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  form!: FormGroup;
  convertedValue: number = 0;
  isEurToUsd: boolean = true;

  @Output() conversion = new EventEmitter<{ rate: number, amount: number, result: number, from: string, to: string }>();

  constructor(
    private fb: FormBuilder,
    private exchangeRateService: ExchangeRateService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      amount: [0],
      fixedRate: [null]
    });

    this.form.get('fixedRate')!.valueChanges.subscribe(rate => {
      if (rate) {
        this.exchangeRateService.setFixedRate(rate);
      } else {
        this.exchangeRateService.clearFixedRate();
      }
    });

    this.exchangeRateService.getRate().subscribe(rate => {
      this.updateConvertedValue(rate);
    });

    this.form.get('amount')!.valueChanges.subscribe(() => {
      this.exchangeRateService.getRate().subscribe(rate => {
        this.updateConvertedValue(rate);
      });
    });
  }

  updateConvertedValue(rate: number) {
    const amount = this.form.get('amount')!.value;
    let result;
    if (this.isEurToUsd) {
      result = amount * rate;
    } else {
      result = amount / rate;
    }
    this.convertedValue = result;

    // Emit the conversion event
    this.conversion.emit({
      rate,
      amount,
      result,
      from: this.isEurToUsd ? 'EUR' : 'USD',
      to: this.isEurToUsd ? 'USD' : 'EUR'
    });
  }

  toggleCurrency() {
    this.isEurToUsd = !this.isEurToUsd;
    const amount = this.convertedValue;
    this.form.patchValue({ amount });
    this.exchangeRateService.getRate().subscribe(rate => {
      this.updateConvertedValue(rate);
    });
  }
}
