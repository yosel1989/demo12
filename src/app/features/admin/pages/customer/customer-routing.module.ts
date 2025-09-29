import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';

const routes: Routes = [{
  path: '',
  component: CustomerComponent,
  children: [
    {
      path: ':uuid',
      loadComponent: () =>
        import('./detalle/detalle.component').then(m => m.DetalleComponent)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
