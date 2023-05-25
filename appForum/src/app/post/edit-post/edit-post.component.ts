import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IPost } from 'src/app/_interfaces/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  modificationValide: boolean = false;
  message_auth!: string | null;
  post: IPost = {
    title: '',
    message: ''
  }
  constructor(private activatedroute: ActivatedRoute,
    private postservice: PostService,
    private router: Router) { }

  ngOnInit(): void {
    const idPost = this.activatedroute.snapshot.params['id'];
    this.postservice.getPostById(idPost).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      data => {
        this.post = data
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;


          if (errorMessage == "Unauthorized") {
            this.message_auth = "Session terminée! veuillez vous reconnecter de nouveau";
            console.log(this.message_auth)
          }
        }
      }
    )
  }

  editPost() {
    this.postservice.editPost(this.post).subscribe(
      data => {
        console.log(data);
        this.modificationValide = true
      },
      err => {
        console.log(err)
      }
    )
  }

  onReturnPost() {
    this.router.navigate(['/post'], { queryParams: { idCourse: this.post.idCourse } });
  }
}
