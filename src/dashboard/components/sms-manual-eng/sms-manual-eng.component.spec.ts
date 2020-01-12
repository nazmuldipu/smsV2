import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsManualEngComponent } from './sms-manual-eng.component';

describe('SmsManualEngComponent', () => {
  let component: SmsManualEngComponent;
  let fixture: ComponentFixture<SmsManualEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsManualEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsManualEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
