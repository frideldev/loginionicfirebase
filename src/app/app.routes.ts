import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'horizontal',
        loadComponent: () => import('./pages/horizontal/horizontal.page').then(m => m.HorizontalPage)
      },
      {
        path: 'vertical',
        loadComponent: () => import('./pages/vertical/vertical.page').then(m => m.VerticalPage)
      },
      {
        path: '',
        redirectTo: 'horizontal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'home',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];
