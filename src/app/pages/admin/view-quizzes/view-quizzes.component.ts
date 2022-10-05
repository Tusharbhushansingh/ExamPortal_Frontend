import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttemptServiceService } from 'src/app/services/attempt-service.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  attemptQuiz: any[] =[];

  noOfAttempts:any[]=[];

  quizzes = [
    {
      qid:23,
      title:'Basic Java Quiz',
      description:'example',
      maxMarks:'50',
      numberOfQuestions:'20',
      active: '',
      category:{
        title:'Programming'
      }
    },
    {
      qid:23,
      title:'Basic Java Quiz',
      description:'example',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      }
    }
  ]

  constructor(private _service:QuizService, 
              private _router:Router,
              private _attempt: AttemptServiceService,
              private _user: UserService,
              ) { }

  ngOnInit(): void {
    this._service.getQuizzes().subscribe(
      (data:any) => {
        this.quizzes = data;
        console.log(data);

         for(let i = 0; i < this.quizzes.length; i++){

              this._attempt.getAllAttempts(this.quizzes[i].qid).subscribe(
                (success:any)=>{
                  this.attemptQuiz[i] =  success;
                  console.log(success);
                  this.calculateNoOfAttempt(this.attemptQuiz[i], i);
                },
                (error)=>{
                  console.log("error hai admin attempt logic me !!")
                }
              );
                }

      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error in loading data!','error');
      }

    );
  }

  deleteQuiz(qid:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton:true,
    }).then((result) => {
      if(result.isConfirmed){
        this._service.deleteQuiz(qid).subscribe(
          (data:any)=>{
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid)
            Swal.fire('Success','Quiz Deleted','success');
          },
          (error) => {
            Swal.fire('Error','Error in deleting quiz','error');
          }
        );
      }
    })

  }

  update(qid:any){
    this._router.navigate(['/admin-dashboard/quiz/'+qid]);
    qid='';
  }

  public calculateNoOfAttempt(attemptQuiz:any, index:any){
    this.noOfAttempts[index] = 0;
      for(let i = 0 ; i < attemptQuiz.length ;  i++){
        this.noOfAttempts[index] = this.noOfAttempts[index]  + attemptQuiz[i].numberOfQuizAttempts;
      }
      console.log(this.noOfAttempts[index]);

  }

}
