import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCourseComponent } from './get-course/get-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { DetailCourseComponent } from './detail-course/detail-course.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { CourseGuard } from '../_helpers/course.guard';

const routes: Routes = [
  { path: '', component: GetCourseComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddCourseComponent, canActivate: [AuthGuard, CourseGuard] },
  { path: 'edit/:id', component: UpdateCourseComponent, canActivate: [AuthGuard, CourseGuard] },
  { path: ':idCours', component: DetailCourseComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
