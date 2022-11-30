import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user= {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  
  

   }
  constructor(private userService:UserserviceService,private router:Router) { }

  ngOnInit(): void {
  }
  signup()
  {    console.log("user",this.user);
    let result:any=this.userService.newUser(this.user);
    console.log("result",result);
    result.subscribe(

      (res:any)=>{
        alert(res.status);
        this.router.navigate(['login']);
      },
      (err:any)=>
      {
        alert(err.error.status);
      }

    )
   
    
  }

  // signupForm=this.fb.group(
  //   {
  //     username:['',Validators.required],
  //     password:['',[Validators.minLength(6),Validators.required]],
  //     confirm_password:['',[Validators.minLength(6),Validators.required]]

  //   }
    
    // )
  

}
