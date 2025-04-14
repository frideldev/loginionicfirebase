import { Component, Input, Output, EventEmitter } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-bookmark-button",
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-button fill="clear" (click)="toggleBookmark()">
      <ion-icon [name]="isBookmarked ? 'bookmark' : 'bookmark-outline'" color="light"></ion-icon>
    </ion-button>
  `,
  styles: [
    `
    ion-button {
      position: absolute;
      top: 10px;
      right: 10px;
      --padding-start: 8px;
      --padding-end: 8px;
      --padding-top: 8px;
      --padding-bottom: 8px;
      margin: 0;
    }
    
    ion-icon {
      font-size: 24px;
    }
  `,
  ],
})
export class BookmarkButtonComponent {
  @Input() isBookmarked:boolean = false
  @Output() bookmarkChange = new EventEmitter<boolean>()

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked
    this.bookmarkChange.emit(this.isBookmarked)
  }
}
