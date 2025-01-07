import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './items-list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ItemsRoutingModule,
        FormsModule
    ],
    declarations: [
        ItemsListComponent
    ], 
})
export class ItemsModule { }