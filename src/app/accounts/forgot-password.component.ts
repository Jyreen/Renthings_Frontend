import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPassComponent {
  form: FormGroup; // Reactive form for the email input
  loading = false; // Property to track loading state
  submitted = false; // Tracks form submission
  error = ''; // To display error messages (if any)

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
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
      return;
    }

    this.loading = true; // Start loading spinner
    const email = this.form.value.email;

    // Simulate an API call
    setTimeout(() => {
      console.log(`Password reset link sent to: ${email}`);
      this.loading = false; // Stop loading spinner
    }, 2000); // Simulate a 2-second delay for API call
  }
}
