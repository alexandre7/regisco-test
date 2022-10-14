import { Component} from '@angular/core';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  loading$ = this.loader.loading$;
  
  constructor(public loader: LoadingService) {}

}
