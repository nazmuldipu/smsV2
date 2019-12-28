import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { GroupService } from 'src/services/group.service';
import { Group } from 'src/shared/models/group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  companyId;
  group: Group;
  groupList: Group[] = [];

  loadingData = false;
  sendingData = false;
  errorMessage = "";

  constructor(private auth: AuthService, private groupService: GroupService) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe(data => {
      this.companyId = data.companyId;
      if (this.companyId) {
        this.getAllGroups(this.companyId);
      }
    });
  }

  async getAllGroups(companyId) {
    this.loadingData = true;
    await this.groupService.gropus$.subscribe(data => {
      if (data.length) {
        this.groupList = data;
        this.loadingData = false;
      } else {
        this.groupService.getAll(companyId)
          .subscribe(data => {
            this.groupList = data;
            this.loadingData = false;
          });
      }
    })
  }

  onEdit(id) {
    this.group = this.groupList.find(cp => cp.id === id);
  }

  async onCreate(event) {
    this.sendingData = true;
    const value = { companyId: this.companyId, ...event }
    await this.groupService.create(value)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Group SAVING ERROR ! ", error;
      });
    this.clear();
  }

  async onUpdate(event) {
    this.sendingData = true;
    const value = { companyId: this.companyId, ...event }
    await this.groupService.update(this.group.id, value)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Group Updating ERROR ! ", error;
      });
    this.clear();
  }

  onDelete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete')) {
      this.groupService.delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          this.errorMessage = "Group Deleting ERROR ! ", error;
        });
      this.clear();
    }
  }

  clear() {
    this.group = new Group();
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }

}
