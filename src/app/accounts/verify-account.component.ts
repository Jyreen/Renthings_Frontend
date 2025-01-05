import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';
import Swal from 'sweetalert2';

enum EmailStatus {
    Verifying,
    Failed
}

@Component({
    templateUrl: 'verify-account.component.html'
})
export class VerifyEmailComponent implements OnInit {
    EmailStatus = EmailStatus;
    emailStatus = EmailStatus.Verifying;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        const token = this.route.snapshot.queryParams['token'];

        // remove token from url to prevent http referer leakage
        this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

        this.accountService.verifyEmail(token)
            .pipe(first())
            .subscribe({
                next: () => {
                    // Use SweetAlert2 to show success
                    Swal.fire({
                        title: 'Success!',
                        text: 'Verification successful, you can now login.',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    }).then(() => {
                        this.router.navigate(['../login'], { relativeTo: this.route });
                    });
                },
                error: () => {
                    this.emailStatus = EmailStatus.Failed;

                    // Use SweetAlert2 to show error
                    Swal.fire({
                        title: 'Error!',
                        text: 'Verification failed. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Okay'
                    });
                }
            });
    }
}
