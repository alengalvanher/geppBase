import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guard/admin.guard';

import { LayoutComponent } from "./../app/layout/layout.component";
import { LoginComponent } from './modulos/auth/login/login.component';

export const content: Routes = [
  {
    path: 'inventario',
    loadChildren: () => import('./modulos/inventario/inventario.module').then(m => m.InventarioModule),
  },
  {
    path: 'combustibles',
    loadChildren: () => import('./modulos/combustibles/combustibles.module').then(m => m.CombustiblesModule),
  },
  {
    path: 'neumaticos',
    loadChildren: () => import('./modulos/neumaticos/neumaticos.module').then(m => m.NeumaticosModule),
  }
];

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: content
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
