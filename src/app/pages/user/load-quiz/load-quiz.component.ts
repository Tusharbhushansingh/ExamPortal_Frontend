import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttemptServiceService } from 'src/app/services/attempt-service.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {


  catId:any;
  quizzes:any;
  userId:any;

  quiz : any[] = [
    {
         active:'',
    category:{},
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    qid:'',
    title:'',
    attempts:'', 
    }
  ];

//   quiz = [
//     {
//     active:'',
//     category:{},
//     description:'',
//     maxMarks:'',
//     numberOfQuestions:'',
//     qid:'',
//     title:'',
//     attempts:'',
//   },
// ];


  attemptQuiz: any[] =[];

  quizId:any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz:QuizService,
    private _attempt: AttemptServiceService,
    private _user: UserService,
  ) { }

  ngOnInit(): void {
    //load all the quizzes
    
    this._quiz.getActiveQuizzes().subscribe(
      (success:any)=>{
        this.quizzes = success;
        this.quiz = success;
        console.log(this.quizzes);

        // this._user.getCurrentUser().subscribe(
        //   (data:any)=>{
        //     this.userId=data.id;
        //     console.log(this.userId);
        //   },
        //   (error)=>{}
        // );

        //console.log(this.quizzes.length);
        for(let i = 0; i < this.quizzes.length; i++){
          //this.attempt(this.quiz[i].qid);
          //this.quiz[i].attempts = this.attemptQuiz; 

          this._user.getCurrentUser().subscribe(
            (data:any)=>{
              this._attempt.getAttempts(data.id,this.quiz[i].qid).subscribe(
                (success:any)=>{
                  this.attemptQuiz[i] = success;
                  //console.log(success);
                  console.log(this.attemptQuiz[i]);
                },
                (error)=>{
                  console.log('error hai get attempt logic me !!');
                }
              );
      
            },
            (error)=>{
              console.log('error hai get get current user logic me !!');
            }
          );
          

        }
       // this.attempt(this.quizzes[1].qid);
      },
      (error)=>{
          console.log(error);
      }
    );

    console.log(this.attemptQuiz);
   } 


}
