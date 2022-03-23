import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  maxMessageID: number;

  constructor(private http: HttpClient) { 
    this.initMessages();
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  initMessages(): void {
    this
    .http
    .get('https://fullstack-bbe3a-default-rtdb.firebaseio.com/messages.json')
    .subscribe((messages: Message[]) => {
      this.messages = messages;
      this.maxMessageID = this.getMaxID();
      this.messages.sort((lhs: Message, rhs: Message): number => {
        if (lhs.id < rhs.id) {
          return -1;
        } else if (lhs.id === rhs.id) {
          return 0;
        } else {
          return 1;
        }
      });
      this.messageChangedEvent.next(this.messages.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }

    return null;
  }

  getMaxID(): number {
    let maxID = 0;
    for (let message of this.messages) {
      let currentID = +message.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.storeMessages();
  }

  storeMessages(): void {
    let json = JSON.stringify(this.messages);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put('https://fullstack-bbe3a-default-rtdb.firebaseio.com/messages.json', json, {
      headers: header
    }).subscribe(() => {
      this.messageChangedEvent.next((this.messages.slice()));
    });
  }
}