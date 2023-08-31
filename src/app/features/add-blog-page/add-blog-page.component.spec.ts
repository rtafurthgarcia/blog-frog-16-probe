import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogPageComponent } from './add-blog-page.component';
import { MockProvider } from 'ng-mocks';
import { BlogStateService } from './state/blog-state.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddBlogPageComponent', () => {
  let component: AddBlogPageComponent;
  let fixture: ComponentFixture<AddBlogPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBlogPageComponent],
      providers: [MockProvider(BlogStateService)],
      imports: [
        MatToolbarModule,
        MatIconModule,
        RouterTestingModule.withRoutes([]),
      ],
    });
    fixture = TestBed.createComponent(AddBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
