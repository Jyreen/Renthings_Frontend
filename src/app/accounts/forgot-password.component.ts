import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPassComponent {
  form: FormGroup; // Reactive form for the email input
  loading = false; // Property to track loading state
  submitted = false; // Tracks form submission
  error = ''; // To display error messages (if any)

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form
    this.form = this.formBuilder.group({
      acc_email: ['', [Validators.required, Validators.email]],
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    this.loading = true; // Start loading spinner
    const email = this.form.value.acc_email;

    // Simulate an API call
    setTimeout(() => {
      this.loading = false; // Stop loading spinner

      if (email) {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Link Sent',
          text: 'Please check your email for instructions on how to reset your password.',
          timer: 3000,
          timerProgressBar: true,
        });
        console.log(`Password reset link sent to: ${email}`);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error Sending Link',
          text: 'There was an error sending the reset link. Please try again later.',
        });
        console.error(`Failed to send password reset link to: ${email}`);
      }
    }, 2000); // Simulate a 2-second delay for API call
  }
}
