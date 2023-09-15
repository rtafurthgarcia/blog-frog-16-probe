import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { Blog } from '../../shared/blog-overview-card/blog-overview-card.component';
import { BlogBackendService, LikedBlog } from 'src/app/core/blog-backend.service';
import { LoadingStateService } from 'src/app/core/loading-state.service';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-blog-overview-page',
  templateUrl: './blog-overview-page.component.html',
  styleUrls: ['./blog-overview-page.component.scss'],
})
export class BlogOverviewPageComponent {
  @Input() blogs!: Blog[];

  blogBackendService: BlogBackendService = inject(BlogBackendService);
  loadingStateService: LoadingStateService = inject(LoadingStateService);
  oidcSecurityService: OidcSecurityService = inject(OidcSecurityService);
  changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  likeBlog(event: { id: number; likedByMe: boolean }): void {
    const blogIndex: number = this.blogs.findIndex((b) => b.id == event.id);

    console.log(this.blogs.at(blogIndex)?.likedByMe);

    if (blogIndex >= 0) {
      this.loadingStateService.setLoadingState(true);
      this.blogBackendService.likeBlog(event.id, { likedByMe: event.likedByMe } as LikedBlog)
        .then(() => this.blogs.at(blogIndex)!.likedByMe = event.likedByMe)
        .finally(() => {
           this.loadingStateService.setLoadingState(false);
           console.log(this.blogs.at(blogIndex)?.likedByMe);
           this.changeDetector.detectChanges();
        });
    }

  }
}
