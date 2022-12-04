import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css']
})
export class OtpVerifyComponent implements OnInit {

  otp : any;
  email:any
  
  constructor(private _snack:MatSnackBar,
    private _user: UserService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this.email = this._route.snapshot.params['email'];

  }
  formSubmit(){

    this._user.verifyOtp(this.otp, this.email).subscribe(
      (data:any)=>{
        if(data == true){
        Swal.fire('Success !!','Otp is verify successfully','success');
        this._router.navigate(['/changepassword/' + this.email]);
        }
        else
        {
          Swal.fire('Error !!','Invalid Otp','error'); 
        }
       // this._router.navigate(['/otpverify']);
      },
      (error)=>{
        Swal.fire('Error !!','Invalid Otp','error');
        console.log('kuch error hai bhai!!');
        console.log(error);
      }
    );


  }

}
