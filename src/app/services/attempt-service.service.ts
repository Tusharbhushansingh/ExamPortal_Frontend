import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AttemptServiceService {

  constructor(
    private _http: HttpClient
  ) { }

  //get the attempts of any quiz by the specific user
  public getAttempts(userId:any,quizId:any){
    return this._http.get(`${baseUrl}/attempt/${userId}/${quizId}`);
  }

  //get the attempt of any quiz by admin
  public getAllAttempts(quizId:any){
    return this._http.get(`${baseUrl}/attempt/admin/${quizId}`);
  }
}
