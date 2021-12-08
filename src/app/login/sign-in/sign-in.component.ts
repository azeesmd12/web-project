import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  model = {
    username :'',
    password :''
  }

  errorMessage!: string;

  constructor(private loginService : LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    console.log(form.value);
    this.loginService.loginUser(form.value).subscribe({
      next:(res:any) =>{
        this.loginService.storeToken(res['token']);
        let payload = this.loginService.getTokenPayload();
        if(payload.role == 'user'){
          this.router.navigateByUrl('/home/customer');
        }
        if(payload.role == 'admin'){
          this.router.navigateByUrl('/home/admin');
        }   
      },
      error:(err)=>{
          this.errorMessage = err.error.message;
      }
    });
  }

}
