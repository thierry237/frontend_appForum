import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ICourse } from 'src/app/_interfaces/course';
import { IUser } from 'src/app/_interfaces/user';
import { CourseService } from 'src/app/_services/course.service';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  users: IUser[] = [];
  isAdmin!: boolean;
  message_auth!: string | null;
  message_error!: string | null;
  searchUser: string = '';
  searchCourse: string = '';
  user: IUser = {
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  };
  course: ICourse = {
    name: '',
    description: ''
  }
  courses: ICourse[] = [];

  constructor(
    private userservice: UserService,
    private courseservice: CourseService,
    private activatedroute: ActivatedRoute,
    private tokenservice: TokenService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.isAdmin = this.tokenservice.isAdmin();
    this.userservice.getAllUsers().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      data => {
        this.users = data;
        console.log(this.users)
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

  addAdmin(idUser: number) {
    this.userservice.getUserById(idUser).subscribe(
      data => {
        this.user = data;
        this.user.isAdmin = !this.user.isAdmin;
        console.log(this.user);
        this.userservice.editUser(this.user).subscribe(
          data => {
            console.log(data);
            this.userservice.getAllUsers().subscribe(
              data => {
                this.users = data;
              },
              err => console.log(err)

            )
          }
        )

      })
  }

  deleteUser(idUser: number) {
    this.userservice.deleteUserById(idUser).subscribe(
      data => {
        console.log(data);
        this.users = [];
        this.userservice.getAllUsers().subscribe(
          data => {
            this.users = data;
          },
          err => console.log(err)

        )
      }
    )
  }

  logoutUser() {
    this.tokenservice.logout();
    this.router.navigate(['']);
  }

  searchUserAPI() {
    console.log(this.user.idUser, this.isAdmin);

    this.userservice.filterUser(this.searchUser).subscribe(
      data => {
        if (data) {
          this.users = data;
        }

      },
      err => {
        console.log(err);
      }
    );
    this.router.navigateByUrl('/user?search=' + this.searchUser);
  }

  onSearchChange(): void {
    if (this.searchUser === '') {
      this.userservice.getAllUsers().pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Affiche l'erreur dans la console
          return throwError(error); // Passe l'erreur à la fonction appelante$

        })
      ).subscribe(
        (data) => {
          console.log(data),
            this.users = data;
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
  }
}
