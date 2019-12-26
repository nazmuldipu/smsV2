import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';



@NgModule({
  providers: [AuthService, UserService]
})
export class ServicesModule { }
