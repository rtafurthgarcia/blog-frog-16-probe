import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogOverviewCardComponent } from './blog-overview-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShareDirective } from '../share/share.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BlogOverviewCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ShareDirective,
  ],
  exports: [BlogOverviewCardComponent],
})
export class BlogOverviewCardModule {}
