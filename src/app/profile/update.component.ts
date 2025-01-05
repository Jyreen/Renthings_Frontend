import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services/account.service';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({ templateUrl: 'update.component.html' })
export class UpdateComponent implements OnInit {
  account = this.accountService.accountValue;
  form!: FormGroup;
  loading = false;
  submitted = false;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        acc_firstName: [this.account.acc_firstName, Validators.required],
        acc_lastName: [this.account.acc_lastName, Validators.required],
        acc_email: [this.account.acc_email, [Validators.required, Validators.email]],
        acc_passwordHash: ['', [Validators.minLength(6)]],
        confirmPassword: [''],
      },
      {
        validator: MustMatch('acc_passwordHash', 'confirmPassword'),
      }
    );
  }

  // Convenience getter for form fields
  get f() {
    return this.form.controls;
  }


  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.update(this.account.id, this.form.value)
    .pipe(first())
    .subscribe({
      next: () => {
        alert('Update successful');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        alert(error);
        this.loading = false;
      },
    });
  }
}
