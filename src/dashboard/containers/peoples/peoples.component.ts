import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/services/people.service';
import { People } from 'src/shared/models/people.model';
import { Group } from 'src/shared/models/group.model';
import { GroupService } from 'src/services/group.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.scss']
})
export class PeoplesComponent implements OnInit {
  companyId;
  people: People;
  peopleList: People[] = [];
  groupe: Group;
  groupList: Group[] = [];

  loadingData = false;
  sendingData = false;
  errorMessage = "";

  constructor(private auth: AuthService,
    private peopleService: PeopleService, private groupService: GroupService) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe(data => {
      this.companyId = data.companyId;
    });
    this.getAllGroups();
  }

  async getAllGroups() {
    this.loadingData = true;
    await this.groupService.gropus$.subscribe(data => {
      this.groupList = data;
      this.loadingData = false;
    });
  }

  onGroupChanged(event) {
    this.groupe = this.groupList.find(gr => gr.id === event);
    this.getGroupPeople(event);
  }

  onEdit(peopleId) {
    this.people = this.peopleList.find(pep => pep.id == peopleId);
  }

  async getGroupPeople(groupId) {
    this.peopleService.peoples$.subscribe(data => {
      this.peopleList = data.filter(p => p.groupId == groupId);
    })
  }

  async onCreate(event) {
    this.sendingData = true;
    const value = { companyId: this.companyId, ...event }
    await this.peopleService.create(value)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Company SAVING ERROR ! ", error;
      });
    this.clear();
  }
  async onUpdate(event) {
    this.sendingData = true;
    const value = { companyId: this.companyId, ...event }
    await this.peopleService.update(this.people.id, value)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "People Updating ERROR ! ", error;
      });
    this.clear();
  }
  onDelete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete')) {
      this.peopleService.delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          this.errorMessage = "People Deleting ERROR ! ", error;
        });
      this.clear();
    }
  }

  clear() {
    this.people = new People();
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }

}
