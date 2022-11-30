import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server_address } from "./globals";

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  
  constructor(private http:HttpClient) { }
  getBook(id:any)
  {
    // return this.http.get("http://localhost:3000/"+id);
    return this.http.get(`${server_address}/${id}`);
  }

  getBooks(){
    // return this.http.get("http://localhost:3000/books");
    return this.http.get(`${server_address}/books`);
  }
  newBook(item:any)
  {   
    return this.http.post(`${server_address}/insertbook`,{"book":item})
    .subscribe(data =>{console.log(data)})
  }

  editBook(book:any)
  {
    console.log("client update");
    return this.http.put(`${server_address}/update`,book)
    .subscribe(data=>{console.log(data)})
  }

  deleteBook(id:any)
  {

    return this.http.delete(`${server_address}/remove/${id}`);

  }
}
