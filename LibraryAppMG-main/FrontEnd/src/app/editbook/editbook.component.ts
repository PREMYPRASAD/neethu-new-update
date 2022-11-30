import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookserviceService } from '../bookservice.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  bookItem= {
    name :'',
    author:'',
   description:'',
   imageUrl:''}
  constructor(private bookService:BookserviceService,private router:Router) { }

  ngOnInit(): void {
    let bookId=localStorage.getItem("editBookId");
    console.log("bookId",bookId);
    this.bookService.getBook(bookId).subscribe((data)=>{
      console.log(data);
      this.bookItem=JSON.parse(JSON.stringify(data));
      console.log(this.bookItem);
    })
  }
  editBook()
  {
    this.bookService.editBook(this.bookItem);
    localStorage.removeItem('editBookId');
    alert("The book details updated successfully");
    this.router.navigate(['books']);
  }


}
