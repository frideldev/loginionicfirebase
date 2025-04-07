import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealResponse } from '../interfaces/meal.interface';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private http = inject(HttpClient);
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  getMeals(letter: string): Observable<MealResponse> {
    return this.http.get<MealResponse>(`${this.baseUrl}/search.php?f=${letter}`);
  }
}