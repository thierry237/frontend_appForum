import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { IUser } from 'src/app/_interfaces/user';

@Component({
  selector: 'app-e-user',
  templateUrl: './e-user.component.html',
  styleUrls: ['./e-user.component.css']
})
export class EUserComponent implements OnInit {
  newPassword: boolean = false;
  modificationValide: boolean = false;
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
    this.userservice.editProfil(this.user).subscribe(
      data => {
        console.log(data);
        this.modificationValide = true

      },
      err => {
        console.log(err)
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
          this.user.password = data.password
          console.log(this.user.password);
        }
      )
    }

  }

}
