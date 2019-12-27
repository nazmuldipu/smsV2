import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './containers/index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { DashNavComponent } from './components/dash-nav/dash-nav.component';
import { UsersComponent } from './containers/users/users.component';
import { CompanyComponent } from './containers/company/company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { GroupsComponent } from './containers/groups/groups.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupFormComponent } from './components/group-form/group-form.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'groups', component: GroupsComponent },
      { path: '', component: IndexComponent },
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, IndexComponent, DashNavComponent, UsersComponent, CompanyComponent, CompanyListComponent, CompanyFormComponent, UserListComponent, UserFormComponent, GroupsComponent, GroupListComponent, GroupFormComponent],
  imports: [
    SharedModule, RouterModule.forChild(ROUTES)
  ]
})
export class DashboardModule { }
