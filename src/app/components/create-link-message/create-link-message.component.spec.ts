import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinkMessageComponent } from './create-link-message.component';

describe('CreateLinkMessageComponent', () => {
  let component: CreateLinkMessageComponent;
  let fixture: ComponentFixture<CreateLinkMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLinkMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLinkMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
