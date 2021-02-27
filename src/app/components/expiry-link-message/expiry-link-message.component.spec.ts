import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryLinkMessageComponent } from './expiry-link-message.component';

describe('ExpiryLinkMessageComponent', () => {
  let component: ExpiryLinkMessageComponent;
  let fixture: ComponentFixture<ExpiryLinkMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiryLinkMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiryLinkMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
