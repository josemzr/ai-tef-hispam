import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskManagerService } from './taskmanager.service';
import { Task } from './task.model';

@Component({
  selector: 'app-taskmanager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskManagerComponent {
  tasks: Task[] = [];
  newTask: Task = { id: '', name: '', description: '', done: false };

  constructor(private taskManagerService: TaskManagerService) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskManagerService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask(): void {
    if (this.newTask.name && this.newTask.description) {
      this.taskManagerService.addTask(this.newTask).subscribe((task) => {
        this.tasks.push(task);
        this.newTask = { id: '', name: '', description: '', done: false };
      });
    }
  }

  updateTask(task: Task): void {
    this.taskManagerService.updateTask(task).subscribe();
  }

  deleteTask(id: string): void {
    this.taskManagerService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
