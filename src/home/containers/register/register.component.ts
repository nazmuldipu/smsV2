import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/shared/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = "";
  thankyouMessage = false;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    console.log(this.form);
    if (this.form.valid) {
      this.errorMessage = "";
      this.loading = true;
      const user = { role: "USER", ...this.form.value } as User;
      console.log(user);

      this.auth.register(user.email, user.password).then((usr) => {
        console.log(usr);
        this.userService.saveRegisteredUser(usr.user.uid, user.name, user.email, user.password)
          .then(() => {
            // this.router.navigate(['/']);
            this.loading = false;
            this.thankyouMessage = true;
          })
          .catch((error) => {
            console.log("USER SAVING ERROR ! ", error);
            this.errorMessage = error.message;
          });
      }).catch((error) => {
        console.log(error);
        this.errorMessage = error.message;
      })
    } else {
      this.errorMessage = "Form data missing";
    }
  }

}
