import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services';
import { Chat } from '../_models/chat';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  userId: string = 'currentUserId'; // Replace with logic to fetch the logged-in user ID
  selectedChatUserId: string | null = null; // Tracks the selected chat user ID
  selectedChatUser: any = null; // Tracks the selected chat user's full details
  chatUsers: any[] = []; // List of chat participants
  messages: Chat[] = []; // Current conversation messages
  newMessage: string = ''; // Message input by user

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadChatUsers(); // Fetch chat participants on component initialization
  }

  // Fetch users available for chats
  loadChatUsers(): void {
    this.chatService.getChatUsers(this.userId).subscribe({
      next: (users) => {
        this.chatUsers = users;
      },
      error: (err) => {
        console.error('Error loading chat users:', err);
      },
    });
  }

  // Fetch conversation with a selected user
  loadConversation(otherUserId: string): void {
    this.selectedChatUserId = otherUserId;

    // Fetch the selected user's full data
    this.selectedChatUser = this.chatUsers.find(user => user.id === otherUserId) || null;

    this.chatService.getConversation(Number(otherUserId)).subscribe({
      next: (conversation) => {
        this.messages = conversation;

        // Mark messages as read for the selected conversation
        conversation.forEach((message) => {
          if (!message.read && message.receiver_id === Number(this.userId)) {
            this.chatService.markAsRead(message.id).subscribe({
              error: (err) => console.error('Error marking message as read:', err),
            });
          }
        });
      },
      error: (err) => {
        console.error('Error loading conversation:', err);
      },
    });
  }

  // Send a message to the currently selected user
  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedChatUserId) {
      this.chatService.sendMessage(Number(this.selectedChatUserId), this.newMessage).subscribe({
        next: (sentMessage) => {
          this.messages.push(sentMessage); // Add the sent message to the conversation
          this.newMessage = ''; // Clear the input field
        },
        error: (err) => {
          console.error('Error sending message:', err);
        },
      });
    }
  }
}
