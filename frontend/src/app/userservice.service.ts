import { Injectable } from '@angular/core';
import {HttpClient ,HttpResponse} from '@angular/common/http';
import { server_address } from "./globals";


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }
  
  newUser(item:any)
  {   
     return this.http.post(`${server_address}/signup`,{"userdata":item});
  }
  
}
