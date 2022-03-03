import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document("1", "Here is a document", "this is a description", "http://stephtanner.com", null),
    new Document("2", "Another Document", "this is a description also", "http://stephtanner.com", null),
    new Document("3", "Nammmeee", "this is a description", "http://stephtanner.com", null),
    new Document("4", "A Final Name", "this is a description", "../../assets/images/barzeer.jpg", null)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
