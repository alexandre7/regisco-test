import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TasksListComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [TasksListComponent]
})
export class ComponentModule { }
