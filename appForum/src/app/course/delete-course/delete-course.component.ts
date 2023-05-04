import { CourseService } from 'src/app/_services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute,
    private courseservice: CourseService,
    private router: Router) { }
  ngOnInit(): void {
    // let idCourse = this.activatedroute.snapshot.params['id']
    // this.courseservice.deleteCourse(idCourse).subscribe(
    //   (data) => {
    //     console.log(data),
    //       this.router.navigate(['/course'])
    //   },
    //   err => {
    //     console.log(err)
    //   }
    // )
  }

}
