import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    console.log(this.form);
    if (this.form.valid) {
      this.errorMessage = "";
      console.log(this.form.value);
      const user = { role: "USER", ...this.form.value } as User;
      console.log(user);
    } else {
      this.errorMessage = "Form data missing";
    }
  }

}
