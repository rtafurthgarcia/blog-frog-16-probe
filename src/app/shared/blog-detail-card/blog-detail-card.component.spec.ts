import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailCardComponent } from './blog-detail-card.component';

describe('BlogDetailCardComponent', () => {
  let component: BlogDetailCardComponent;
  let fixture: ComponentFixture<BlogDetailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogDetailCardComponent]
    });
    fixture = TestBed.createComponent(BlogDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
