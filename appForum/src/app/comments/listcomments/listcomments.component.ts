import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/_interfaces/comment';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-listcomments',
  templateUrl: './listcomments.component.html',
  styleUrls: ['./listcomments.component.css']
})
export class ListcommentsComponent implements OnInit {
  idPost !: string | null;
  comment: IComment = {
    comment: ''
  };
  comments: IComment[] = [];
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private commentservice: CommentService
  ) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.idPost = this.activatedroute.snapshot.queryParamMap.get('idPost')
    if (this.idPost)
      this.commentservice.getComments(parseInt(this.idPost)).subscribe(
        data => {
          this.comments = data;
        },
        err => {
          console.log(err)
        }
      )
    console.log(this.idPost)
  }

  addComment() {
    if (this.commentForm.valid) {
      const comment = this.commentForm.value;
      this.commentservice.addComment(comment)
        .subscribe((newComment: any) => {
          this.comments.push(newComment);
          this.commentForm.reset();
        });
    }
  }

}
