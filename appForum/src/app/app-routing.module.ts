import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  {
    path: '', loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'course', loadChildren: () => import('./course/course.module')
      .then(m => m.CourseModule), canActivate: [AuthGuard]
  },
  {
    path: 'post', loadChildren: () => import('./post/post.module')
      .then(m => m.PostModule), canActivate: [AuthGuard]
  },
  {
    path: 'comment', loadChildren: () => import('./comments/comments.module')
      .then(m => m.CommentsModule), canActivate: [AuthGuard]
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule), canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
