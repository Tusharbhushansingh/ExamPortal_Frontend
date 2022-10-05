import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit {

  qid:any;
  quiz:any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz:QuizService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);

    this._quiz.getQuiz(this.qid).subscribe(
      (success:any) =>{
        console.log(success);
        this.quiz = success;
      },
      (error)=>{
        alert('error in loading in quiz data');
      }
    );

  }

  public startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon:'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qid]);
      } else if (result.isDenied) {
      
      }
    })
  }

}
