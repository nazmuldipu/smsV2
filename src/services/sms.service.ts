import { Injectable } from '@angular/core';
import { SMS } from '../shared/models/sms.model';
import { AuthService } from './auth.service';
import { PeopleService } from './people.service';
import { User } from 'src/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  userList: User[];

  constructor(private peopleService: PeopleService) {
  }

  sendSMStoAll(sms: SMS) {
    this.peopleService.peoples$.subscribe(data => {
      data.forEach(user => {
        const value = { ...sms, phone: '88' + user.phone }
        console.log(value);
      })
    })
  }
  sendGroupSMS(sms: SMS, groupId) {
    this.peopleService.peoples$.subscribe(data => {
      data.forEach(user => {
        if (user.groupId == groupId) {
          const value = { ...sms, phone: '88' + user.phone }
          console.log(value);
        }
      })
    })
  }
  sendManualSMS(sms: SMS) {
    console.log('sendManualSMS');
    const value = { ...sms, phone: '88' + sms.phone }
    console.log(value);
  }
}
