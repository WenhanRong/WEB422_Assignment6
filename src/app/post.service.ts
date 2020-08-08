import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

import {Observable} from 'rxjs';
import {BlogPost} from './BlogPost';

const perPage: number = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  APIURL: string = environment.APIURL;

  constructor(private http: HttpClient) { }

  getPosts(page: number, tag: string, category: string): Observable<BlogPost[]> {
    const tagPara = tag ? `&tag=${tag}` : '';
    const catePara = category ? `&category=${category}` : '';
    const url = `${this.APIURL}/posts?page=${page}&perPage=${perPage}${tagPara}${catePara}`;
    return this.http.get<BlogPost[]>(url);
  }

  getPostbyId(id: string): Observable<BlogPost> {
    const url = `${this.APIURL}/posts/${id}`;
    return this.http.get<BlogPost>(url);
  }

  getCategoties(): Observable<any> {
    const url = `${this.APIURL}/categories`;
    return this.http.get(url);
  }

  getTags(): Observable<string[]> {
    const url = `${this.APIURL}/tags`;
    return this.http.get<string[]>(url);
  }

  // constructor(private http: HttpClient) { }

  // getPosts(page,tag,category): Observable<BlogPost[]>{
  //   let url = `http://localhost:8080/api/posts?page=${page}&perPage=${perPage}`
  //   if(tag) url += `&tag=${tag}`;
  //   if(category) url += `&category=${category}`
    
  //   return this.http.get<BlogPost[]>(url);
  // }

  // getPostById(id): Observable<BlogPost>{
  //   return this.http.get<BlogPost>(`http://localhost:8080/api/posts/${id}`);
  // }

  // getCategories(): Observable<any>{
  //   return this.http.get<any>('http://localhost:8080/api/categories/');
  // } 

  // getTags(): Observable<string[]>{
  //   return this.http.get<string[]>('http://localhost:8080/api/tags/');
  // } 


  //Assignment 6 -- Step 1
  getAllPosts():Observable<BlogPost[]> {
    const url = `${this.APIURL}/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`;
    return this.http.get<BlogPost[]>(url);
  }

  newPost(data: BlogPost): Observable<any> {
    const url = `${this.APIURL}/posts`;
    return this.http.post<any>(url, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    const url = `${this.APIURL}/posts/${id}`;
    return this.http.put<any>(url, data);
  }

  deletePostById(id: string): Observable<any> {
    const url = `${this.APIURL}/posts/${id}`;
    return this.http.delete<any>(url);
  }

}
