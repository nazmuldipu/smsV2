import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CompanyService } from './company.service';
import { SmsApiService } from './sms-api.service';
import { SmsService } from './sms.service';



@NgModule({
  providers: [AuthService, UserService, CompanyService, SmsService, SmsApiService]
})
export class ServicesModule { }
