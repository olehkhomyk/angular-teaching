import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  // Phase 2:
  // {
  //   path: 'appointment/:id',
  //   loadComponent: () =>
  //     import('./features/appointment-detail/appointment-detail.component')
  //       .then(m => m.AppointmentDetailComponent),
  // },
];
