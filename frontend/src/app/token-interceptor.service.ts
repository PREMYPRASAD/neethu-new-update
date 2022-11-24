import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req:any, nxt:any) {
   let authService=this.injector.get(AuthserviceService);
   let tokenizedReq=req.clone(
    {
    setHeaders:
    {
      Authorization: `Bearer ${authService.getToken()}`
    }
   })
   
   return nxt.handle(tokenizedReq);
   
  }
}
