import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  loggedinUser: Login = {
    username: '',
    email:'',
    password: '',
    role : 'user'
    
}

noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'}) };

  constructor(private http:HttpClient) { }
  
  createUser(user: Login,){
    user.role = 'user';
    console.log('user details:',user);
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  loginUser(signin:any){
    console.log('loginuser ** Res',signin);
    return this.http.post(environment.apiBaseUrl+'/login',signin,this.noAuthHeader);
  }

  createCustomer(customer:any){
    console.log("customer",customer);
    return this.http.post(environment.apiBaseUrl+'/customer/loan',customer);
  }


//helper methods:

  storeToken(token:any){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getTokenPayload(){
    const token = this.getToken();
    if(token){
      const tokenPayload = atob(token.split('.')[1]);
      return JSON.parse(tokenPayload);
    }else{
      return null;
    }
  }

  isLoggedIn(){
    const tokenPayload = this.getTokenPayload();
    if(tokenPayload){
      return tokenPayload.exp > Date.now() / 1000;
    }else{
      return false;
    }
  }

}
