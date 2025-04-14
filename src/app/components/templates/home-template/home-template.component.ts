import { Component, Input, Output, EventEmitter } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"
import { LocationHeaderComponent } from "../../molecules/location-header/location-header.component"
import { FilterBarComponent, type Filter } from "../../molecules/filter-bar/filter-bar.component"
import { PetServiceCardComponent, type PetService } from "../../organisms/pet-service-card/pet-service-card.component"
import { IconButtonComponent } from "../../atoms/icon-button/icon-button.component"
import { addIcons } from "ionicons"
import { 
  homeOutline, 
  personOutline, 
  pawOutline, 
  gridOutline, 
  listOutline,
  funnelOutline,
  locationOutline 
} from "ionicons/icons"

@Component({
  selector: "app-home-template",
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    LocationHeaderComponent,
    FilterBarComponent,
    PetServiceCardComponent,
    IconButtonComponent,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <app-location-header [location]="location"></app-location-header>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon name="funnel" slot="icon-only"></ion-icon>
            <ion-badge color="dark" slot="end">{{ activeFilters.length }}</ion-badge>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <app-filter-bar 
        [activeFilters]="activeFilters"
        (filterRemoved)="onFilterRemoved($event)">
      </app-filter-bar>
      
      <div class="services-container">
        <app-pet-service-card
          *ngFor="let service of services"
          [service]="service"
          [backgroundColor]="getCardBackground(service)"
          (bookmark)="onBookmarkToggle($event)">
        </app-pet-service-card>
      </div>
    </ion-content>
    
    <ion-footer>
      <ion-toolbar>
        <ion-tabs>
          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="home" selected>
              <ion-icon name="home"></ion-icon>
              <ion-label>Home</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="activities">
              <ion-icon name="paw"></ion-icon>
              <ion-label>Activities</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="profile">
              <ion-icon name="person"></ion-icon>
              <ion-label>Profile</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </ion-toolbar>
    </ion-footer>
  `,
  styles: [
    `
    ion-header ion-toolbar {
      --background: var(--ion-background-color);
    }
    
    ion-badge {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 10px;
      --padding-start: 5px;
      --padding-end: 5px;
      --padding-top: 2px;
      --padding-bottom: 2px;
    }
    
    .services-container {
      padding: 8px;
    }
    
    ion-tab-bar {
      --background: var(--ion-background-color);
    }
    
    ion-tab-button {
      --color: var(--ion-color-medium);
      --color-selected: var(--app-color-primary);
    }
  `,
  ],
})
export class HomeTemplateComponent {
  constructor() {
    addIcons({
      'home-outline': homeOutline,
      'person-outline': personOutline,
      'paw-outline': pawOutline,
      'grid-outline': gridOutline,
      'list-outline': listOutline,
      'funnel-outline': funnelOutline,
      'location-outline': locationOutline
    });
  }

  @Input() location = ""
  @Input() activeFilters: Filter[] = []
  @Input() services: PetService[] = []

  @Output() filterRemove = new EventEmitter<string>()
  @Output() bookmarkToggle = new EventEmitter<{ id: string; bookmarked: boolean }>()

  onFilterRemoved(filterId: string) {
    this.filterRemove.emit(filterId)
  }

  onBookmarkToggle(event: { id: string; bookmarked: boolean }) {
    this.bookmarkToggle.emit(event)
  }

  getCardBackground(service: PetService): string {
    if (service.backgroundColor) {
      return service.backgroundColor
    }

    // Alternate between teal and blue-gray
    return service.id.charCodeAt(0) % 2 === 0 ? "var(--app-color-teal)" : "var(--app-color-blue-gray)"
  }
}
