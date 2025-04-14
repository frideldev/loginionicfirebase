import { Component, Input, Output, EventEmitter } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"
import { FilterChipComponent } from "../../atoms/filter-chip/filter-chip.component"

export interface Filter {
  id: string
  label: string
}

@Component({
  selector: "app-filter-bar",
  standalone: true,
  imports: [IonicModule, CommonModule, FilterChipComponent],
  template: `
    <div class="filter-container">
      <app-filter-chip 
        *ngFor="let filter of activeFilters" 
        [label]="filter.label"
        (onRemove)="removeFilter(filter.id)">
      </app-filter-chip>
    </div>
  `,
  styles: [
    `
    .filter-container {
      display: flex;
      flex-wrap: wrap;
      padding: 8px;
      background-color: var(--ion-background-color);
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }
  `,
  ],
})
export class FilterBarComponent {
  @Input() activeFilters: Filter[] = []
  @Output() filterRemoved = new EventEmitter<string>()

  removeFilter(id: string) {
    this.filterRemoved.emit(id)
  }
}