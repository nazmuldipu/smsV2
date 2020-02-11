import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmsApiService {
  // username: string = 'nazmulalam';
  // password: string = 'rubeln123';
  // senderId: string = '8801912239643';

  // proxy = 'https://api.hotelswave.com/proxy/';
  proxy = 'http://192.168.0.10:8080/proxy/';

  constructor(private http: HttpClient) { }

  balance() {
    return this.http
      .get(this.proxy + 'balance');
  }

  sendSMSUrl(phone: string, message: string, bd: boolean = false) {
    let param = 'url?SMSText=' + message + '&GSM=' + phone + '&BD=' + bd;
    // console.log(this.proxy + param);
    return this.http.get(this.proxy + param);
  }
}
