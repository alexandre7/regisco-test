import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent, 
    ErrorMessageComponent,
    TasksListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoadingSpinnerComponent, 
    ErrorMessageComponent,
    TasksListComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ComponentModule { }
