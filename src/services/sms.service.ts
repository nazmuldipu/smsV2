import { Injectable } from '@angular/core';
import { SMS } from '../shared/models/sms.model';
import { AuthService } from './auth.service';
import { PeopleService } from './people.service';
import { User } from 'src/shared/models/user.model';
import { SmsApiService } from './sms-api.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from 'src/shared/models/company.model';
import { People } from 'src/shared/models/people.model';
import { CompanyService } from './company.service';
import { count } from 'rxjs/operators';
import { SourceListMap } from 'source-list-map';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  serviceUrl = 'sms';
  private _smsSource = new BehaviorSubject<SMS[]>([]);
  sms$ = this._smsSource.asObservable();
  sms: SMS[] = [];


  company: Company;
  peopleList: People[] = [];

  constructor(
    private afs: AngularFirestore,
    private companyService: CompanyService,
    private peopleService: PeopleService,
    private smsApiService: SmsApiService) {
  }

  create(sms: SMS) {
    delete sms['id'];
    return this.afs.collection(this.serviceUrl).add({
      ...sms
    });
  }

  sendSMStoAll(sms: SMS) {
    this.company = this.companyService.company;
    let sendCount = 0, successCount = 0, failCount = 0, quota = this.company.smsQuota, companyId = this.company.id;
    let smsURL = [], saveResult = [];

    //Generate sms url for each people
    this.peopleService.peoples$.subscribe(data => {
      data.forEach(user => {
        const value = { ...sms, phone: '88' + user.phone }
        smsURL.push(this.smsApiService.sendSMSUrl(value.phone, value.message, false));
      });
    });
    sendCount = smsURL.length;
    //In case of thread failure update company sms quota first.
    this.company.smsQuota = quota - smsURL.length;
    smsURL.push(this.companyService.update(companyId, this.company));


    if (smsURL.length > quota)
      return "Sorry your SMS balance is below the students number, Buy SMS first";

    //send SMS
    forkJoin(smsURL)
      .subscribe(data => {
        //Save success SMS History
        data.forEach(d => {
          console.log(d);
          if (d && d['resp'] == "Success") {
            successCount++;
            sms.date = new Date();
            quota--;
            sms.notes = quota + '';
            saveResult.push(this.create(sms));
          } else {
            failCount++;
          }
        });

        this.company.smsQuota = quota;
        smsURL.push(this.companyService.update(companyId, this.company));

        forkJoin(saveResult).subscribe(data => {
          data.forEach(d => {
            console.log(d);
          });
        });
      });
  }

  sendGroupSMS(sms: SMS, groupId) {
    this.company = this.companyService.company;
    let sendCount = 0, successCount = 0, failCount = 0, quota = this.company.smsQuota, companyId = this.company.id;
    let smsURL = [], saveResult = [];

    //get group people list and create sms url
    this.peopleService.peoples$.subscribe(data => {
      this.peopleList = data.filter(p => p.groupId == groupId);

      if (this.peopleList.length > this.company.smsQuota)
        return "Sorry your SMS balance is below the students number, Buy SMS first";

      //In case of thread failure update company sms quota first.
      this.company.smsQuota = quota - this.peopleList.length;
      smsURL.push(this.companyService.update(companyId, this.company));

      //Generate sms url for each people
      this.peopleList.forEach(user => {
        const value = { ...sms, phone: '88' + user.phone };
        smsURL.push(this.smsApiService.sendSMSUrl(value.phone, value.message, false));
      });

      sendCount = this.peopleList.length;
    });

    // saveResult.push(this.companyService.update(this.companyId, this.company));
    forkJoin(smsURL)
      .subscribe(data => {
        data.forEach(d => {
          if (d && d['resp'] == "Success") {
            successCount++;
            sms.date = new Date();
            quota--;
            sms.notes = quota + '';
            saveResult.push(this.create(sms));
          } else {
            failCount++;
          }
        });

        this.company.smsQuota = quota;
        saveResult.push(this.companyService.update(companyId, this.company));
        forkJoin(saveResult).subscribe(data => {
          data.forEach(d => {
            console.log(d);
          });
        });
      });
  }

  sendManualSMS(sms: SMS) {
    this.company = this.companyService.company;
    let sendCount = 0, successCount = 0, failCount = 0, quota = this.company.smsQuota, companyId = this.company.id;
    let smsURL = [], saveResult = [];

    if (quota < 2) return "Sorry your SMS balance is below the students number, Buy SMS first";
    const value = { ...sms, phone: '88' + sms.phone }
    smsURL.push(this.smsApiService.sendSMSUrl(value.phone, value.message, false));
    this.company.smsQuota = quota - 1;
    smsURL.push(this.companyService.update(companyId, this.company));

    forkJoin(smsURL)
      .subscribe(data => {
        data.forEach(d => {
          if (d && d['resp'] == "Success") {
            sms.date = new Date();
            quota--;
            sms.notes = quota + '';
            saveResult.push(this.create(sms));
          } else {
            failCount++;
          }
        });

        forkJoin(saveResult).subscribe(data => {
          data.forEach(d => {
            console.log(d);
          });
        });

      });
  }
}
