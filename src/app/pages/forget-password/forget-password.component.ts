import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email : any;
  pass : boolean = false;

  constructor(private _snack:MatSnackBar,
              private _user: UserService,
              private _router: Router
    ) { }

  ngOnInit(): void {
  }
  public formSubmit(){

    this._user.sendOtp(this.email).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Otp send successfully to registered email address','success');
        this._router.navigate(['/otpverify/' + this.email]);
      },
      (error)=>{
        Swal.fire('Error !!','Error in question updation','error');
        console.log('kuch error hai bhai!!');
        console.log(error);
      }
    );
  }

}
