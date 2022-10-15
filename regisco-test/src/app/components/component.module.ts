import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@NgModule({
  declarations: [
    TasksListComponent, 
    LoadingSpinnerComponent, 
    ErrorMessageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports: [TasksListComponent, LoadingSpinnerComponent, ErrorMessageComponent]
})
export class ComponentModule { }
