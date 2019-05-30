import { AuthServiceService } from './../service/auth-service.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {


  addressForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });


  constructor(private fb: FormBuilder, public authSvs:AuthServiceService) {}

  onSubmit() {
    let email = this.addressForm.value.email;
    let password = this.addressForm.value.password;
    this.authSvs.login(email,password);
  }
}
