import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private user: UserService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  resetErrors() {
    this.loginForm.get('email')?.setErrors(null);
    this.loginForm.get('password')?.setErrors(null);
  }

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Enter Email and Password',
        showConfirmButton: false,
        timer: 800
      });
      this.resetErrors()
      return;
    }

    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl && passwordControl) {
      const body = {
        email: emailControl.value,
        password: passwordControl.value
      };

      this.user.login(body).subscribe(
        (res: any) => {
          let token = res;
          console.log(token);
          localStorage.setItem('auth-token', token.jwtData);
          this.router.navigate(['/components/dashboard']);
        },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1000
          });
          emailControl.setValue('');
          passwordControl.setValue('');
          this.resetErrors()
        }
      );
    }
  }


}
