import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {


  qid:any;
  qtitle:any;
  questionId:any;
  questions=[
    {
      answer:'',
      content:'',
      image:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      quesid:'',
      quiz:{

      }      
    }
  ]

  constructor(
    private _route:ActivatedRoute,
    private _question: QuestionService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qtitle = this._route.snapshot.params['title'];
    console.log(this.qid);
    console.log(this.qtitle);
    this._question.getQuestionOfQuiz(this.qid).subscribe(
      (data:any) => {
        this.questions = data;
        this.questionId =  data.quesId;
        console.log(this.questionId);
        console.log(this.questions);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteQuestion(questionId:any){
        console.log(questionId);
        Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton:true,
    }).then((result) => {
      if(result.isConfirmed){
        this._question.deleteQuestion(questionId).subscribe(
          (data:any)=>{
            this.questions = this.questions.filter((question) => question.quesid != questionId)
            Swal.fire('Success','Quiz Deleted','success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error','Error in deleting quiz','error');
          }
        );
      }
    })
  }

  public update(quesid:any){
    this._router.navigate(['/admin-dashboard/update-question/'+quesid+'/'+this.qtitle]);
    quesid='';
  }

}
