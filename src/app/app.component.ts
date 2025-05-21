import { Component } from '@angular/core';
import { TodoListComponent } from './features/todo-list/todo-list.component';
import { FilterPanelComponent } from './shared/components/filter-panel/filter-panel.component';
import { AddTodoComponent } from './features/add-todo/add-todo.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, FilterPanelComponent, AddTodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'rxjs-todo';
}
