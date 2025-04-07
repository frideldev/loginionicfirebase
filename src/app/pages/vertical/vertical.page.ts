import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MealsService } from '../../services/meals.service';
import { Meal, MealResponse } from '../../interfaces/meal.interface';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.page.html',
  styleUrls: ['./vertical.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class VerticalPage implements OnInit {
  private mealsService = inject(MealsService);
  verticalMeals: Meal[] = [];
  private alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private verticalIndex = 0;
  isVerticalLoading = false;

  ngOnInit() {
    this.loadInitialMeals();
  }

  loadInitialMeals() {
    this.isVerticalLoading = true;
    this.mealsService.getMeals('a').subscribe({
      next: (response: MealResponse) => {
        if (response.meals) {
          this.verticalMeals = response.meals;
        }
        this.isVerticalLoading = false;
      },
      error: (error) => {
        console.error('Error loading meals:', error);
        this.isVerticalLoading = false;
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
      next: (response: MealResponse) => {
        if (response.meals) {
          this.verticalMeals = [...this.verticalMeals, ...response.meals];
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