import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { ListPostComponent } from './list-post/list-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { GetPostComponent } from './get-post/get-post.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListPostComponent,
    AddPostComponent,
    EditPostComponent,
    DeletePostComponent,
    GetPostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule
  ]
})
export class PostModule { }
