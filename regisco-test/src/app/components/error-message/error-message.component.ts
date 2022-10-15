import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from 'src/app/services/error-message.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  constructor(public errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {
  }

}
