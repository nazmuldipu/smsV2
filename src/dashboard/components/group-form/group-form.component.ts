import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Group } from 'src/shared/models/group.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnChanges {
  @Input() group: Group;

  @Output() create = new EventEmitter<Group>();
  @Output() update = new EventEmitter<Group>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;
  errorMessage: string = "";
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.group != null && this.group.id != null) {
      this.exists = true;
      this.form.patchValue(this.group);
    }
  }

  createForm() {
    this.form = this.fb.group({
      serialNo: ["", Validators.required],
      groupCode: ["", Validators.required],
      institution: ["", Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.exists) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
      this.form.reset();
    }
  }

  onDelete(id) {
    this.delete.emit(id);
    this.clear()
  }

  clear() {
    this.group = new Group();
    this.errorMessage = '';
    this.form.reset();
  }

  getFormValidationErrors() {
    let errors = '';
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors += key + ' : ' + keyError + '; ';
        });
      }
    });
    return errors;
  }

}
