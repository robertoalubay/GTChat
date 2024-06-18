import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../model/ChatMessageDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket: WebSocket | undefined;
  chatMessages: ChatMessageDto[]= [];
  chatVotes: ChatMessageDto[]= [];
  endSessionSw: boolean= false;
  randomRestaurant: string= '';

  constructor() { }

  public openWebSocket() {
    this.webSocket= new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen= (event) => {
      console.log('Open: ', event);
    }

    this.webSocket.onmessage= (event) => {
      const chatMessageDto= JSON.parse(event.data);
      console.log("chatMessageDto: " + chatMessageDto.message);

      if (chatMessageDto.message != null) {
        this.chatMessages.push(chatMessageDto);
      }
      
      if (chatMessageDto.message != null && chatMessageDto.sourceType == 'vote' ) {
        this.chatVotes.push(chatMessageDto)
      }
    }

    this.webSocket.onclose= (event) => {
      console.log('Close: ', event);
    }
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket?.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket?.close();
  }

  public getRandomRestaurant(): Observable<Object> {
    console.log('this.chatVotes.length: ' + this.chatVotes.length);

    if (this.chatVotes.length > 0) {
      const ramdomNumber= Math.floor(Math.random() * this.chatVotes.length);
      this.randomRestaurant= 'Will go at "' + this.chatVotes[ramdomNumber].message + '". End of Chat Session.';
    } else {
      this.randomRestaurant= 'Nothing is suggested. End of Chat Session.';
    }

    const chatMessageDto= new ChatMessageDto("ALL", this.randomRestaurant , "message");
    this.sendMessage(chatMessageDto);

    return new Observable<Object>;
  }

}
