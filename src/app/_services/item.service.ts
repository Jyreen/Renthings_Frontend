import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Item } from '../_models/item';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiUrl}/items`;

@Injectable({ providedIn: 'root' })
export class ItemService {
    constructor(private http: HttpClient) {}

    // Get all items
    getAll(): Observable<Item[]> {
        return this.http.get<Item[]>(`${baseUrl}`);
    }

    // Get item by ID
    getById(id: number): Observable<Item> {
        return this.http.get<Item>(`${baseUrl}/${id}`);
    }

    // Get items by account ID
    getByAccountId(acc_id: number): Observable<Item[]> {
        return this.http.get<Item[]>(`${baseUrl}/account/${acc_id}`);
    }

    // Create a new item
    create(itemData: FormData): Observable<any> {
        return this.http.post(`${baseUrl}`, itemData);
      }

    // Update an item
    update(id: number, item: Partial<Item>, itemImage?: File): Observable<Item> {
        const formData = new FormData();
        if (item.acc_id) formData.append('acc_id', item.acc_id.toString());
        if (item.Item_name) formData.append('Item_name', item.Item_name);
        if (item.Item_Description) formData.append('Item_Description', item.Item_Description);
        if (itemImage) formData.append('Item_image', itemImage);
        if (item.Item_price) formData.append('Item_price', item.Item_price.toString()); // Convert to string
    
        return this.http.put<Item>(`${baseUrl}/${id}`, formData);
    }
    

    // Delete an item
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${baseUrl}/${id}`);
    }
}
