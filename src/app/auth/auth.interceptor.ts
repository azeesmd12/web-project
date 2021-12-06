import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService : LoginService,private router : Router){

    }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    if(req.headers.get('noAuth'))
        return next.handle(req.clone());
    else{
        const clonedReq = req.clone({
            headers : req.headers.set("Authorization","Bearer "+ this.loginService.getToken())
        });
        return next.handle(clonedReq).pipe(
            tap({
                next:(res:any) =>{

                },
                error:(err)=>{
                        if(err.error.auth == false){
                            this.router.navigateByUrl('/signin');
                        }
                }
            })
            
        );
    }

  }
}
