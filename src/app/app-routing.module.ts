import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'foodmenu',
    loadChildren: () => import('./foodmenu/foodmenu.module').then( m => m.FoodmenuPageModule)
  },
  
  {
    path: '',
    redirectTo: 'foodmenu',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'foodorder',
    loadChildren: () => import('./foodorder/foodorder.module').then( m => m.FoodorderPageModule)
  },
  {
    path: 'addmenu',
    loadChildren: () => import('./addmenu/addmenu.module').then( m => m.AddmenuPageModule)
  },
  {
    path: 'orderlist',
    loadChildren: () => import('./orderlist/orderlist.module').then( m => m.OrderlistPageModule)
  },
  {
    path: 'feedlist',
    loadChildren: () => import('./feedlist/feedlist.module').then( m => m.FeedlistPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
