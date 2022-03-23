import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  maxContactID: number;

  constructor(private http: HttpClient) { 
    this.getContacts();
  }

  getContacts(): void {
    this.http.get('https://fullstack-bbe3a-default-rtdb.firebaseio.com/contacts.json')
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactID = this.getMaxID();
      this.contacts.sort((lhs: Contact, rhs: Contact): number => {
        if (lhs.id < rhs.id) {
          return -1;
        } else if (lhs.id === rhs.id) {
          return 0;
        } else {
          return 1;
        }
      });
      this.contactListChangedEvent.next(this.contacts.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }

    return null;
  }

  getMaxID(): number {
    let maxID = 0;
    for (let contact of this.contacts) {
      let currentID = +contact.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    this.maxContactID++;
    contact.id = (this.maxContactID).toString();
    this.contacts.push(contact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) {
      return;
    }

    let index = this.contacts.indexOf(originalContact);
    if (index < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[index] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const index = this.contacts.indexOf(contact);
    if (index < 0) {
      return;
    }

    this.contacts.splice(index, 1);
    this.storeContacts();
  }

  storeContacts(): void {
    let json = JSON.stringify(this.contacts);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put('https://fullstack-bbe3a-default-rtdb.firebaseio.com/contacts.json', json, {
      headers: header
    }).subscribe(() => {
      this.contactListChangedEvent.next((this.contacts.slice()));
    });
  }
}