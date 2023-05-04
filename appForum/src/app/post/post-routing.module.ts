import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostComponent } from './list-post/list-post.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { GetPostComponent } from './get-post/get-post.component';
import { APostGuard } from '../_helpers/a-post.guard';

const routes: Routes = [
  { path: '', component: ListPostComponent, canActivate: [AuthGuard, APostGuard] },
  { path: 'add', component: AddPostComponent, canActivate: [AuthGuard, APostGuard] },
  { path: 'edit/:id', component: EditPostComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: DeletePostComponent, canActivate: [AuthGuard] },
  { path: 'get/:id', component: GetPostComponent, canActivate: [AuthGuard] },
  { path: '**', component: ListPostComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
