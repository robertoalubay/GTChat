import { AfterContentChecked, AfterViewChecked, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WebSocketService } from './service/web-socket.service';
import { ChatMessageDto } from './model/ChatMessageDto';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';


@Component({
  selector: 'app-gt-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './gt-chat.component.html',
  styleUrls: ['./gt-chat.component.css']
})
export class GtChatComponent implements OnInit, OnDestroy {
  sourceTypeMessage: string= "message";
  sourceTypeVote: string= "vote";
  randomRestaurant: string= '';

  constructor(
    public webSocketService: WebSocketService,
    public dialog: MatDialog) { }
  
  ngOnInit(): void {
    console.log("ngOnInit...");
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy...");
    this.webSocketService.closeWebSocket();
  }

  closeWebSocket(): void {
    console.log("closeWebSocket...");
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto= new ChatMessageDto(sendForm.value.user, sendForm.value.message, this.sourceTypeMessage);

    console.log('sendForm...', chatMessageDto);    

    if(chatMessageDto.user != null && chatMessageDto.user != '') {
      if (chatMessageDto.message != null && chatMessageDto.message != '') {
        this.webSocketService.sendMessage(chatMessageDto);
      }
    } else {
      this.openPopup();
    }
    
    sendForm.controls['message'].reset();
  }

  sendVote(sendForm: NgForm) {
    const chatVoteDto= new ChatMessageDto(sendForm.value.user, sendForm.value.message, this.sourceTypeVote);

    console.log('sendVote...', chatVoteDto);

    if(chatVoteDto.user != null && chatVoteDto.user != '') {
      if (chatVoteDto.message != null && chatVoteDto.message != '') { 
        this.webSocketService.sendMessage(chatVoteDto);
      }
    } else {
      this.openPopup();
    }

    sendForm.controls['message'].reset();
  }

  endSession() {
    
    this.webSocketService.getRandomRestaurant().subscribe(data => {
      this.closeWebSocket();
    }, error => console.log(error));
  }

  openPopup(): void {
    this.dialog.open(PopupComponent);
  }
}
