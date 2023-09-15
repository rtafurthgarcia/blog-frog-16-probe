import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailCardComponent } from './blog-detail-card.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShareDirective } from '../share/share.directive';

@NgModule({
  declarations: [ BlogDetailCardComponent ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ShareDirective,
    MatBadgeModule
  ],
  exports: [ BlogDetailCardComponent ]
})
export class BlogDetailCardModule { }
