import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/_services/course.service';
import { ICourse, IListCourse } from './../../_interfaces/course';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import jwt_decode from 'jwt-decode';
import { ITokenPayload } from 'src/app/_interfaces/token';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-get-course',
  templateUrl: './get-course.component.html',
  styleUrls: ['./get-course.component.css']
})
export class GetCourseComponent implements OnInit {
  isAdmin: boolean = false;
  username: string = 'admin';
  message_error!: string | null;
  searchCourse: string = '';
  message: string = '';
  idUser!: number;

  //initialisation variable avec interfaces
  decodedToken: ITokenPayload = {
    idUser: 0,
    isAdmin: false,
    username: 'admin',
    iat: 1,
    exp: 2
  }

  courses: ICourse[] = [];

  constructor(private courseservice: CourseService,
    private tokenservice: TokenService,
    private activatedroute: ActivatedRoute,
    private userservice: UserService,
    private router: Router) { }

  //cycle de vie de la page 
  ngOnInit(): void {
    this.idUser = this.tokenservice._idUser();
    this.activatedroute.queryParams.subscribe(params => {
      const search = params['search'];
      if (search) {
        this.searchCourse = search;
        this.searchCourseAPI();
      }
    });
    this.isAdmin = this.tokenservice.isAdmin();
    this.courseservice.getListCourses().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      (data) => {
        console.log(data),
          this.courses = data;
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;


          if (errorMessage == "Unauthorized") {
            this.message_error = "Veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }
        }
      }
    )

    this.userservice.getUserById(this.idUser).subscribe(
      data => {
        this.username = data.username;
      }
    )
  }



  deleteCourse(idCourse: number) {
    this.courseservice.deleteCourse(idCourse).subscribe(
      (data) => {
        console.log(data),
          this.courseservice.getListCourses().subscribe(
            (data) => {
              console.log(data),
                this.courses = data;
            },
            err => {
              console.log(err)
            }
          )
      },
      err => {
        console.log(err)
      }
    )
  }

  onSelect(idCourse: number) {
    this.router.navigate(['/post'], { queryParams: { idCourse: idCourse } });
  }

  searchCourseAPI() {
    this.courseservice.filterCourse(this.searchCourse).subscribe(
      data => {
        if (data) {
          this.courses = data;
        }

      },
      err => {
        console.log(err);
      }
    );
    this.router.navigateByUrl('/course?search=' + this.searchCourse);
  }

  onSearchChange(): void {
    if (this.searchCourse === '') {
      this.courseservice.getListCourses().pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Affiche l'erreur dans la console
          return throwError(error); // Passe l'erreur à la fonction appelante$

        })
      ).subscribe(
        (data) => {
          console.log(data),
            this.courses = data;
        },
        (error: HttpErrorResponse) => {
          if (error && error.error && error.error.message) {
            const errorMessage: string = error.error.message;


            if (errorMessage == "Unauthorized") {
              this.message_error = "Veuillez vous reconnecter de nouveau";
              console.log(this.message_error)
            }
          }
        }
      )
    }
  }

  homePage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/course']);
    });
  }

  editUser() {
    console.log(this.idUser)
    this.router.navigate(['/user/edit/', this.idUser])
  }

  logoutUser() {
    this.tokenservice.logout();
    this.router.navigate(['']);
  }
}



