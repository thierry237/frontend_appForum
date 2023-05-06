import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { ACommentsComponent } from './a-comments/a-comments.component';
import { DCommentsComponent } from './d-comments/d-comments.component';
import { ListcommentsComponent } from './listcomments/listcomments.component';
import { GetcommentsComponent } from './getcomments/getcomments.component';
import { ECommentsComponent } from './e-comments/e-comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ACommentsComponent,
    DCommentsComponent,
    ListcommentsComponent,
    GetcommentsComponent,
    ECommentsComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CommentsModule { }
