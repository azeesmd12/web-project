import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userData:any;
  successMessage:any;

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
     this.getUserData();
    
  }

  getUserData(){
    this.loginService.adminView().subscribe({
      next:(res:any)=>{
       this.userData = res;
       console.log(this.userData)
      },
      error:(err)=>{
        return err.error;
      }
    })
  }

  onSubmit(statusData:any){
    this.loginService.updateStatus(statusData).subscribe({
      next:(res) =>{
        this.successMessage = res
        setTimeout(()=>this.successMessage ='',5000);
      },
      error:(err)=>{
        err.error;
      }
    })
  }  
  onLogout(){
    this.loginService.deleteToken();
    this.router.navigateByUrl('/signin');
  }

}
