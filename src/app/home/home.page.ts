import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCard, IonCardTitle, IonCardHeader, IonItem, IonCardContent, IonLabel, IonList } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule,IonList, IonLabel, IonCardContent, IonItem, IonCardHeader, IonCardTitle, IonCard, IonIcon, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
    currentUser: User | null = null;
    userEmail: string | null = null;
    lastLoginTime: string | null = null;
  
    ngOnInit() {
      this.currentUser = this.authService.getCurrentUser();
      this.userEmail = this.currentUser?.email || 'Usuario';
      this.lastLoginTime = this.currentUser?.metadata.lastSignInTime || null;
    }
  
  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}
