//import inject from '../lib/inject'
//import {wireA} from '../lib/wire'
import {inject, bind} from '../lib/decorators'

export interface ChatService {
  sendMessage: (message:string)=>void
}

export class Client {
  param: string

  constructor(@inject() chatService?: ChatService) {
    this.chatService = chatService
  }

  sendMessage(message:string) {
    this.chatService.sendMessage(message)
  }

  private chatService: ChatService
}

@bind()
export class ChatServiceImpl implements ChatService {
  sendMessage(message:string) {
    console.log(message)
  }
}


//getInstance(Client)

/*class Injector<T> {
  getInstance(a: typeof Client) {
    //a.
  }
}*/
/*function getInstance<T>(a: typeof T) {

}*/

/*wire(ChatService, new ChatServiceImpl())

wireA(new ChatServiceImpl(), 'chatService')

let client = new Client()
client.sendMessage('Hello World')*/
