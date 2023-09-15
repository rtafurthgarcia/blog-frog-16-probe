import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

import { z } from 'zod';

import { Observable, lastValueFrom, map } from 'rxjs';

const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  contentPreview: z.string(),
  author: z.string(),
  likes: z.number(),
  comments: z.number(),
  likedByMe: z.boolean(),
  createdByMe: z.boolean(),
});

const BlogArraySchema = z.array(BlogSchema);

export type Blog = z.infer<typeof BlogSchema>;

const CreatedBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreatedBlog = z.infer<typeof CreatedBlogSchema>;

const LikedBlogSchema = z.object({
  likedByMe: z.boolean()
});

export type LikedBlog = z.infer<typeof LikedBlogSchema>;

const CommentSchema = z.object({
  content: z.string(),
  date: z.string().datetime(),
  author: z.string()
})

const CommentsArraySchema = z.array(CommentSchema);

export type Comment = z.infer<typeof CommentSchema>;

const DetailBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  comments: CommentsArraySchema,
  author: z.string(),
  likes: z.number(),
  likedByMe: z.boolean()
});

export type DetailBlog = z.infer<typeof DetailBlogSchema>;

@Injectable({
  providedIn: 'root',
})
export class BlogBackendService {
  constructor(private httpClient: HttpClient) {}

  getBlogPosts(): Observable<Blog[]> {
    return this.httpClient
      .get<Blog[]>(`${environment.serviceUrl}/entries`)
      .pipe(map((blogs) => BlogArraySchema.parse(blogs)));
  }

  getDetailBlog(blogId: number): Observable<DetailBlog> {
    return this.httpClient
      .get<DetailBlog>(`${environment.serviceUrl}/entries/${blogId}`)
      .pipe(
        map((blog) => DetailBlogSchema.parse(blog)),
      );
  }

  addBlog(blog: CreatedBlog): Promise<object> {
    CreatedBlogSchema.parse(blog);
    return lastValueFrom(
      this.httpClient.post(`${environment.serviceUrl}/entries`, blog)
    );
  }

  deleteBlog(blogId: number): Promise<object> {
    return lastValueFrom(
      this.httpClient.delete(`${environment.serviceUrl}/entries/${blogId}`)
    );
  }

  likeBlog(blogId: number, blog: LikedBlog): Promise<object> {
    LikedBlogSchema.parse(blog);
    return lastValueFrom(
      this.httpClient.put(`${environment.serviceUrl}/entries/${blogId}/like-info`, blog)
    );
  }
}
