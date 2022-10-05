import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  //get all quiz 
  public getQuizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(qid:any){
    return this._http.delete(`${baseUrl}/quiz/${qid}`);
  }

  //get a specific quiz
  public getQuiz(qid:any){
    return this._http.get(`${baseUrl}/quiz/${qid}`)
  }

  //update quiz
  public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,quiz)
  }

  //get quiz of category
  public getQuizzesOfCategories(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfcategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`)
  }
}
