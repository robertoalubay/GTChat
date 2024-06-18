export class ChatMessageDto {
  user: string;
  message: string;
  sourceType: string;

  constructor(user: string, message: string, sourceType: string) {
    this.user= user;
    this.message= message;
    this.sourceType= sourceType;
  }
  
}