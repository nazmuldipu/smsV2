import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Company } from 'src/shared/models/company.model';
import { ConcatSource } from 'webpack-sources';

@Component({
  selector: 'company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnChanges {
  @Input() company: Company;

  @Output() create = new EventEmitter<Company>();
  @Output() update = new EventEmitter<Company>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;
  errorMessage: string = "";
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company != null && this.company.id != null) {
      this.exists = true;
      this.form.patchValue(this.company);
    }
  }

  createForm() {
    this.form = this.fb.group({
      companyName: ["", Validators.required],
      companyAddress: ["", Validators.required],
      contactPerson: ["", Validators.required],
      telephone: ['', [
        Validators.required,
        Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')
      ]],
      webAddress: [""],
      maximumNumberOfGuest: ["", Validators.required],
      smsQuota: ["", Validators.required],
      perMonthValue: ["", Validators.required],
      balance: ["", Validators.required],
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
    this.company = new Company();
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
