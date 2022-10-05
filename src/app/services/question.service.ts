import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  //get question
  public getQuestionOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //load question
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(qid:any){
    return this._http.delete(`${baseUrl}/question/${qid}`);
  }

  //upate question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  //get question of question id
  public getQuestionId(quesid:any){
    return this._http.get(`${baseUrl}/question/${quesid}`);
  }

    //get question
    public getQuestionOfQuizForTest(qid:any){
      return this._http.get(`${baseUrl}/question/quiz/${qid}`);
    }

    //eval quiz
    public evalQuiz(question:any){
      return this._http.post(`${baseUrl}/question/eval-quiz`,question);
    }
  
}
