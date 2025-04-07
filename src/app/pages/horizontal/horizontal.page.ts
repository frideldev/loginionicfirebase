import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MealsService } from '../../services/meals.service';
import { Meal, MealResponse } from '../../interfaces/meal.interface';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.page.html',
  styleUrls: ['./horizontal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HorizontalPage implements OnInit {
  private mealsService = inject(MealsService);
  horizontalMeals: Meal[] = [];
  private alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private horizontalIndex = 0;
  isHorizontalLoading = false;

  ngOnInit() {
    this.loadInitialMeals();
  }

  loadInitialMeals() {
    this.isHorizontalLoading = true;
    this.mealsService.getMeals('a').subscribe({
      next: (response: MealResponse) => {
        if (response.meals) {
          this.horizontalMeals = response.meals;
        }
        this.isHorizontalLoading = false;
      },
      error: (error) => {
        console.error('Error loading meals:', error);
        this.isHorizontalLoading = false;
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
      next: (response: MealResponse) => {
        if (response.meals) {
          this.horizontalMeals = [...this.horizontalMeals, ...response.meals];
        }
        ev.target.complete();
      },
      error: (error) => {
        console.error('Error loading more meals:', error);
        ev.target.complete();
      }
    });
  }
}