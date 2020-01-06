import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsGroupPeopleEngComponent } from './sms-group-people-eng.component';

describe('SmsGroupPeopleEngComponent', () => {
  let component: SmsGroupPeopleEngComponent;
  let fixture: ComponentFixture<SmsGroupPeopleEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsGroupPeopleEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsGroupPeopleEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
