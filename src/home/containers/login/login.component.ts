import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = "";
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    console.log(this.form);
    if (this.form.valid) {
      this.errorMessage = "";
      this.loading = true;
      console.log(this.form.value);
      this.auth.loginWithEmail(this.form.controls.username.value, this.form.controls.password.value)
        .then(data => {
          console.log(data);
          this.userService.get(data.user.uid).subscribe(datar => {
            console.log(data);
            this.loading = false;
            this.router.navigate(['/']);
          }, error => {
            this.loading = false;
            this.errorMessage = error.message;
          })
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error.message;
        });

    } else {
      this.errorMessage = "Form data missing";
    }
  }

}
