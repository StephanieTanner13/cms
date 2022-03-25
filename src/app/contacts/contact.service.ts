import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Contact } from './contact.model';
import { Subject } from 'rxjs';

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
    this
    .http
    .get<{message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
    .subscribe((response: any) => {
      this.contacts = response.contacts;
      this.maxContactID = this.getMaxID();
      this.contacts.sort(compareContactsByID);
      this.contactListChangedEvent.next(this.contacts.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getContact(id: string): Contact {
    if (!this.contacts) {
      return null;
    }

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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    contact.id = '';

    this.http
    .post<{message: string, contact: Contact}>('http://localhost:3000/contacts', contact, {headers: headers})
    .subscribe((response: any) => {
      this.contacts.push(response.contact);
      this.contacts.sort(compareContactsByID);
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) {
      return;
    }

    let index = this.contacts.indexOf(originalContact);
    if (index < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strContact = JSON.stringify(newContact);

    this.http
    .put<{message: string}>(`http://localhost:3000/contacts/${originalContact.id}`, strContact, {headers: headers})
    .subscribe((response: any) => {
      this.getContacts();
    });
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const index = this.contacts.indexOf(contact);
    if (index < 0) {
      return;
    }

    this.http.delete(`http://localhost:3000/contacts/${contact.id}`)
    .subscribe((contacts: Contact[]) => {
      this.getContacts();
    })
  }

  storeContacts(): void {
    let json = JSON.stringify(this.contacts);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put<{message: string}>('http://localhost:3000/contacts', json, {
      headers: header
    }).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
}

function compareContactsByID(lhs: Contact, rhs: Contact): number {
  if (lhs.id < rhs.id) {
    return -1;
  } else if (lhs.id === rhs.id) {
    return 0;
  } else {
    return 1;
  }
}