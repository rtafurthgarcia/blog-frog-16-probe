import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type Blog = {
  author: string;
  comments: number;
  contentPreview: string;
  createdByMe: boolean;
  id: number;
  likedByMe: boolean;
  likes: number;
  title: string;
};

@Component({
  selector: 'app-blog-overview-card',
  templateUrl: './blog-overview-card.component.html',
  styleUrls: ['./blog-overview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogOverviewCardComponent {
  @Input({ required: true }) model!: Blog;
  @Input({ required: true }) index!: number;

  @Input() routeCommands!: [string, number];
  @Output('likeBlog') likeBlog$ = new EventEmitter<{
    id: number;
    likedByMe: boolean;
  }>();
}
