import { Component, input, OnInit } from '@angular/core';
import { Todo } from '../../core/models/todo.model';
import { TodoService } from '../../core/services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit {
  todo = input.required<Todo>();
  isEditting = false;
  editedTodo = '';
  constructor(private readonly todoService: TodoService) {}
  ngOnInit(): void {
    this.editedTodo = this.todo().title;
  }
  onDeleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }
  onToggleTodo(todo: Todo) {
    this.todoService.toggleCompleted(todo.id);
  }
  onEditTodo(todo: Todo) {
    if (this.isEditting && this.editedTodo.trim()) {
      this.todoService.updateTodo(todo.id, this.editedTodo.trim());
    }
    this.isEditting = !this.isEditting;
  }
}
