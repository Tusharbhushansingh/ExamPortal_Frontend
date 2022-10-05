import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {


  qid:any;
  uid:any;

  questions:any;

  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;

  //timer
  timer:any;

  //attempt logic implementation
  user:any;
  quiz:any;


  constructor(
    private _location: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _user:UserService,
    private _quiz:QuizService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestion();
  }

  preventBackButton(){
    history.pushState(null,location.href);
    this._location.onPopState(()=>{
      history.pushState(null,location.href);
    });
  }

  public loadQuestion(){
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (success:any) => {
        this.questions = success;

        //timer logic
        this.timer=this.questions.length*2*60;

        // this.questions.forEach((element: { [x: string]: string; }) => {
        //   element['givenAnswer'] = '';
        // });

        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Error in loading question of quiz','error');
      }
    );
  }

  public submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this.evalQuiz();
      } else if (result.isDenied) {
        
      }
    })
  }

  public startTimer(){
    let t = window.setInterval( ()=> {
      //code
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  public getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  public evalQuiz(){


    //call to server to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer= data.correctAnswer;
        this.attempted=data.attempted;
        this.isSubmit=true;
        this.updateAttempt();
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  public printPage(){
    window.print();
  }

  public updateAttempt(){
    //retrieve the current user information.
    this._user.getCurrentUser().subscribe(
      (data:any)=>{
        console.log(data);
        console.log("user retrieved");
        this.uid = data.id;
        console.log(this.uid,this.qid);
        //add the attempts
        this._user.addAttempt(this.uid,this.qid).subscribe(
          (success:any)=>{
              console.log('attempted done !!');
          },
          (error)=>{
            console.log('attempted incomplete !!');
          });

      },
      (error)=>{
        console.log(error);
      });
  }

}
