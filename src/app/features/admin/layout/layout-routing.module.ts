import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'sorteos',
        loadChildren: () => import('../pages/sorteo/sorteo.module').then(m => m.SorteoModule)
      },
      {
        path: 'archivos',
        loadChildren: () => import('../pages/archivo/archivo.module').then(m => m.ArchivoModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('../pages/customer/customer.module').then(m => m.CustomerModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
