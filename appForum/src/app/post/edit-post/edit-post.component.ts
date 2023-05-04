import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/_interfaces/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  modificationValide: boolean = false;
  post: IPost = {
    title: '',
    message: ''
  }
  constructor(private activatedroute: ActivatedRoute,
    private postservice: PostService,
    private router: Router) { }

  ngOnInit(): void {
    const idPost = this.activatedroute.snapshot.params['id'];
    this.postservice.getPostById(idPost).subscribe(
      data => {
        this.post = data
      },
      err => {
        console.log(err)
      }
    )
  }

  editPost() {
    this.postservice.editPost(this.post).subscribe(
      data => {
        console.log(data);
        this.modificationValide = true
      },
      err => {
        console.log(err)
      }
    )
  }

  onReturnPost() {
    this.router.navigate(['/post'], { queryParams: { idCourse: this.post.idCourse } });
  }



}
