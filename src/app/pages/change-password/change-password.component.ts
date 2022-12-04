import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  password:any;
  confirmPassword:any;
  email:any;

  constructor(
    private _snack:MatSnackBar,
    private _user: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.email = this._route.snapshot.params['email'];
  }

  formSubmit(){
    this._user.changePassword(this.password, this.email).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Password updated successfully','success');
        this._router.navigate(['/login']);
      },
      (error)=>{
        Swal.fire('Error !!','Password updation fails','error');
        console.log('kuch error hai bhai!!');
        console.log(error);
      }
    );
  }
}
