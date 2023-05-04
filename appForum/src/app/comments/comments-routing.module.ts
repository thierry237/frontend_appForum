import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACommentsComponent } from './a-comments/a-comments.component';
import { ECommentsComponent } from './e-comments/e-comments.component';
import { DCommentsComponent } from './d-comments/d-comments.component';
import { GetcommentsComponent } from './getcomments/getcomments.component';
import { ListcommentsComponent } from './listcomments/listcomments.component';

const routes: Routes = [
  { path: '', component: ListcommentsComponent },
  { path: 'add', component: ACommentsComponent },
  { path: 'edit/:id', component: ECommentsComponent },
  { path: 'delete/:id', component: DCommentsComponent },
  { path: ':id', component: GetcommentsComponent },
  { path: '**', component: ListcommentsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
