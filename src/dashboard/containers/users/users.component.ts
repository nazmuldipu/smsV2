import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/shared/models/user.model';
import { CompanyService } from 'src/services/company.service';
import { Company } from 'src/shared/models/company.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loadingData = false;
  sendingData = false;
  errorMessage = "";
  companyList: Company[] = [];
  userList: User[] = [];
  user: User;

  constructor(private auth: AuthService, private userService: UserService, private companyService: CompanyService) { }

  ngOnInit() {
    this.getAllUser();
  }

  async getAllUser() {
    this.loadingData = true;
    this.userService.getAll().subscribe(data => {
      this.loadingData = false;
      this.userList = data;
      this.getAllCompany();
    });
  }

  async getAllCompany() {
    this.loadingData = true;
    await this.companyService.getAll()
      .subscribe(data => {
        this.companyList = data;
        this.loadingData = false;
      });
  }

  onEdit(id) {
    this.user = this.userList.find(u => u.id == id);
  }

  onCreate(event: User) {
    this.sendingData = true;
    this.auth.register(event.email, event.password).then((usr) => {
      const user = { id: usr.user.uid, ...event } as User;
      this.userService.saveUser(usr.user.uid, user)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          this.errorMessage = error.message;
        });
    }).catch((error) => {
      this.sendingData = false;
      this.errorMessage = error.message;
    })
  }

  onUpdate(event: User) {
    this.sendingData = true;
    this.userService.update(this.user.id, event)
      .then(() => { this.sendingData = false; })
      .catch((error) => { this.sendingData = false; this.errorMessage = error.message });

  }

  onDelete(id) {
    const value = this.userList.find(us => us.id === id);
    if (confirm('Are you sure to delete')) {
      this.userService.delete(id).then(() => {
      })
        .catch((error) => {
          this.errorMessage = "User Deleting ERROR ! ", error;
        });
      this.clear();
    }
  }

  clear() {
    this.user = new User();
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }

}
