import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/model/task';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  public lateTasks: Tasks[] = [];

  public upcomingTasks: Tasks[] = [];

  public tasks: any[] = [];

  public filteredTasks: any[] = [];

  public filterBy: any;

  public filterTaskDisplay: boolean = false;

  constructor(
    private tasksService: TasksService,
    public errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.tasksService.manageTasks();

    this.lateTasks = this.tasksService.lateTasks;
    this.upcomingTasks = this.tasksService.upcomingTasks;
    this.tasks = this.tasksService.incompletedTasks;
  }

  filter() {
    // console.log(this.filteredTasks);
    this.filteredTasks = [
      ...this.tasks.filter((task) => task.name.includes(this.filterBy)),
    ];

    if (this.filteredTasks.length > 0) {
      this.filterTaskDisplay = true;
    }
    if (this.filterBy === '') {
      this.filterTaskDisplay = false;
    }
  }
}
