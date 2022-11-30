import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookserviceService } from '../bookservice.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  bookItem= {
    name :'',
    author:'',
   description:'',
   imageUrl:''}
  constructor(private bookService:BookserviceService,private router:Router) { }
  
  ngOnInit(): void {
  }
  AddBook()
  {    
    this.bookService.newBook(this.bookItem);
    console.log("Called");    
    alert("New Book Added Successfully");
    this.router.navigate(['books']);
  }

}
