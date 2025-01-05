import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Import SweetAlert
import { MustMatch } from '../_helpers/must-match.validator';
import { AccountService } from '../_services/account.service'; // Adjust import path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        acc_firstName: ['', Validators.required],
        acc_lastName: ['', Validators.required],
        acc_email: ['', [Validators.required, Validators.email]],
        acc_passwordHash: ['', [Validators.required, Validators.minLength(6)]],
        acc_address: [''],
        //acc_pnumber: [''],
        confirmPassword: ['', Validators.required],
        acc_acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validator: MustMatch('acc_passwordHash', 'confirmPassword')
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      Swal.fire('Error', 'Please fill in all required fields correctly.', 'error');
      return;
    }

    this.loading = true;

    this.accountService.register(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire('Success', 'Registration successful!', 'success').then(() => {
          this.router.navigate(['/login']); // Redirect to login page after success
        });
      },
      error: (error) => {
        this.loading = false;
        Swal.fire('Error', error.error.message || 'Registration failed. Please try again.', 'error');
      }
    });
  }
}
