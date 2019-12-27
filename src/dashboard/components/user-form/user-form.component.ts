import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Company } from 'src/shared/models/company.model';
import { User } from 'src/shared/models/user.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  @Input() companyList: Company[];
  @Input() user: User;

  @Output() create = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;
  errorMessage: string = "";
  roles = ERole;
  exists = false;
  mouseoverShifting = false;
  showPassword = false;


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user != null && this.user.id != null) {
      this.exists = true;
      this.form.patchValue(this.user);
    }
  }

  createForm() {
    this.form = this.fb.group({
      companyId: ["", Validators.required],
      name: ["", Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')
      ]],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      password: ["", Validators.required],
    });
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
    this.user = new User();
    this.errorMessage = '';
    this.form.reset();
  }
}


export enum ERole {
  USER = 'USER',
  COMPANY = 'COMPANY'
}
