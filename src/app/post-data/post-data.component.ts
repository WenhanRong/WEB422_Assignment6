import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
//import { ActivatedRoute } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  querySub:Subscription;  
  //querySub: any;

  //@Input() post:BlogPost;
  post:BlogPost;
  
  //Assignment 6 -- Step 2
  commentName: string;
  commentText: string;
  
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.postService.getPostbyId(params['id']).subscribe(data => {
        this.post = data;
        //Assignment 6 -- Step 3
        this.post.views++;
        this.postService.updatePostById(this.post._id,this.post).subscribe();
      });
    });
  }

  ngOnDestroy():void {
    if(this.querySub) this.querySub.unsubscribe();
  }

  submitComment(form: NgForm) {
    if(form.valid) {
      this.post.comments.push({
        author: this.commentName,
        comment: this.commentText,
        date: new Date().toLocaleDateString(),
      });

      this.postService.updatePostById(this.post._id, this.post).subscribe(() => {
        this.commentName="";
        this.commentText="";
      });
      
    }
  }

}
