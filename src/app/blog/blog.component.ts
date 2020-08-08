import { Component, OnInit, OnDestroy } from '@angular/core';
import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
//import { Comment } from '../comment';

import { PostService } from '../post.service';
//import { ActivatedRoute } from '@angular/router';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  //blogPosts:Array<BlogPost> = blogData;
  blogPosts:Array<BlogPost>;

  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub: Subscription;
  //querySub: any;

  constructor(private postService: PostService, private route: ActivatedRoute) { }
  //constructor(private postData: PostService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    //console.log("blogPosts:", this.blogPosts);
    this.querySub = this.route.queryParams.subscribe(params => {

      if (params['tag']) {
      this.tag = params['tag'];
      this.category = null;
      }else{
      this.tag = null;
      }

      if (params['category']) {
      this.category = params['category'];
      this.tag = null;
      }else{
      this.category = null;
      }

      this.getPage(+params['page'] || 1);

     });
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }
  
  getPage(num: number): void {
    this.postService.getPosts(num, this.tag, this.category).subscribe(data => {
      if (data.length > 0) {
        this.blogPosts = data;
        this.page = num;
      }
    });
    window.scrollTo(0,0);
  }

//   ngOnInit() {

//     this.querySub = this.route.queryParams.subscribe(params => {

//       if (params['tag']) {
//         this.tag = params['tag'];
//         this.category = null;
//       }else{
//         this.tag = null;
//       }

//       if (params['category']) {
//         this.category = params['category'];
//         this.tag = null;
//       }else{
//         this.category = null;
//       }
      
//       this.getPage(+params['page'] || 1);
//     });

//   }

//   getPage(num){
//     this.postData.getPosts(num, this.tag, this.category).subscribe(data =>{
//       if(data.length > 0){
//         this.blogPosts = data;
//         this.page=num;
//         // Extra Challenge
//         window.scrollTo(0,0);
//       }
//     });
// }

  

//   ngOnDestroy(){
//     if(this.querySub) this.querySub.unsubscribe();
//   }


}
