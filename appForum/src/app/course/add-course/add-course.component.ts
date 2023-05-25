import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ICourse } from 'src/app/_interfaces/course';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  message_error!: string | null;
  message_auth!: string | null;
  ajoutValide: boolean = false;
  course: ICourse = {
    name: '',
    description: ''
  }

  constructor(private courseservice: CourseService) { }
  ngOnInit(): void {
  }

  clearUsernameError() {
    this.message_error = null;
  }

  onSubmit() {
    this.courseservice.addCourse(this.course).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      (data) => {
        console.log(data),
          this.ajoutValide = true
      },
      (error: HttpErrorResponse) => {
        if (error && error.error && error.error.message) {
          const errorMessage: string = error.error.message;
          console.log(errorMessage);
          if (errorMessage == "course already exists") {
            this.message_error = "Ce cours existe déjà";
          }
          if (errorMessage == "Unauthorized") {
            this.message_auth = "Veuillez vous reconnecter de nouveau";
            console.log(this.message_error)
          }
        }
      }
    )

  }
}
