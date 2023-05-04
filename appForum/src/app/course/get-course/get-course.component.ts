import { Router } from '@angular/router';
import { CourseService } from 'src/app/_services/course.service';
import { ICourse, IListCourse } from './../../_interfaces/course';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import jwt_decode from 'jwt-decode';
import { ITokenPayload } from 'src/app/_interfaces/token';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-course',
  templateUrl: './get-course.component.html',
  styleUrls: ['./get-course.component.css']
})
export class GetCourseComponent implements OnInit {
  isAdmin: boolean = false;
  username: string = 'admin';
  message_error!: string | null;

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
    private router: Router) { }

  //cycle de vie de la page 
  ngOnInit(): void {
    const token = this.tokenservice.getToken();
    this.isAdmin = this.tokenservice.isAdmin();
    this.username = this.tokenservice.getUsername();
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

}


