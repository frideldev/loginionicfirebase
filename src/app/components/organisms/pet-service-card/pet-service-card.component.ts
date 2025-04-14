import { Component, Input, Output, EventEmitter } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"
import { BookmarkButtonComponent } from "../../atoms/bookmark-button/bookmark-button.component"

export interface PetService {
  id: string
  name: string
  imageUrl: string
  serviceType: string
  schedule: string
  price: number
  isBookmarked: boolean  // Make this required, not optional
  backgroundColor?: string
}

@Component({
  selector: 'app-pet-service-card',
  standalone: true,
  imports: [IonicModule, CommonModule, BookmarkButtonComponent],
  template: `
    <ion-card [style.--background]="backgroundColor || 'var(--app-color-teal)'">
      <div class="card-content">
        <div class="pet-info">
          <h2>{{ service.name }}</h2>
          <p>{{ service.schedule }}</p>

          <div class="service-type">
            <ion-icon [name]="getServiceIcon(service.serviceType)"></ion-icon>
            <span>{{ service.serviceType }}</span>
          </div>
        </div>

        <div class="price">
          <span class="amount">{{ service.price }}</span>
          <span class="unit">/ hr</span>
        </div>

        <app-bookmark-button
          [isBookmarked]="service.isBookmarked" 
          (bookmarkChange)="onBookmarkChange($event)">
        </app-bookmark-button>
      </div>
    </ion-card>
  `,
  styles: [`
    ion-card {
      margin: 10px;
      border-radius: 12px;
      overflow: hidden;
      height: 180px;
      position: relative;
      background-size: cover;
      background-position: center;
      color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .card-content {
      position: relative;
      height: 100%;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%);
    }
    
    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    
    p {
      margin: 4px 0 12px;
      font-size: 16px;
      opacity: 0.9;
    }
    
    .service-type {
      display: flex;
      align-items: center;
      font-size: 16px;
    }
    
    .service-type ion-icon {
      margin-right: 6px;
      font-size: 18px;
    }
    
    .price {
      position: absolute;
      bottom: 16px;
      right: 16px;
      text-align: right;
    }
    
    .amount {
      font-size: 24px;
      font-weight: 600;
    }
    
    .unit {
      font-size: 16px;
      opacity: 0.9;
    }
  `]
})
export class PetServiceCardComponent {
  @Input() service!: PetService
  @Input() backgroundColor?: string
  @Output() bookmark = new EventEmitter<{ id: string; bookmarked: boolean }>()

  // Add getter for bookmark state
  get isBookmarked(): boolean {
    return this.service?.isBookmarked ?? false;
  }

  getServiceIcon(serviceType: string): string {
    switch (serviceType.toLowerCase()) {
      case "dog walking":
        return "paw"
      case "day care":
        return "sunny"
      default:
        return "paw"
    }
  }

  onBookmarkChange(isBookmarked: boolean) {
    if (this.service) {
      this.service.isBookmarked = isBookmarked;
      this.bookmark.emit({
        id: this.service.id,
        bookmarked: isBookmarked,
      });
    }
  }
}