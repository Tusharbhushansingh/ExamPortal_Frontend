import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  //add user
  public addUser(user:any){
    return this.http.post(`${baseUrl}/user/`, user);
  }

  //add the attempts
  public addAttempt(userid:any,quizid:any){
    return this.http.post(`${baseUrl}/attempt/${userid}/${quizid}`,userid,quizid);
  }

  //current user: which is Loggedin
    public getCurrentUser(){
      return this.http.get(`${baseUrl}/current-user`);
    }
}
