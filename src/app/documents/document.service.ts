import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  selectedDocumentEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  private maxDocumentId: number;

  private documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

  getDocument(id: string): Document{
    for (let document of this.documents){
      if (document.id === id){
        return document;
      } 
    }
    return null;
  }

//   deleteDocument(document: Document) {
//     if (!document) {
//        return;
//     }
//     const pos = this.documents.indexOf(document);
//     if (pos < 0) {
//        return;
//     }
//     this.documents.splice(pos, 1);
//     this.documentChangedEvent.emit(this.documents.slice());
//  }

 getMaxId(): number {

  let maxId = 0;

  for (let document of this.documents){
    let currentId = +document.id;
    if (currentId > maxId){
      maxId = currentId;
    }
  }
  return maxId;
}

 getDocuments(): Document[] {
  return this.documents.slice();
}

addDocument(newDocument: Document){
  if (!newDocument) {
    return;
  }

  this.maxDocumentId++;
  newDocument.id = (this.maxDocumentId).toString();
  this.documents.push(newDocument);
  let documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
}

updateDocument(originalDocument: Document, newDocument: Document){
  if (!originalDocument || !newDocument){
    return;
  }

  var pos = this.documents.indexOf(originalDocument);
  if (pos < 0){
    return;
  }

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  const documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
}

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    
    this.documentListChangedEvent.next(this.documents.slice());
 }
}


