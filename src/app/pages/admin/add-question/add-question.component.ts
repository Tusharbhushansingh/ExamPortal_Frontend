import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  qid:any;
  title:any;
  questions:any = {
    quiz:{

    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack: MatSnackBar,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.title =  this._route.snapshot.params['title'];
    this.questions.quiz['qid'] = this.qid;
    
  }

  public addQuestion(){
    if(this.questions.content.trim()=='' || this.questions.content==null){
      this._snack.open("Content required !!", '',{
        duration:3000
      })
      return;
    }

    if(this.questions.option1.trim()=='' || this.questions.option1==null){
      this._snack.open("Option 1 required !!", '',{
        duration:3000
      })
      return;
    }

    if(this.questions.option2.trim()=='' || this.questions.option2==null){
      this._snack.open("Option 2 required !!", '',{
        duration:3000
      })
      return;
    }

    if(this.questions.option3.trim()=='' || this.questions.option3==null){
      this._snack.open("Option 3 required !!", '',{
        duration:3000
      })
      return;
    }

    if(this.questions.option4.trim()=='' || this.questions.option4==null){
      this._snack.open("Option 4 required !!", '',{
        duration:3000
      })
      return;
    }


    if(this.questions.answer.trim()=='' || this.questions.answer==null){
      this._snack.open("Answer required !!", '',{
        duration:3000
      })
      return;
    }

    //form submit
    this._question.addQuestion(this.questions).subscribe(
      (data:any) =>{
        this.questions = '';
        Swal.fire('Success !!','Category is added successfully','success');
        this._router.navigate(['/admin-dashboard/view-questions/'+this.qid+'/'+this.title]);
      },
      (error) => {
        Swal.fire('Error !!','Server error !!','error');
      }
    );
  }

}
