import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingStateService } from '../../../core/loading-state.service';
import {
  BlogBackendService,
  CreatedBlog,
} from '../../../core/blog-backend.service';

type BlogState = {
  error?: string;
};

@Injectable({
  providedIn: 'root',
})
export class BlogStateService {
  #state = new BehaviorSubject<BlogState>({ error: undefined });
  state$ = this.#state.asObservable();

  constructor(
    private blogService: BlogBackendService,
    private router: Router,
    private loadingState: LoadingStateService
  ) {}

  async addBlog(blog: CreatedBlog) {
    this.#state.next({ error: undefined });

    try {
      this.loadingState.setLoadingState(true);
      await this.blogService.addBlog(blog);
      this.router.navigate(['/overview']);
    } catch (error) {
      this.loadingState.setLoadingState(false);
      this.#state.next({
        error: (error as Error).message,
      });
    }
  }
}
