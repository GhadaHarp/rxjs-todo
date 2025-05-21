import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent implements OnInit {
  searchTerm = '';
  constructor(private readonly todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.searchTerm$.subscribe((val) => (this.searchTerm = val));
  }
  setSearchTerm(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.todoService.setSearchTerm(input.value);
  }
}
