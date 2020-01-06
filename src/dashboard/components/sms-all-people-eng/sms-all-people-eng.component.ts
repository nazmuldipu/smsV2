import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sms-all-people-eng',
  templateUrl: './sms-all-people-eng.component.html',
  styleUrls: ['./sms-all-people-eng.component.scss']
})
export class SmsAllPeopleEngComponent {
  @Output() sms = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      message: ["", Validators.required],
    });
  }

  // Remove non ascii key from name
  nameKeyup() {
    if (this.form.controls.message.value != null) {
      this.form.controls.message.setValue(this.form.controls.message.value.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, ''));
    }
  }

  submit() {
    this.sms.emit(this.form.value);
    this.form.reset();
  }

}
