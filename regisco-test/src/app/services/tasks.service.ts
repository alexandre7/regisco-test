import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Tasks } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private tasksUrl = 'https://api-dev.regisco.ca/api/interview-tasks';  // URL to web api

  private yesterdaydate = new Date();

  public tasks: Tasks[] = [];

  public incompletedTasks: Tasks[] = [];

  public lateTasks: Tasks[] = [];

  public upcomingTasks: Tasks[] = [];

  constructor( private http: HttpClient) { }

    /** GET tasks from the server */
    getTasks(): Observable<Tasks[]> {
      return this.http.get<Tasks[]>(this.tasksUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Tasks[]>('getHeroes', []))
      )
    };

    /** Transform the date into a string For Yesterday and Today */
    public changeSpecificDates(task: Tasks){
      // console.log(task);

      const today = new Date();

      this.yesterdaydate.setDate(this.yesterdaydate .getDate() - 1);
    
      // console.log(yesterdaydate);

      // let myInt = Number(new Date(yesterdaydate));
      // console.log(myInt);

      let date = Date.parse(task.deadline);
      let yesterdayssdate = Number(new Date(this.yesterdaydate));

  
      // console.log(date);
      // if(date === today){
      //   task.deadline = "Aujour'hui";
      // }
      if(date === yesterdayssdate){
        console.log('allo')
        task.deadline = "Hier";
      }
    };

    /** Subscribe to getTask and create two lists
     * One is the late task
     * The other is the upcoming tasks
     */
    public manageTasks(){
      
      this.yesterdaydate.setDate(this.yesterdaydate .getDate() - 1);

      let yesterdaydateNumber = Number(new Date(this.yesterdaydate));
      // console.log(yesterdaydateNumber);

      this.getTasks().subscribe(tasks => {
        this.tasks = tasks;
        
        tasks.forEach(task => {
          if(task.completedAt === null){
            this.incompletedTasks.push(task as any);
          }
        });

        this.incompletedTasks.forEach(incompleteTask => {
         
        const date = Date.parse(incompleteTask.deadline);

        if(date > yesterdaydateNumber){
          console.log(date)
          this.upcomingTasks.push(incompleteTask);
          this.changeSpecificDates(incompleteTask);
        }
        else{
          this.lateTasks.push(incompleteTask);
          this.changeSpecificDates(incompleteTask);
        }
        
        });
        
        // this.orderTasks();
      }); 
    }

    /** Order the two lists : late and upcoming tasks in order as ask in the test description */
    public orderTasks(){
      const latetasksDeadlines: string[] = [];
      const lateTasksOrdered: Tasks[] = [];


      this.lateTasks.forEach(lateTask => {
        latetasksDeadlines.push(lateTask.deadline);
      });

      latetasksDeadlines.sort();

      //ICITTE POUR METTRE EN ORDRE
      latetasksDeadlines.forEach(latetaskDeadline => {
      this.lateTasks.forEach(lateTask => {
        if(lateTask.deadline === latetaskDeadline){
          lateTasksOrdered.push(lateTask);
        }
      });
 
      });
      
      // console.log(lateTasksOrdered);
    };

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
      
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}

