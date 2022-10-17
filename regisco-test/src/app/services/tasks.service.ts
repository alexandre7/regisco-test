import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DATA_URL } from 'src/environments/dataUrl';
import { Tasks } from '../model/task';
import { ErrorMessageService } from './error-message.service';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private tasksUrl = DATA_URL;  // URL to web api

  private yesterdaydate = new Date();

  public tasks: Tasks[] = [];

  public incompletedTasks: Tasks[] = [];

  public lateTasks: Tasks[] = [];

  public upcomingTasks: Tasks[] = [];

  constructor( private http: HttpClient, private errorMessageService: ErrorMessageService) { }

  /** GET tasks from the server */ 
  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.tasksUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError<Tasks[]>('getHeroes', [])) // Is this something from Heros app?
    )
  };

  /** Subscribe to getTask and create two lists 
     * Gather the incomplete tasks
     * Sorting them in upcoming tasks and late tasks
     * Transform the date into a string For Yesterday and Today
  */
  public manageTasks(){
    this.yesterdaydate.setDate(this.yesterdaydate.getDate() - 1);

    const yesterdaydateNumber = Number(new Date(this.yesterdaydate));

    let today = new Date();

    const todaydateNumber = Number(new Date(today));

    // 1. Gather the incomplete tasks
    this.getTasks().subscribe(tasks => {
      tasks.forEach(task => {

        if(task.completedAt === null){
          this.incompletedTasks.push(task as any);
        }
      });

      // 2. Sorting them in upcoming tasks and late tasks
      this.incompletedTasks.forEach(incompleteTask => {
          const date = Date.parse(incompleteTask.deadline);

          if(date > yesterdaydateNumber){
            this.upcomingTasks.push(incompleteTask);

          } else{
            this.lateTasks.push(incompleteTask);
          }
      });

      this.sortLateTasks(this.lateTasks);
      this.sortLateTasks(this.upcomingTasks);

      // 3. Transform the date into a string For Yesterday and Today
      this.lateTasks.forEach(task => {
        if(task.deadline === formatDate(yesterdaydateNumber ,'yyyy-MM-dd', 'en-US')){
          task.deadline = "Hier";
        }
      });

      this.upcomingTasks.forEach(task => {
        if(task.deadline === formatDate(todaydateNumber ,'yyyy-MM-dd', 'en-US')){
          task.deadline = "Aujourd'hui";
        }
      });
    });
  }

  /** Order the tasks */
  public sortLateTasks(tasks: Tasks[]){
    tasks.sort((a, b) => {
      const deadlineA = a.deadline;
      const deadlineB = b.deadline;

        if (deadlineA < deadlineB) {
          return -1;
        }

        if (deadlineA > deadlineB) {
          return 1;
        }
        return 0;
    });
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // console for the programmer or for user using console
      console.error(error); 
  
      this.errorMessageService.displayErrorMessage(`${operation} failed: ${error.message}`);
      
      return of(result as T);
    };
  }
}
