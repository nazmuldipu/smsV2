import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { take } from 'rxjs/operators';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  appUser$;
  appUser;
  role;

  constructor(private auth: AuthService, private userService: UserService) { }

  async ngOnInit() {
    await this.auth.getUser$().pipe(take(1)).subscribe(user => {
      if (user) {
        this.appUser$ = user;
        this.userService.get(user.uid).pipe(take(1))
          .subscribe(data => {
            this.appUser = data;
            if (this.appUser.companyId) {
              localStorage.setItem('companyId', this.appUser.companyId);
            } else {
              localStorage.removeItem('companyId');
            }
            this.role = this.appUser.role;
          });
      }
    });
  }

}
