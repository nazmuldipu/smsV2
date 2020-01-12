import { take, first, single } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';
import { Group } from 'src/shared/models/group.model';
import { User } from 'src/shared/models/user.model';
import { SIGABRT } from 'constants';
import { PeopleService } from 'src/services/people.service';
import { People } from 'src/shared/models/people.model';
import { CompanyService } from 'src/services/company.service';
import { Company } from 'src/shared/models/company.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean;
  isCompany: boolean;
  gropus: Group[] = [];
  peoples: People[] = [];
  company: Company;

  constructor(private auth: AuthService, private userService: UserService,
    private groupService: GroupService, private peopleService: PeopleService,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.getCurrentUser();

  }

  async getCurrentUser() {
    await this.auth.currentUser$.pipe(take(1)).subscribe(data => {
      this.currentUser = data;
      switch (this.currentUser.role) {
        case 'ADMIN':
          this.isAdmin = true;
          this.isCompany = false;
          break;
        case 'COMPANY':
          this.isAdmin = false;
          this.isCompany = true;
          this.getGroupList();
          this.getPeopleList();
          this.getCompanyInfo(this.currentUser.companyId);
          break;
        default:
          this.isCompany = false;
          this.isAdmin = false;
          break;
      }
      if (this.currentUser.role == 'ADMIN') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    })
  }

  async getCompanyInfo(compnayId) {
    await this.companyService.get(compnayId).subscribe((data: Company) => {
      this.company = data;
    })
  }

  async getGroupList() {
    await this.groupService.gropus$.pipe(take(1)).subscribe(data => {
      this.gropus = data;
    })
  }

  async getPeopleList() {
    await this.peopleService.peoples$.pipe(take(1)).subscribe(data => {
      this.peoples = data;
    })
  }

  getNumberOfPeopleInGroup(groupId): number {
    return this.peoples.filter(p => p.groupId == groupId).length;
  }

}
