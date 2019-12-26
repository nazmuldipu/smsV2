import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CompanyService } from './company.service';



@NgModule({
  providers: [AuthService, UserService, CompanyService]
})
export class ServicesModule { }
