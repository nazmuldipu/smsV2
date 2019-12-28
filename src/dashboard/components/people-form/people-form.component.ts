import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { People } from 'src/shared/models/people.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Group } from 'src/shared/models/group.model';

@Component({
  selector: 'people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnChanges {
  @Input() people: People;
  @Input() groupe: Group;
  @Input() groupList: Group[];

  @Output() create = new EventEmitter<People>();
  @Output() update = new EventEmitter<People>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;
  errorMessage: string = "";
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.people != null && this.people.id != null) {
      this.exists = true;
      this.form.patchValue(this.people);
    }
    if (changes && changes.groupe && this.groupe) {
      this.form.controls.groupId.setValue(this.groupe.id);
    }
  }

  createForm() {
    this.form = this.fb.group({
      groupId: ["", Validators.required],
      serialNo: ["", Validators.required],
      name: ["", Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')
      ]],
      email: ["", [Validators.required, Validators.email]],
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
    this.people = new People();
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
