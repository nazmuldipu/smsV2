import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAllPeopleEngComponent } from './sms-all-people-eng.component';

describe('SmsAllPeopleEngComponent', () => {
  let component: SmsAllPeopleEngComponent;
  let fixture: ComponentFixture<SmsAllPeopleEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsAllPeopleEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsAllPeopleEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
