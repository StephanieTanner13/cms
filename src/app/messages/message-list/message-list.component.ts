import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    //(public id: string, public subject: string, public msgText: string, public sender: string)
    new Message('1', 'Hello from Stephanie', 'Hello, how are you doing?', 'Stephanie'),
    new Message('2', 'Hello from Steph', 'Hello, how are you doing?', 'Steph'),
    new Message('1', 'John Here', 'Hey, I am needing help on this project', 'John')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
