import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import userId from 'src/app/services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }

  loginData = {
    username:'',
    password:''
  }

  constructor(private sncak:MatSnackBar, private login:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log('login button');
    if(this.loginData.username.trim() == '' || this.loginData.username == null){
      this.sncak.open('Username is required !!', '', {
        duration:2000,
      });
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.sncak.open('Password is required !!', '', {
        duration:2000,
      });
      return;
    }

    //request server to get the jwt token
    this.login.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);

        userId : data.id;
        console.log(userId+'user id hai bhai !!');
        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            if(this.login.getUserRole() == 'ADMIN'){
              //redirect... ADMIN: admin-dashboard
              //window.location.href='/admin-dashboard';
              this.router.navigate(['admin-dashboard']);
              this.login.loginStatusSubject.next(true);
            }
            
            else if(this.login.getUserRole() == 'NORMAL'){
              //redirect... NORMAL: normal-dashboard
              //window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true);
            }

            else {
              this.login.logout();
            }
              
            });
      },
      (error:any) => {
        console.log('Failed!!');
        console.log(error);
        this.sncak.open("Invalid details !! Try again", '',{
          duration:3000,
        });
      }
    );

  }

}
