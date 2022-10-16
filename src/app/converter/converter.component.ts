import { Component, OnInit } from '@angular/core';
import { Currency, HttpResponse } from 'src/types/HttpResponse';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  firstCurrencyValue = '';
  secondCurrencyValue = '';
  firstCurrency = '';
  secondCurrency = '';
  toCurrency = true;
  textResult = '';
  currencies: Currency[] = [];

  ngOnInit(): void {
    fetch(
      'https://api.currencyapi.com/v3/latest?apikey=uAMUgbBiZNDIEV3CGdvp3qlbzsvTqmhHzNLKwkRF'
    )
      .then((res) => res.json())
      .then((res: HttpResponse) => {
        Object.values(res.data).map((value: Currency) => {
          this.currencies.push(value);
        });
      });
  }

  setFirstCUrrency(value: string) {
    this.firstCurrencyValue = value;
    this.toCurrency = true;
  }

  setSecondCurrency(value: string) {
    this.secondCurrencyValue = value;
    this.toCurrency = false;
  }

  handleFirstSelect(value: any) {
    this.firstCurrency = value;
    this.toCurrency = true;
  }

  handleSecondSelect(value: any) {
    this.secondCurrency = value;
    this.toCurrency = false;
  }

  handleConvert() {
    let result = 0;

    let firstCurrencyRate;

    let secondCurrencyRate;

    if (this.toCurrency) {
      firstCurrencyRate = this.currencies.find(
        (currency: Currency) => currency['code'] === this.firstCurrency
      )?.value;

      secondCurrencyRate = this.currencies.find(
        (currency) => currency.code === this.secondCurrency
      )?.value;
    } else {
      firstCurrencyRate = this.currencies.find(
        (currency: Currency) => currency['code'] === this.secondCurrency
      )?.value;

      secondCurrencyRate = this.currencies.find(
        (currency) => currency.code === this.firstCurrency
      )?.value;
    }

    if (!secondCurrencyRate || !firstCurrencyRate) {
      this.textResult = 'You must choose both currencies';

      return;
    }

    if (firstCurrencyRate === secondCurrencyRate) {
      result = +this.firstCurrencyValue;
      this.secondCurrencyValue = result.toString();

      this.textResult = `${this.secondCurrencyValue} ${this.secondCurrency} equals to ${this.firstCurrencyValue} ${this.firstCurrency}`;

      return;
    }

    if (!this.secondCurrencyValue || !this.firstCurrencyValue) {
      this.textResult =
        'Enter value of latest selected currency\n(Last clicked currency will be base currency)';

      return;
    }

    if (this.toCurrency) {
      result =
        firstCurrencyRate > secondCurrencyRate
          ? +this.firstCurrencyValue / firstCurrencyRate
          : +this.firstCurrencyValue * secondCurrencyRate;
    } else {
      result =
        firstCurrencyRate > secondCurrencyRate
          ? +this.secondCurrencyValue / firstCurrencyRate
          : +this.secondCurrencyValue * secondCurrencyRate;
    }

    if (this.toCurrency) {
      this.secondCurrencyValue = result.toFixed(3).toString();

      this.textResult = `
        ${this.firstCurrencyValue} ${this.firstCurrency}
        equals to
        ${this.secondCurrencyValue} ${this.secondCurrency}
      `;
    } else {
      this.firstCurrencyValue = result.toFixed(3).toString();
      this.textResult = `
        ${this.secondCurrencyValue} ${this.secondCurrency}
        equals to
        ${this.firstCurrencyValue} ${this.firstCurrency}
      `;
    }
  }
}
