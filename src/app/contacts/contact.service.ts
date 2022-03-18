import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();

  private maxContactID: number;

  private contacts: Contact[] = [];


  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact{
    for (let contact of this.contacts){
      if (contact.id === id){
        return contact;
      } 
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
 }

getMaxID() {
  let maxID = 0;
  for (let contact of this.contacts) {
    let currentID = +contact.id;
    if (currentID > maxID) {
      maxID = currentID;
    }
  }

  return maxID;
}

addContact(contact: Contact) {
  if (!contact) {
    return;
  }

  this.maxContactID++;
  contact.id = (this.maxContactID).toString();
  this.contacts.push(contact);
  this.contactListChangedEvent.next(this.contacts.slice());
}

updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
  }

  let index = this.contacts.indexOf(originalContact);

  if (index < 0) {
    return;
  }

  newContact.id = originalContact.id;
  this.contacts[index] = newContact;
  console.log(index);
  this.contactListChangedEvent.next(this.contacts.slice());
}
}