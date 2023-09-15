import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { Blog, BlogBackendService, DetailBlog } from './core/blog-backend.service';
import { ErrorPageComponent } from './core/static/error-page.component';
import { PageNotFoundPageComponent } from './core/static/page-not-found-page.component';
import { authenticationGuard } from './core/auth/authentication.guard';
import { AccessDeniedComponent } from './core/static/access-denied-page.component';

export const blogResolver: ResolveFn<Blog[]> = () =>
  inject(BlogBackendService).getBlogPosts();

export const detailBlogResolver: ResolveFn<DetailBlog> =
  (route: ActivatedRouteSnapshot) => {
    return inject(BlogBackendService).getDetailBlog(Number(route.paramMap.get('id')));
  };

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('./features/blog-overview-page/blog-overview-page.module').then(
        (m) => m.BlogOverviewPageModule
      ),
    resolve: { blogs: blogResolver },
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./features/blog-detail-page/blog-detail-page.module').then(
        (m) => m.BlogDetailPageModule
      ),
    resolve: {blog: detailBlogResolver}
  },
  {
    path: 'add-blog',
    loadChildren: () =>
      import('./features/add-blog-page/add-blog-page.module').then(
        (m) => m.AddBlogPageModule
      ),
    canActivate: [authenticationGuard],
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: 'denied',
    component: AccessDeniedComponent
  },
  { path: '**', component: PageNotFoundPageComponent },
];

@NgModule({
  providers: [provideRouter(routes, withComponentInputBinding())],
  exports: [RouterModule],
})
export class AppRoutingModule {}
