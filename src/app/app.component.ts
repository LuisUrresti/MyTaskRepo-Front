import { Component, OnInit } from '@angular/core';
import { Task } from './service/task/model/task';
import { TaskControllerService } from './service/task';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  public tasks: Task[];
  public taskAux: Task;
  public idAux: any;


  constructor(private taskService: TaskControllerService) {
    this.tasks = []

  }

  ngOnInit(): void {
    this.getTasks();
  }

  addTask(tDescription: string) {

    console.log(this.tasks.length);
    if (this.tasks.length === 0) {
      this.idAux = 1;
    } else {
      this.idAux = this.tasks[this.tasks.length - 1].id + 1;
    }
    this.taskAux = {id: this.idAux, taskDescription: tDescription, taskState: 'Pendiente'};

    this.taskService.save(this.taskAux).subscribe(data => {
      this.getTasks();
    });
  }

  getTasks(): void {
    this.taskService.getAll().subscribe((data: Task[]) => {
      console.log(data);
      this.tasks = data;
    });
  }

  deleteTask(taskId: string): void {

      this.taskService._delete(taskId).subscribe(() => {
        this.getTasks();
      });
  }

  updateTaskState(task: Task): void {

    if (task.taskState === 'Pendiente') {
      task.taskState = 'En Curso';
    } else if (task.taskState === 'En Curso') {
      task.taskState = 'Completado';
    }
    console.log(task.taskDescription);

    this.taskService.update(task, task.id.toString()).subscribe(data => {
      this.getTasks();
    });
  }

    updateTaskDescription(task: Task, newDescription: string): void {

    task.taskDescription = newDescription;

    console.log(task.taskDescription);

    this.taskService.update(task, task.id.toString()).subscribe(data => {
      this.getTasks();
    });
  }

  filterByToDo() {
      this.taskService.findByState('Pendiente').subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

    filterByDoing() {
      this.taskService.findByState('En Curso').subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

    filterByDone() {
      this.taskService.findByState('Completado').subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

}

