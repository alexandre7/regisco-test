import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
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

  public dateTaskOrdered: Map<string, string> = new Map([]);

  constructor(private http: HttpClient, private errorMessageService: ErrorMessageService) { }

    /** GET tasks from the server */
    getTasks(): Observable<Tasks[]> {
      return this.http.get<Tasks[]>(this.tasksUrl, this.httpOptions)
      .pipe(
      
        catchError(this.handleError<Tasks[]>('getHeroes', []))
      )
    };

    /** Transform the date into a string For Yesterday and Today */
    public changeSpecificDates(task: Tasks){
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
        // console.log('allo')
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
        tasks.forEach(task => {
          if(task.completedAt === null){
            this.incompletedTasks.push(task as any);
          }
        });

        this.incompletedTasks.forEach(incompleteTask => {
         
        const date = Date.parse(incompleteTask.deadline);

        if(date > yesterdaydateNumber){
        
          this.upcomingTasks.push(incompleteTask);
          // this.changeSpecificDates(incompleteTask);
        }
        else{
          this.lateTasks.push(incompleteTask);
          // console.log('hello');
          
          this.dateTaskOrdered.set(incompleteTask.deadline, incompleteTask.name);
          //  console.log(this.dateTaskOrdered);
          
          // this.changeSpecificDates(incompleteTask);
        }
      
        });

        
        // this.dateTaskOrdered.sort()
      }); 
    }

    /** Order the two lists : late and upcoming tasks in order as ask in the test description */
    public orderTasks(){
      const latetasksDeadlines: string[] = [];
      const lateTasksOrdered: Tasks[] = [];
      
   

  

  
      latetasksDeadlines.sort();


      // this.lateTasks.forEach(lateTask => {
      //   latetasksDeadlines.forEach(latetaskDeadline => {
    
      //     if(lateTask.deadline === latetaskDeadline){
      //       lateTasksOrdered.push(lateTask);
      //     }
 
      //   });
       
      // });

      // console.log(lateTasksOrdered);
      

      
      // ICITTE POUR METTRE EN ORDRE
    };

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // console for the programmer or for user using console
        console.error(error); // log to console instead
    
        this.errorMessageService.displayErrorMessage(`${operation} failed: ${error.message}`);
        
        return of(result as T);
      };
    }
}

