import { Component, OnInit, Input } from '@angular/core';
import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //blogPosts:Array<BlogPost> = blogData;

  //@Input() posts:Array<BlogPost>;

  constructor() { }

  ngOnInit(): void {
  }

}
