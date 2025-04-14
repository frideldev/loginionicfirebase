import { Component, Input, Output, EventEmitter } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-filter-chip",
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <div class="filter-chip">
      <span>{{ label }}</span>
      <ion-icon name="close" (click)="onRemove.emit()"></ion-icon>
    </div>
  `,
  styles: [
    `
    .filter-chip {
      display: flex;
      align-items: center;
      background-color: var(--app-color-filter-bg);
      border-radius: 20px;
      padding: 8px 12px;
      margin: 4px;
      font-size: 14px;
    }
    
    ion-icon {
      margin-left: 8px;
      font-size: 16px;
      cursor: pointer;
    }
  `,
  ],
})
export class FilterChipComponent {
  @Input() label = ""
  @Output() onRemove = new EventEmitter<void>()
}
