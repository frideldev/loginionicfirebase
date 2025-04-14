import { Component, Input } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-location-header",
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <div class="location-container">
      <ion-icon name="location-outline"></ion-icon>
      <span class="location-text">{{ location }}</span>
    </div>
  `,
  styles: [
    `
    .location-container {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      font-size: 18px;
      font-weight: 500;
    }
    
    ion-icon {
      font-size: 24px;
      margin-right: 8px;
    }
    
    .location-text {
      color: var(--app-color-dark-gray);
    }
  `,
  ],
})
export class LocationHeaderComponent {
  @Input() location = ""
}
