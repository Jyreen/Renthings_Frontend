import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../_models/chat';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}/chats`;

@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private http: HttpClient) {}

    // Send a message
    sendMessage(receiver_id: number, message: string): Observable<Chat> {
        return this.http.post<Chat>(`${baseUrl}/send`, { receiver_id, message });
    }

    // Get conversation between two users
    getConversation(other_id: number): Observable<Chat[]> {
        return this.http.get<Chat[]>(`${baseUrl}/conversation/${other_id}`);
    }

    // Get unread messages count
    getUnreadMessages(): Observable<{ unread_count: number }> {
        return this.http.get<{ unread_count: number }>(`${baseUrl}/unread`);
    }

    // Mark a message as read
    markAsRead(message_id: number): Observable<Chat> {
        return this.http.put<Chat>(`${baseUrl}/read/${message_id}`, {});
    }

    // Get chat participants (users with whom the current user has exchanged messages)
    getChatUsers(user_id: string): Observable<any[]> {
        return this.http.get<any[]>(`${baseUrl}/participants`);
    }
}
