import { Component } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-category-filter',
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css',
})
export class CategoryFilterComponent {
  constructor(private readonly todoSevice: TodoService) {}
  setFilter(filter: 'all' | 'todo' | 'done') {
    this.todoSevice.setCategoryFilter(filter);
  }
}
