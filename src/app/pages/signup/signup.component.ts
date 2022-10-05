import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService , private snake:MatSnackBar) { }

  public user = {
    username:'',
    password:'',
    firtsname:'',
    lastname:'',
    email:'',
    phone:'',
  }

  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snake.open('Username is required!!', '',{
        duration:3000,
      });
      return;
    }

    // validate

    //addUser: userService
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        Swal.fire('Success done !!','Username '+ data.username+ ' is added suucessfully' , 'success');
      },
      (error)=>{
        //error
        console.log(error);
        Swal.fire('Something went wrong !!','Username already exists' , 'error');
      }
    )
  }

}
