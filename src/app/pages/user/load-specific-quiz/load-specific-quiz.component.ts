import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { AttemptServiceService } from 'src/app/services/attempt-service.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-load-specific-quiz',
  templateUrl: './load-specific-quiz.component.html',
  styleUrls: ['./load-specific-quiz.component.css']
})
export class LoadSpecificQuizComponent implements OnInit {

  catId:any;
  quizzes:any;

  attemptQuiz: any[] =[];

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _attempt: AttemptServiceService,
    private _user: UserService,
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
      this.catId = params['catid'];
      console.log(this.catId);
      console.log('--------------------');

    this._quiz.getActiveQuizzesOfcategory(this.catId).subscribe(
      (data:any)=>{
        console.log(this.catId);
        this.quizzes=data;
        console.log(this.quizzes);

                //console.log(this.quizzes.length);
                for(let i = 0; i < this.quizzes.length; i++){
                  //this.attempt(this.quiz[i].qid);
                  //this.quiz[i].attempts = this.attemptQuiz;
     
        
                  this._user.getCurrentUser().subscribe(
                    (success:any)=>{
                      this._attempt.getAttempts(success.id,this.quizzes[i].qid).subscribe(
                        (success:any)=>{
                          this.attemptQuiz[i] = success;
                          //console.log(success);
                          console.log(this.attemptQuiz[i]);
                        },
                        (error)=>{
                          this.attemptQuiz[0] = 0;
                          console.log('error hai get attempt logic me !!');
                        }
                      );
              
                    },
                    (error)=>{
                      console.log('error hai get get current user logic me !!');
                    }
                  );
                  
        
                }

      },
      (error)=>{
        console.log(error);
      }
    );
  });   

    this.quizzes = [];
  }

}
