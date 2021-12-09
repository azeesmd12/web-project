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
  updateBtn!:boolean;
  editBtn:any;
  record:any;

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
      next:(res) =>{
        this.successMessage = res
        setTimeout(()=>this.successMessage ='',5000);
        this.editBtn = true;
        this.updateBtn = false; 
      },
      error:(err)=>{
        this.successMessage = err.error.message;
        setTimeout(()=>this.successMessage ='',5000);
      }
    })
  }  

  onEdit(item:any){
       this.updateBtn = true;
       this.editBtn = false;
       this.record = item;
  }

  onCancel(){
     this.editBtn =true;
     this.updateBtn = false;
  }

  onLogout(){
    this.loginService.deleteToken();
    this.router.navigateByUrl('/signin');
  }

}
