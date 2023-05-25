import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { IUser } from 'src/app/_interfaces/user';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-e-user',
  templateUrl: './e-user.component.html',
  styleUrls: ['./e-user.component.css']
})
export class EUserComponent implements OnInit {
  newPassword: boolean = false;
  modificationValide: boolean = false;
  message_auth!: string | null;
  idUser!: number;
  user: IUser = {
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  };
  constructor(
    private userservice: UserService,
    private activatedroute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.idUser = this.activatedroute.snapshot.params['id'];
    this.userservice.getUserById(this.idUser).subscribe(
      data => {
        console.log(data);

        this.user = data;
      }
    )
  }

  onSubmit() {
    if (!this.newPassword) {
      this.user.password = 'edit';
    }
    console.log("update");
    console.log(this.user);
    this.userservice.editProfil(this.user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error); // Affiche l'erreur dans la console
        return throwError(error); // Passe l'erreur à la fonction appelante$

      })
    ).subscribe(
      data => {
        console.log(data);
        this.modificationValide = true

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

  changePassword() {
    this.newPassword = !this.newPassword;
    console.log(this.newPassword);
    if (this.newPassword) {
      this.user.password = ''
      console.log(this.user.password)
    } else {
      this.userservice.getUserById(this.idUser).subscribe(
        data => {
          this.user.password = 'edit';
          console.log(this.user.password);
        }
      )
    }

  }

}
