import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user= {
    username: '',
    password: ''  }
  constructor(private http:HttpClient, private authService:AuthserviceService,private router:Router) { }

  ngOnInit(): void {
  }
// login()
// { 
//   this.authService.login(this.user)
//   .subscribe(response=>{
//     if(response.status(401))
//     {
//       alert("invalid username or password");
//     }

//     else
//     {
//       alert("login successful");
//       localStorage.setItem('token',response.token);
//       this.router.navigate(['books']);
//      }
    
//     })
// }
login(): any {
  let result: any = this.authService.login(this.user);
  result.subscribe(
    (response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/books']);
    },
    (err: any) => {
      console.log('err', err);
      alert(err.error);
    }
  );
}

}
