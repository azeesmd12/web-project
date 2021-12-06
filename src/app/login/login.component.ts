import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginService } from '../shared/services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers : [ LoginService ]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }


}
