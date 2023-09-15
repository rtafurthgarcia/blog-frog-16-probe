import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailPageComponent } from './blog-detail-page.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailCardModule } from 'src/app/shared/blog-detail-card/blog-detail-card.module';

const routes: Routes = [
  {
    path: ':id',
    component: BlogDetailPageComponent,
  },
];

@NgModule({
  declarations: [BlogDetailPageComponent],
  imports: [
    CommonModule, 
    BlogDetailCardModule,
    RouterModule.forChild(routes)],
})
export class BlogDetailPageModule {}
