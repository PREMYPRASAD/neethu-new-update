import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { BookserviceService } from '../bookservice.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  // pageTitle:String="Books List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  books=[{
    name:'',
   author:'',
   imageUrl:'',
   description:''
  }]
  constructor(private bookService:BookserviceService,private router:Router,public authService:AuthserviceService) { }

  ngOnInit(): void {
    this.bookService.getBooks()
    .subscribe((data)=>{
      console.log('getbookcomponent', data);
      this.books=JSON.parse(JSON.stringify(data));
    })
  }
  toggleImage(): void{
    this.showImage = !this.showImage;
  }

editBook(book:any)
{
  localStorage.setItem("editBookId",book._id.toString());
this.router.navigate(['update']);
}




  deleteBook(book:any)
  {
    this.bookService.deleteBook(book._id)
      .subscribe((data) => {
        this.books = this.books.filter(p => p !== book);
      })
  }

}
