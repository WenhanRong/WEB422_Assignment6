import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  blogPost: BlogPost;
  tags: string;
  sub: Subscription;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.postService.getPostbyId(params['id']).subscribe(data => {
        this.blogPost = data;
        this.tags = data.tags.toString();
      });
    });
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    };
  }

  formSubmit(form: NgForm): void {
    if(form.valid) {
      this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
      this.postService.updatePostById(this.blogPost._id, this.blogPost).subscribe(()=>this.router.navigate(['admin']));
    }
  }

  deletePost(): void {
    this.postService.deletePostById(this.blogPost._id).subscribe(() => this.router.navigate(['admin']));
  }
    
}
