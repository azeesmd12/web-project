import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm ,NgModel} from '@angular/forms';
import { LoginService } from '../shared/services/login.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loan = {
    firstname : '',
    lastname :'',
    age :'',
    gender:'',
    salary:'',
    loanAmount:'',
    previousLoan:'',
  }
  errorMessage : any;
  successMessage:any;

  constructor(private loginService : LoginService,private router:Router) { }


  ngOnInit(): void {
  }
  
  onSubmit(form : NgForm){
    console.log(form.value);
    this.loginService.createCustomer(form.value).subscribe({
      next:(res:any) =>{
        this.successMessage = true;
        setTimeout(()=>this.successMessage =false,5000);
        this.resetForm(form)
      },
      error:(err)=>{
          this.errorMessage = err.error.message;
      }
    });
  }
  resetForm(form: NgForm){
    this.loan ={
    firstname : '',
    lastname :'',
    age :'',
    gender:'',
    salary:'',
    loanAmount:'',
    previousLoan:'',
    };
    form.resetForm();
    this.errorMessage = '';
  }

  onLogout(){
    this.loginService.deleteToken();
    this.router.navigateByUrl('/signin');
  }

}
