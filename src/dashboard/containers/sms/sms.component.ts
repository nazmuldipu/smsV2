import { Component, OnInit } from '@angular/core';
import { Group } from 'src/shared/models/group.model';
import { GroupService } from 'src/services/group.service';
import { SMS } from '../../../shared/models/sms.model';
import { SmsService } from 'src/services/sms.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {
  tab = 'All';
  companyId;
  userId;
  groupList: Group[] = [];

  constructor(private groupService: GroupService, private smsService: SmsService, private auth: AuthService) { }

  ngOnInit() {
    this.getAllGroups();
    this.auth.currentUser$.subscribe(data => {
      if (data.id) {
        this.userId = data.id;
        this.companyId = data.companyId;
      }
    })
  }

  async getAllGroups() {
    await this.groupService.gropus$.subscribe(data => {
      this.groupList = data;
    });
  }

  onSms(sms) {
    switch (this.tab) {
      case 'All':
        const value1 = new SMS(null, new Date(), this.companyId, this.userId, 'phone', sms.message, this.tab);

        sms.userId = this.userId;
        this.smsService.sendSMStoAll(value1);
        break;
      case 'Group':
        const value2 = new SMS(null, new Date(), this.companyId, this.userId, 'phone', sms.message, this.tab);
        this.smsService.sendGroupSMS(value2, sms.groupId);
        break;
      case 'Manual':
        const value3 = new SMS(null, new Date(), this.companyId, this.userId, sms.phone, sms.message, this.tab);
        this.smsService.sendManualSMS(value3);
        break;
    }
  }

}
