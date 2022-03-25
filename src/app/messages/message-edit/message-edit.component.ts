import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput', {static: true}) subjectInputRef: ElementRef;
  @ViewChild('msgTextInput', {static: true}) msgTextInputRef: ElementRef;

  currentSender:string = 'Stephanie';


  constructor( private messageService: MessageService) { }

  ngOnInit(){
  }

  onSendMessage(){
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgValue = this.msgTextInputRef.nativeElement.value;
    const id = "1";
    const sender = this.currentSender;
    const newMessage = new Message(id, subjectValue, msgValue, sender);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
   this.subjectInputRef.nativeElement.value = '';
  this.msgTextInputRef.nativeElement.value = '';
  }
}
