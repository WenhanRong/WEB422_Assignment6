import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})
export class HomePostComponent implements OnInit {

  @Input() posts:Array<BlogPost>;

  constructor() { }

  ngOnInit(): void {
  }

}
