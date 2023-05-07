import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EUserComponent } from './e-user/e-user.component';
import { DUserComponent } from './d-user/d-user.component';
import { ListuserComponent } from './listuser/listuser.component';
import { GetUserComponent } from './get-user/get-user.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EUserComponent,
    DUserComponent,
    ListuserComponent,
    GetUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
