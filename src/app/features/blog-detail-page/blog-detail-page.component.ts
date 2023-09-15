import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { lastValueFrom } from 'rxjs';
import { parseJwt } from 'src/app/core/auth/jwt';
import { BlogBackendService, DetailBlog, LikedBlog } from 'src/app/core/blog-backend.service';
import { LoadingStateService } from 'src/app/core/loading-state.service';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.scss'],
})
export class BlogDetailPageComponent {
  //@Input({ required: true }) id!: number;
  @Input({ required: true}) blog!: DetailBlog;
  blogId!: number;
  
  blogBackendService: BlogBackendService = inject(BlogBackendService);
  router: Router = inject(Router);
  loadingStateService: LoadingStateService = inject(LoadingStateService);
  oidcSecurityService: OidcSecurityService = inject(OidcSecurityService);
  changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor(route: ActivatedRouteSnapshot) {
    this.blogId = Number(route.paramMap.get('id'));
    console.log(this.blogId);
  }

  likeBlog(event: { likedByMe: boolean }): void {
    this.loadingStateService.setLoadingState(true);
    this.blogBackendService.likeBlog(this.blogId, { likedByMe: event.likedByMe } as LikedBlog)
      .then(() => this.blog.likedByMe = event.likedByMe)
      .finally(() => {
          this.loadingStateService.setLoadingState(false);
          this.changeDetector.detectChanges();
      });
  }

  deleteBlog(): void {
    lastValueFrom(this.oidcSecurityService.getUserData())
      .then((userData) => console.log(parseJwt(userData)));

    this.loadingStateService.setLoadingState(true);
    this.blogBackendService.deleteBlog(this.blogId)
      .then(() => this.router.navigate([""]))
      .finally(() => {
          this.loadingStateService.setLoadingState(false);
      });
  }
}
