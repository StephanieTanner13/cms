import { Component, OnInit, Input} from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(){
    //console.log(this.message.sender);
    var sender = this.message.sender;
    console.log(sender);

    let contact: Contact = this.contactService.getContact(sender);
     console.log(contact);
    if (!contact) {
      this.messageSender = '[deleted]';
    } else {
      this.messageSender = contact.name;
    }
  }

}
