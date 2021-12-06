import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginService } from '../../shared/services/login.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  showSuccessMessage!: boolean;
  errorMessage!: string;


  constructor(public loginService : LoginService) { }

  ngOnInit(): void {
    
  }
 
  onSubmit(form : NgForm){
    console.log(form.value);
    this.loginService.createUser(form.value).subscribe({
      next:() =>{
        this.showSuccessMessage =true ;
        setTimeout(()=>this.showSuccessMessage =false,4000);
        this.resetForm(form)
      },
      error:()=>{
          this.errorMessage = "somthing went wrong!";
      }
    });
  }

  resetForm(form: NgForm){
    this.loginService.loggedinUser ={
      username : '',
      email : '',
      password : '',
      role : '',
    };
    form.resetForm();
    this.errorMessage = '';
  }


}
