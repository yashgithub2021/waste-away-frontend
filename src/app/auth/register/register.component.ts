import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  constructor(private user: UserService, private fb: FormBuilder, private router: Router) {
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.user
  }

  resetErrors() {
    this.regForm.get('name')?.setErrors(null);
    this.regForm.get('email')?.setErrors(null);
    this.regForm.get('password')?.setErrors(null);
    this.regForm.get('confirm')?.setErrors(null);
  }

  //Register new user
  createUser() {
    const nameControl = this.regForm.get('name');
    const emailControl = this.regForm.get('email');
    const passwordControl = this.regForm.get('password');
    const confirmControl = this.regForm.get('confirm');

    const body = {
      name: nameControl?.value,
      email: emailControl?.value,
      password: passwordControl?.value
    }

    if (this.regForm.value.password != this.regForm.value.confirm) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: "Password Does not matched",
        showConfirmButton: false,
        timer: 1000
      });
      passwordControl?.setValue('')
      confirmControl?.setValue('')
      this.resetErrors()
      return
    }
    this.user.register(body).subscribe((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Created Successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/login']);
    }, (err) => {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: err.error.message,
        showConfirmButton: false,
        timer: 1000
      });
      emailControl?.setValue('')
      passwordControl?.setValue('')
      confirmControl?.setValue('')
      this.resetErrors()
    })
  }
}
