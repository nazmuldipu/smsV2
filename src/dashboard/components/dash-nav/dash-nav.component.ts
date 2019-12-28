import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { take } from 'rxjs/operators';
import { GroupService } from 'src/services/group.service';
import { PeopleService } from 'src/services/people.service';

@Component({
  selector: 'dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss']
})
export class DashNavComponent implements OnInit {
  show = false;
  appUser$;
  appUser;
  roles = [];

  constructor(private auth: AuthService, private userService: UserService,
    private groupService: GroupService, private router: Router, private peopleService: PeopleService) { }

  async ngOnInit() {
    await this.auth.getUser$().pipe(take(1)).subscribe(user => {
      if (user) {
        this.appUser$ = user;
        this.userService.get(user.uid).pipe(take(1))
          .subscribe(data => {
            this.appUser = data;
            this.auth._userSource.next(this.appUser);
            if (this.appUser.companyId) {
              localStorage.setItem('companyId', this.appUser.companyId);
              this.groupService.getAndStoreAll(this.appUser.companyId);
              this.peopleService.getAndStoreAll(this.appUser.companyId);
            } else {
              localStorage.removeItem('companyId');
            }
            this.roles = this.appUser.role;
          });
      }
    });
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  hasAdminRole(): boolean {
    return this.roles.includes('ADMIN');
  }

  hasCompanyRole(): boolean {
    return this.roles.includes('COMPANY') && !!this.appUser.companyId;
  }

  logout() {
    this.appUser$ = null;
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
