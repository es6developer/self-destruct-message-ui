import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMessageLinkComponent } from './view-message-link.component';

describe('ViewMessageLinkComponent', () => {
  let component: ViewMessageLinkComponent;
  let fixture: ComponentFixture<ViewMessageLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMessageLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMessageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
