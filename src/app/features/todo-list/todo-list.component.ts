import { Component, OnInit } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../core/models/todo.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = new Observable();
  constructor(private readonly todoServie: TodoService) {}
  ngOnInit(): void {
    this.todos$ = this.todoServie.filteredTodos$;
  }
}
