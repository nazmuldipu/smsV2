import { Component, OnInit } from '@angular/core';
import { Group } from 'src/shared/models/group.model';
import { GroupService } from 'src/services/group.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {
  // tab = 'All';
  tab = 'Group';
  groupList: Group[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getAllGroups();
  }

  async getAllGroups() {
    await this.groupService.gropus$.subscribe(data => {
      this.groupList = data;
    });
  }

  onSms(sms) {
    switch (this.tab) {
      case 'All':
        console.log("ALL");
        console.log(sms.message);
        break;
      case 'Group':
        console.log('Group');
        console.log(sms.groupId);
        console.log(sms.message);
        break;
    }
  }

}
