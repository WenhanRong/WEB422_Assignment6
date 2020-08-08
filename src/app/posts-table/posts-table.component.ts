import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  blogPosts: Array<BlogPost> = [];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data => this.blogPosts = data);
  }

  rowClicked(e:Event, id: string) {
    e.preventDefault();
    this.router.navigate(['/admin', 'post', id]);
  }
  
}
