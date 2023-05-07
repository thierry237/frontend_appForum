import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ListuserComponent } from './listuser/listuser.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { GetUserComponent } from './get-user/get-user.component';
import { DUserComponent } from './d-user/d-user.component';
import { EUserComponent } from './e-user/e-user.component';

const routes: Routes = [
  { path: '', component: ListuserComponent, canActivate: [AuthGuard] },
  { path: 'get/:id', component: GetUserComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: DUserComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EUserComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
