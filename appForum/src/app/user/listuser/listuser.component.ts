import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/_interfaces/user';
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
    private activatedroute: ActivatedRoute,
    private tokenservice: TokenService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.isAdmin = this.tokenservice.isAdmin();
    this.userservice.getAllUsers().subscribe(
      data => {
        this.users = data;
        console.log(this.users)
      },
      err => console.log(err)

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

}
