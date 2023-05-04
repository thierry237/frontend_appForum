import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { GetCourseComponent } from './get-course/get-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { DetailCourseComponent } from './detail-course/detail-course.component';


@NgModule({
  declarations: [
    GetCourseComponent,
    AddCourseComponent,
    UpdateCourseComponent,
    DeleteCourseComponent,
    DetailCourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule
  ]
})
export class CourseModule { }
