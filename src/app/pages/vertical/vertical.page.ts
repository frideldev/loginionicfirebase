import { Component } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"
import { HomeTemplateComponent } from "../../components/templates/home-template/home-template.component"
import type { Filter } from "../../components/molecules/filter-bar/filter-bar.component"
import type { PetService } from "../../components/organisms/pet-service-card/pet-service-card.component"

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.page.html',
  styleUrls: ['./vertical.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,HomeTemplateComponent]
})
export class VerticalPage {
  location = "Kastanienallee, Berlin"

  activeFilters: Filter[] = [
    { id: "price", label: "Price hourly: min $10" },
    { id: "size", label: "Small dogs" },
  ]

  petServices: PetService[] = [
    {
      id: "1",
      name: "Gnocchi",
      imageUrl: "assets/screen1.png",
      serviceType: "Dog Walking",
      schedule: "Weekdays | 7:00",
      price: 12,
      isBookmarked: false,
      backgroundColor: "var(--app-color-teal)",
    },
    {
      id: "2",
      name: "Ricotti",
      imageUrl: "assets/screen2.png",
      serviceType: "Day Care",
      schedule: "Weekends | 8:30 - 15:30",
      price: 18,
      isBookmarked: false,
      backgroundColor: "var(--app-color-blue-gray)",
    },
    {
      id: "3",
      name: "Penne",
      imageUrl: "assets/screen2.png",
      serviceType: "Dog Walking",
      schedule: "Mondays | 10:00",
      price: 15,
      isBookmarked: false,
      backgroundColor: "var(--app-color-teal)",
    },
  ]

  removeFilter(filterId: string) {
    this.activeFilters = this.activeFilters.filter((filter) => filter.id !== filterId)
  }

  toggleBookmark(event: { id: string; bookmarked: boolean }) {
    const serviceIndex = this.petServices.findIndex((service) => service.id === event.id)
    if (serviceIndex !== -1) {
      this.petServices[serviceIndex].isBookmarked = event.bookmarked
    }
  }
}