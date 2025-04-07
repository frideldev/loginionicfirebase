import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MealsService } from '../services/meals.service';
import { Meal, MealResponse } from '../interfaces/meal.interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  private mealsService = inject(MealsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.getCurrentUser();
  userEmail = this.currentUser?.email;
  lastLoginTime = this.currentUser?.metadata.lastSignInTime;

  horizontalMeals: Meal[] = [];
  verticalMeals: Meal[] = [];
  private alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private verticalIndex = 0;
  private horizontalIndex = 0;
  isVerticalLoading = false;
  isHorizontalLoading = false;

  ngOnInit() {
    this.loadInitialMeals();
  }

  loadInitialMeals() {
    this.isVerticalLoading = true;
    this.isHorizontalLoading = true;
    
    this.mealsService.getMeals('a').subscribe({
      next: (response: MealResponse) => {
        if (response.meals) {
          this.horizontalMeals = response.meals.slice(0, 10);
          this.verticalMeals = response.meals;
        }
        this.isVerticalLoading = false;
        this.isHorizontalLoading = false;
      },
      error: (error) => {
        console.error('Error loading meals:', error);
        this.isVerticalLoading = false;
        this.isHorizontalLoading = false;
      }
    });
  }

  onVerticalInfinite(ev: any) {
    this.verticalIndex++;
    if (this.verticalIndex >= this.alphabet.length) {
      ev.target.complete();
      ev.target.disabled = true;
      return;
    }

    const nextLetter = this.alphabet[this.verticalIndex];
    this.mealsService.getMeals(nextLetter).subscribe({
      next: (response) => {
        if (response.meals) {
          this.verticalMeals = [...this.verticalMeals, ...response.meals];
        }
        ev.target.complete();
      },
      error: (error) => {
        console.error('Error loading more vertical meals:', error);
        ev.target.complete();
      }
    });
  }

  onHorizontalInfinite(ev: any) {
    this.horizontalIndex++;
    if (this.horizontalIndex >= this.alphabet.length) {
      ev.target.complete();
      ev.target.disabled = true;
      return;
    }

    const nextLetter = this.alphabet[this.horizontalIndex];
    this.mealsService.getMeals(nextLetter).subscribe({
      next: (response) => {
        if (response.meals) {
          this.horizontalMeals = [...this.horizontalMeals, ...response.meals.slice(0, 5)];
        }
        ev.target.complete();
      },
      error: (error) => {
        console.error('Error loading more horizontal meals:', error);
        ev.target.complete();
      }
    });
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout exitoso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
  setLoading(state: boolean) {
    this.isLoading = state;
  }
}