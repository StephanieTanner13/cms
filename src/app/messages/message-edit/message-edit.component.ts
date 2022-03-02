import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput', {static: true}) subjectInputRef: ElementRef;
  @ViewChild('msgTextInput', {static: true}) msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender:string = 'Stephanie';


  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgValue = this.msgTextInputRef.nativeElement.value;
    const id = "1";
    const sender = this.currentSender;
    const newMessage = new Message(id, subjectValue, msgValue, sender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear(){
    const subjectValue = this.subjectInputRef.nativeElement.value = '';
    const msgValue = this.msgTextInputRef.nativeElement.value = '';
  }
}
