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
  newLoanAppBtn:boolean=true;
  btnName = "New Loan Application";
  customerInfo:any;
  errorMessage : any;
  successMessage:any;
  btnClass="btn btn-success";
  userDetails={
    username:'',
    userid:''
  };

  constructor(private loginService : LoginService,private router:Router) {
    this.getUsername();
  }


  ngOnInit(): void {
    this.customerDetails();
  }

  getUsername(){
    let payload = this.loginService.getTokenPayload()
    this.userDetails.username = payload.username;
    this.userDetails.userid=payload.id;
    console.log(this.userDetails)
  }
  
  onSubmit(form : NgForm){
    console.log(form.value);
    this.loginService.createCustomer(form.value,this.userDetails).subscribe({
      next:(res:any) =>{
        this.successMessage = true;
        setTimeout(()=>this.successMessage =false,1000);
        setTimeout(()=>{
          this.newLoanAppBtn = true;
          this.customerDetails();
        },1000);
        this.resetForm(form);
        
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

  addCustomer(){
    if(this.newLoanAppBtn){
      this.btnClass = "btn btn-primary"
      this.newLoanAppBtn=false;
      this.btnName = "Back"
      
    }
    else{
      this.btnClass = "btn btn-success"
      this.newLoanAppBtn=true;
      this.btnName = "New Loan Application"
    }
}
customerDetails(){
      this.loginService.getCustomerLoanStatus(this.userDetails.userid).subscribe({
        next:(res)=>{
          console.log(res);
          this.customerInfo = res; 
        },
        error:(err:any)=>{
          return err.error
        }
      })
}

  onLogout(){
    this.loginService.deleteToken();
    this.router.navigateByUrl('/signin');
  }

}
