import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="horizontal">
          <ion-icon name="grid-outline"></ion-icon>
          <ion-label>Gallery</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="vertical">
          <ion-icon name="list-outline"></ion-icon>
          <ion-label>Perritos</ion-label>
        </ion-tab-button>
       
      </ion-tab-bar>
    </ion-tabs>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TabsPage {}