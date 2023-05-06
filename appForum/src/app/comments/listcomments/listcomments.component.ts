import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, mergeMap } from 'rxjs';
import { IComment } from 'src/app/_interfaces/comment';
import { IPost } from 'src/app/_interfaces/post';
import { IUser } from 'src/app/_interfaces/user';
import { CommentService } from 'src/app/_services/comment.service';
import { PostService } from 'src/app/_services/post.service';


@Component({
  selector: 'app-listcomments',
  templateUrl: './listcomments.component.html',
  styleUrls: ['./listcomments.component.css']
})
export class ListcommentsComponent implements OnInit {
  idPost: string | null = null;
  commentAdded: boolean = false;
  commentsWithUser: any[] = [];
  user: IUser = {
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false
  }
  comment: IComment = {
    comment: '',
    idPost: 0
  };
  post: IPost = {
    title: '',
    message: ''
  }
  comments: IComment[] = [];
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private commentservice: CommentService,
    private postservice: PostService,
    private userservice: UserService
  ) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      idPost: [null]
    });
  }

  ngOnInit(): void {
    this.idPost = this.activatedroute.snapshot.queryParamMap.get('idPost');
    console.log(this.idPost);
    if (this.idPost) {
      this.commentservice.getComments(parseInt(this.idPost)).subscribe(
        (data) => {
          console.log(data),
            this.comments = data,
            this.comments.forEach(comment => {
              if (comment.idUser !== undefined) {
                this.userservice.getUserById(comment.idUser).subscribe(
                  user => {
                    this.commentsWithUser.push({ ...comment, user });
                    this.OrderMessage()
                  }
                )
              }

            });
        },
        err => {
          console.log(err);
        }
      );

      this.postservice.getPostById(parseInt(this.idPost)).subscribe(
        data => {
          this.post = data;
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  clearMessageComment() {
    this.commentAdded = false;
  }

  postId!: number;
  addComment() {
    if (this.idPost !== null) {
      this.postId = parseInt(this.idPost);
    }
    if (this.idPost) {
      this.commentForm.patchValue({ idPost: parseInt(this.idPost) });
      if (this.commentForm.valid) {
        this.comment = this.commentForm.value;
        console.log(this.comment);
        this.commentservice.addComment(this.comment)
          .subscribe((comment: IComment) => {
            const newComment = { ...comment };
            if (newComment.idUser !== undefined) {
              this.userservice.getUserById(newComment.idUser).subscribe(
                user => {
                  this.commentsWithUser.push({ ...newComment, user });
                  this.OrderMessage()
                }
              );
            } else {
              this.commentsWithUser.push(newComment);
              this.OrderMessage()
            }
            this.commentAdded = true;
            this.commentForm.reset();
          });
      }
    }
  }

  OrderMessage() {
    this.commentsWithUser.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        const timeA = dateA.toLocaleTimeString();
        const timeB = dateB.toLocaleTimeString();
        return timeB.localeCompare(timeA);
      }
    });
  }

}
