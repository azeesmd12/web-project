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
  errorMessage:any;
  updateBtn!:boolean;
  editBtn:any;
  record:any;
  approved_loan:any;

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
     this.getUserData();
    
  }

  getUserData(){
    this.loginService.adminView().subscribe({
      next:(res:any)=>{
       this.userData = res;
       this.editBtn = true;
       console.log(this.userData)
      },
      error:(err)=>{
        return err.error;
      }
    })
  }

  onUpdate(statusData:any){
    this.loginService.updateStatus(statusData).subscribe({
      next:(res:any) =>{
        this.successMessage = res
        setTimeout(()=>this.successMessage ='',4000);
        this.editBtn = true;
        this.updateBtn = false; 
        this.getUserData();
      },
      error:(err:any)=>{
        this.errorMessage = err.error.message
        setTimeout(()=>this.errorMessage ='',6000);
      }
    })
  }  

  onEdit(item:any){
       this.record = item;
       this.updateBtn = true;
       this.editBtn = false;
       
  }

  onCancel(){
    this.updateBtn = false;
     this.editBtn =true;
     this.getUserData();
     
  }

  onLogout(){
    this.loginService.deleteToken();
    this.router.navigateByUrl('/signin');
  }

}
