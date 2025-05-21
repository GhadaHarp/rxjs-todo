import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';

@Component({
  selector: 'app-filter-panel',
  imports: [SearchbarComponent, CategoryFilterComponent],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css',
})
export class FilterPanelComponent {}
