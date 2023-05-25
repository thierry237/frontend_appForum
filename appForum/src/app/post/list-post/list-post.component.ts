import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ICourse } from 'src/app/_interfaces/course';
import { IPost } from 'src/app/_interfaces/post';
import { CourseService } from 'src/app/_services/course.service';
import { PostService } from 'src/app/_services/post.service';
import { UserService } from 'src/app/_services/user.service';
import { IUser } from 'src/app/_interfaces/user';
import { TokenService } from 'src/app/_services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  idCourse!: string | null;
  isAdmin: boolean = false;
  idUser !: number;
  message_error!: string | null;

  posts: IPost[] = [];
  postsWithUser: any[] = [];
  user: IUser = {
    idUser: 0,
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    createdAt: '',
    isAdmin: false
  }
  course: ICourse = {
    idCourse: 1,
    name: '',
    description: '',
    createdAt: ''
  }

  constructor(private activatedroute: ActivatedRoute,
    private postservice: PostService,
    private courseservice: CourseService,
    private userservice: UserService,
    private tokenservice: TokenService,
    private router: Router) { }


  ngOnInit(): void {
    this.idUser = this.tokenservice._idUser();
    this.isAdmin = this.tokenservice.isAdmin();
    this.idCourse = this.activatedroute.snapshot.queryParamMap.get('idCourse')
    if (this.idCourse) {
      this.postservice.getListPostCourse(parseInt(this.idCourse)).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Affiche l'erreur dans la console
          return throwError(error); // Passe l'erreur à la fonction appelante$

        })
      ).subscribe(
        (data) => {
          this.posts = data,
            this.posts.forEach(post => {
              if (post.idUser !== undefined) {
                this.userservice.getUserById(post.idUser).subscribe(
                  user => {
                    this.postsWithUser.push({ ...post, user });
                    this.OrderMessage()
                  }
                )
              }

            })
        },
        (error: HttpErrorResponse) => {
          if (error && error.error && error.error.message) {
            const errorMessage: string = error.error.message;


            if (errorMessage == "Unauthorized") {
              this.message_error = "Session terminée! veuillez vous reconnecter de nouveau";
              console.log(this.message_error)
            }
          }
        }
      )

      this.courseservice.getCourseById(parseInt(this.idCourse)).subscribe(
        (data) => {
          this.course = data;
        },
        (error) => {
          console.log(error);
        }
      )

    }

  }

  onSelectPost() {
    console.log(this.idCourse);
    this.router.navigate(['post/add'], { queryParams: { idCourse: this.idCourse } });
  }

  deletePost(idPost: number) {
    this.postservice.deletePost(idPost).subscribe(
      data => {
        console.log(data);
        if (this.idCourse) {
          this.postservice.getListPostCourse(parseInt(this.idCourse)).subscribe(
            (data) => {
              console.log(data),
                this.posts = data,
                this.postsWithUser = [];
              this.posts.forEach(post => {
                if (post.idUser !== undefined) {
                  this.userservice.getUserById(post.idUser).subscribe(
                    user => {
                      this.postsWithUser.push({ ...post, user });
                      this.OrderMessage()
                    }
                  )
                }

              })
            },
            err => {
              console.log(err)
            }
          )

          this.courseservice.getCourseById(parseInt(this.idCourse)).subscribe(
            (data) => {
              this.course = data;
            },
            (error) => {
              console.log(error);
            }
          )

        }

      }
    )
  }


  onComment(idPost: number) {
    this.router.navigate(['/comment'], { queryParams: { idPost: idPost } });
  }

  OrderMessage() {
    this.postsWithUser.sort((a, b) => {
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

  logoutUser() {
    this.tokenservice.logout();
    this.router.navigate(['']);
  }
}



