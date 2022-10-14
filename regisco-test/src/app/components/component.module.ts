import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@NgModule({
  declarations: [TasksListComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports: [TasksListComponent, LoadingSpinnerComponent]
})
export class ComponentModule { }
