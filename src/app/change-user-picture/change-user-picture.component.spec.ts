import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserPictureComponent } from './change-user-picture.component';

describe('ChangeUserPictureComponent', () => {
  let component: ChangeUserPictureComponent;
  let fixture: ComponentFixture<ChangeUserPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
