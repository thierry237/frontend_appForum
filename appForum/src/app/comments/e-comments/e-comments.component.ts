import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'src/app/_interfaces/comment';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-e-comments',
  templateUrl: './e-comments.component.html',
  styleUrls: ['./e-comments.component.css']
})
export class ECommentsComponent implements OnInit {
  idComment!: string;
  comments: IComment = {
    comment: ''
  }
  modificationValide: boolean = false;
  constructor(
    private activatedroute: ActivatedRoute,
    private commentservvice: CommentService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.idComment = this.activatedroute.snapshot.params['id'];
    this.commentservvice.getCommentById(parseInt(this.idComment)).subscribe(
      data => {
        this.comments = data;
        console.log(this.comments)
      },
      err => console.log(err)
    )
  }

  editComment() {
    this.commentservvice.editComment(this.comments).subscribe(
      data => {
        console.log(data);
        this.modificationValide = true
      },
      err => console.log(err)
    )


  }

  onReturnComment() {
    this.router.navigate(['/comment'], { queryParams: { idPost: this.comments.idPost } })
  }

}
