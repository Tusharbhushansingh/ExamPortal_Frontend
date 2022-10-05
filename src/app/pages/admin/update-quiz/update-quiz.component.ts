import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _router: ActivatedRoute, 
              private _http:QuizService, 
              private _category:CategoryService,
              private _routernav:Router,
              private _snack:MatSnackBar) { }

  qid = 0;

  quiz:any;

  categories=[
    {
      cid:23,
      title:'Programming'
    },
    {
      cid:24,
      title:'GK'
    },
  ]

  ngOnInit(): void {

    this._category.categories().subscribe(
      (data:any) =>{
        //categories load successfully
        this.categories=data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!','Error in loading from server','error');
      }
    );

    this.qid = this._router.snapshot.params['qid'];

    this._http.getQuiz(this.qid).subscribe(
      (data:any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log('error');
      }
    );

  }


  //update form submit
  public updateData(){
    
    //validation

    //update
    this._http.updateQuiz(this.quiz).subscribe(
      (data:any) =>{
        Swal.fire('Success !!','Quiz Updated','success').then((e) => {
          this._routernav.navigate(['/admin-dashboard/view-quizzes']);
        });
      },
      (error)=>{

        Swal.fire('Error !!','Error in quiz updation','error');
        console.log(error);
      }
    );
  }
}
