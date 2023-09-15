import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DetailBlog } from 'src/app/core/blog-backend.service';

@Component({
  selector: 'app-blog-detail-card',
  templateUrl: './blog-detail-card.component.html',
  styleUrls: ['./blog-detail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailCardComponent {
  @Input({required: true}) model!: DetailBlog;
  @Input({required: true}) id!: number;

  @Output('deleteBlog') deleteBlog$ = new EventEmitter();
  @Output('editBlog') editBlog$ = new EventEmitter();
  @Output('likeBlog') likeBlog$ = new EventEmitter<{
    likedByMe: boolean;
  }>();
}
