import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentLikesComponent } from './comment-likes.component';

describe('CommentLikesComponent', () => {
  let component: CommentLikesComponent;
  let fixture: ComponentFixture<CommentLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
