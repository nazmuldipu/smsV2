import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sms-manual-eng',
  templateUrl: './sms-manual-eng.component.html',
  styleUrls: ['./sms-manual-eng.component.scss']
})
export class SmsManualEngComponent {
  @Output() sms = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      message: ["", Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')
        ]
      ],
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
