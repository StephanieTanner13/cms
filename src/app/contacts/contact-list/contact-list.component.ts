import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  term: string;

  contacts: Contact[];
  contactId: string = '';
  private subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();

    this.contactService.contactChangedEvent.subscribe((contacts) => {
        this.contacts = contacts.slice();
      });

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    }

    search(value:string){
      this.term = value;
    }
}
