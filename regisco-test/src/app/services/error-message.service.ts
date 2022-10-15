import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  public message: string = '';

  constructor() { }

     /** Log a HeroService message with the MessageService */
     public displayErrorMessage(message: string) {
        this.message = message;
    }
}
