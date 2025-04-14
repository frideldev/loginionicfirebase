import { Component, Input } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-icon-button",
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-button [fill]="fill" [color]="color" [shape]="shape" [size]="size">
      <ion-icon [name]="iconName"></ion-icon>
    </ion-button>
  `,
  styles: [
    `
    ion-button {
      --border-radius: 50%;
    }
  `,
  ],
})
export class IconButtonComponent {
  @Input() iconName = "heart-outline"
  @Input() color = "light"
  @Input() fill: "clear" | "outline" | "solid" = "clear"
  @Input() shape: "round" | undefined = "round"
  @Input() size: "small" | "default" | "large" = "default"
}
