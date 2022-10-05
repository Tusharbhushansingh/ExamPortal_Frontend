import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  url:any;
  quesid:any;
  title:any;
  question:any = {
    quiz:{
      qid:'',
      title:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }

  constructor( 
    private _router: ActivatedRoute,
    private _question:QuestionService,
    private _route: Router,
  ) { }

  ngOnInit(): void {
    this.quesid = this._router.snapshot.params['quesid'];
    this.title = this._router.snapshot.params['title'];

    this._question.getQuestionId(this.quesid).subscribe(
      (data:any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    );

  }


  public updateQuestion(){
    
    this._question.updateQuestion(this.question).subscribe(
      (data:any) => {
        Swal.fire('Success !!','Question Updated','success').then((e) => {
          this._route.navigate(['/admin-dashboard/view-questions/'+this.question.quiz.qid+'/'+this.question.quiz.title]);
          console.log(this.question.quiz.qid);
          console.log(this.question.quiz.title);
        });
      },
      (error) => {
        Swal.fire('Error !!','Error in question updation','error');
        console.log(error);
      }
    );
    }
  
}
