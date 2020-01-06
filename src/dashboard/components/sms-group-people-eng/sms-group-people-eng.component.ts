import { Component, OnChanges, EventEmitter, Output, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Group } from 'src/shared/models/group.model';

@Component({
  selector: 'sms-group-people-eng',
  templateUrl: './sms-group-people-eng.component.html',
  styleUrls: ['./sms-group-people-eng.component.scss']
})
export class SmsGroupPeopleEngComponent {
  @Input() groupList: Group[];
  @Output() sms = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      groupId: ["", Validators.required],
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
