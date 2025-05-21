import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../core/services/todo.service';
@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  todoTitle = '';
  constructor(private readonly todoService: TodoService) {}
  onAddTodo() {
    if (this.todoTitle) {
      this.todoService.addTodo(this.todoTitle);
      this.todoTitle = '';
    }
  }
}
