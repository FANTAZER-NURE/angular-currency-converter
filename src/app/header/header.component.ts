import { Component, OnInit } from '@angular/core';
import { Currency, HttpResponse } from 'src/types/HttpResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerCurrencies: Currency[] = [];
  eurRate = 0;
  usdRate = 0;

  ngOnInit(): void {
    fetch(
      'https://api.currencyapi.com/v3/latest?apikey=uAMUgbBiZNDIEV3CGdvp3qlbzsvTqmhHzNLKwkRF&currencies=EUR%2CUAH'
    )
      .then((res) => res.json())
      .then((res: HttpResponse) => {
        Object.values(res.data).map((value: Currency) => {
          this.headerCurrencies.push(value);
        });

         this.eurRate =
           this.headerCurrencies[0].value *
           this.headerCurrencies[1].value;
         this.usdRate = this.headerCurrencies[1].value;
      });
  }


}
