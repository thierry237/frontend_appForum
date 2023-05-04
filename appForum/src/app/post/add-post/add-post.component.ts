import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/_interfaces/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  idCourse!: string | null;
  ajoutValide: boolean = false;
  post: IPost = {
    title: '',
    message: ''
  }
  constructor(private postservice: PostService,
    private activatedroute: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.idCourse = this.activatedroute.snapshot.queryParamMap.get('idCourse')
    if (this.idCourse)
      this.post.idCourse = parseInt(this.idCourse)

  }

  onSubmit() {
    this.postservice.addPost(this.post).subscribe(
      data => {
        console.log(data);
        this.ajoutValide = true
      },
      err => {
        console.log(err)
      }
    )
  }

  returnListPost() {
    this.router.navigate(['/post'], { queryParams: { idCourse: this.idCourse } });
  }

}
