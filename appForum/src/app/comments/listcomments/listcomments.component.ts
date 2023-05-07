import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, mergeMap, throwError } from 'rxjs';
import { IComment } from 'src/app/_interfaces/comment';
import { IPost } from 'src/app/_interfaces/post';
import { IUser } from 'src/app/_interfaces/user';
import { CommentService } from 'src/app/_services/comment.service';
import { PostService } from 'src/app/_services/post.service';
import { TokenService } from 'src/app/_services/token.service';


@Component({
  selector: 'app-listcomments',
  templateUrl: './listcomments.component.html',
  styleUrls: ['./listcomments.component.css']
})
export class ListcommentsComponent implements OnInit {
  idPost: string | null = null;
  commentAdded: boolean = false;
  isAdmin: boolean = false;
  idUser !: number;
  commentsWithUser: any[] = [];

  user: IUser = {
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false
  }
  comment: IComment = {
    comment: '',
    idPost: 0
  };
  post: IPost = {
    title: '',
    message: ''
  }
  comments: IComment[] = [];
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private commentservice: CommentService,
    private tokenservice: TokenService,
    private postservice: PostService,
    private userservice: UserService,
    private router: Router
  ) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      idPost: [null]
    });
  }

  ngOnInit(): void {
    this.idUser = this.tokenservice._idUser();
    this.isAdmin = this.tokenservice.isAdmin();
    this.idPost = this.activatedroute.snapshot.queryParamMap.get('idPost');
    console.log(this.idPost);
    if (this.idPost) {
      this.commentservice.getComments(parseInt(this.idPost)).subscribe(
        (data) => {
          console.log(data),
            this.comments = data,
            this.comments.forEach(comment => {
              if (comment.idUser !== undefined) {
                this.userservice.getUserById(comment.idUser).subscribe(
                  user => {
                    this.commentsWithUser.push({ ...comment, user });
                    this.OrderMessage()
                  }
                )
              }

            });
        },
        err => {
          console.log(err);
        }
      );

      this.postservice.getPostById(parseInt(this.idPost)).subscribe(
        data => {
          this.post = data;
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  clearMessageComment() {
    this.commentAdded = false;
  }

  postId!: number;
  addComment() {
    if (this.idPost !== null) {
      this.postId = parseInt(this.idPost);
    }
    if (this.idPost) {
      this.commentForm.patchValue({ idPost: parseInt(this.idPost) });
      if (this.commentForm.valid) {
        this.comment = this.commentForm.value;
        console.log(this.comment);
        this.commentservice.addComment(this.comment)
          .subscribe((comment: IComment) => {
            const newComment = { ...comment };
            if (newComment.idUser !== undefined) {
              this.userservice.getUserById(newComment.idUser).subscribe(
                user => {
                  this.commentsWithUser.push({ ...newComment, user });
                  this.OrderMessage()
                }
              );
            } else {
              this.commentsWithUser.push(newComment);
              this.OrderMessage()
            }
            this.commentAdded = true;
            this.commentForm.reset();
          });
      }
    }
  }

  OrderMessage() {
    this.commentsWithUser.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        const timeA = dateA.toLocaleTimeString();
        const timeB = dateB.toLocaleTimeString();
        return timeB.localeCompare(timeA);
      }
    });
  }

  deleteComment(idComment: number) {
    this.commentservice.deleteComment(idComment).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      data => {
        console.log(data);
        if (this.idPost) {
          this.commentservice.getComments(parseInt(this.idPost)).subscribe(
            (data) => {
              console.log(data),
                this.comments = data,
                this.commentsWithUser = [],
                this.comments.forEach(comment => {
                  if (comment.idUser !== undefined) {
                    this.userservice.getUserById(comment.idUser).subscribe(
                      user => {
                        this.commentsWithUser.push({ ...comment, user });
                        this.OrderMessage()
                      }
                    )
                  }

                });
            },
            err => {
              console.log(err);
            }
          );

          this.postservice.getPostById(parseInt(this.idPost)).subscribe(
            data => {
              this.post = data;
            },
            err => {
              console.log(err)
            }
          )
        }


      }
    )
  }

  logoutUser() {
    this.tokenservice.logout();
    this.router.navigate(['']);
  }

  onReturnPost() {
    this.router.navigate(['post/'], { queryParams: { idCourse: this.post.idCourse } });
  }



}
