import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
} from 'rxjs';
import { Todo } from '../models/todo.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoSubject = new BehaviorSubject<Todo[]>([
    { id: uuid(), title: 'Finish Rxjs project', completed: true },
    { id: uuid(), title: 'Start React Project', completed: true },
    { id: uuid(), title: 'Contiune Nest project', completed: false },
    { id: uuid(), title: 'Polish my CV', completed: false },
    { id: uuid(), title: 'Read a chapter of a book', completed: true },
  ]);
  private searchTermSubject = new BehaviorSubject<string>('');
  private categoryFilterSubject = new BehaviorSubject<'all' | 'todo' | 'done'>(
    'all'
  );

  todos$ = this.todoSubject.asObservable();

  searchTerm$ = this.searchTermSubject
    .asObservable()
    .pipe(debounceTime(300), distinctUntilChanged());

  categoryFilter$ = this.categoryFilterSubject.asObservable();

  filteredTodos$: Observable<Todo[]> = combineLatest([
    this.todos$,
    this.searchTerm$,
    this.categoryFilter$,
  ]).pipe(
    map(([todos, searchTerm, category]) => {
      const lowerSearch = searchTerm.toLowerCase();

      return todos.filter((todo) => {
        const matchesSearch = todo.title.toLowerCase().includes(lowerSearch);
        const matchesCategory =
          category === 'all' ||
          (category === 'todo' && !todo.completed) ||
          (category === 'done' && todo.completed);

        return matchesSearch && matchesCategory;
      });
    })
  );

  constructor() {}

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: uuid(),
      title,
      completed: false,
    };
    this.todoSubject.next([...this.todoSubject.value, newTodo]);
  }

  deleteTodo(id: string): void {
    this.todoSubject.next(
      this.todoSubject.value.filter((todo) => todo.id !== id)
    );
  }

  toggleCompleted(id: string): void {
    this.todoSubject.next(
      this.todoSubject.value.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  updateTodo(id: string, title: string) {
    const updatedTodos = this.todoSubject.value.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );
    this.todoSubject.next(updatedTodos);
  }
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  setCategoryFilter(filter: 'all' | 'todo' | 'done'): void {
    this.categoryFilterSubject.next(filter);
  }
}
