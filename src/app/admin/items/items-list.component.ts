import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ItemService } from '../../_services/item.service';
import Swal from 'sweetalert2'; // Import SweetAlert
import { Item } from '../../_models';

@Component({ templateUrl: 'items-list.component.html' })
export class ItemsListComponent implements OnInit {
    items: Item[] = [];
    searchQuery: string = '';

    constructor(private itemService: ItemService) {}

    ngOnInit() {
        this.loadItems();
    }

    loadItems() {
        this.itemService.getAll()
            .pipe(first())
            .subscribe(items => this.items = items);
    }

    get filteredItems(): Item[] {
        if (!this.searchQuery.trim()) return this.items;

        const lowerQuery = this.searchQuery.toLowerCase();
        return this.items.filter(item =>
            item.Item_name.toLowerCase().includes(lowerQuery) ||
            (item.Item_Description?.toLowerCase() || '').includes(lowerQuery) ||
            item.Item_approvalstatus.toLowerCase().includes(lowerQuery)
        );
    }

    approveItem(itemId: number) {
        this.itemService.approve(itemId)
            .pipe(first())
            .subscribe(() => {
                Swal.fire('Approved!', 'The item has been approved.', 'success');
                this.loadItems(); // Reload the item list
            }, error => {
                Swal.fire('Error', 'There was an issue approving the item.', 'error');
            });
    }

    // Reject an item
    rejectItem(itemId: number) {
        Swal.fire({
            title: 'Reject Item',
            input: 'text',
            inputPlaceholder: 'Enter rejection reason',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Reject',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const rejectionReason = result.value;
                this.itemService.reject(itemId, rejectionReason)
                    .pipe(first())
                    .subscribe(() => {
                        Swal.fire('Rejected!', 'The item has been rejected.', 'success');
                        this.loadItems(); // Reload the item list
                    }, error => {
                        Swal.fire('Error', 'There was an issue rejecting the item.', 'error');
                    });
            }
        });
    }

    private updateItemStatus(item: Item, successMessage: string) {
        this.itemService.update(item.Item_id, item)
            .pipe(first())
            .subscribe(
                () => {
                    Swal.fire('Success!', successMessage, 'success');
                },
                () => {
                    Swal.fire('Error', 'Failed to update item status. Please try again later.', 'error');
                }
            );
    }
}
