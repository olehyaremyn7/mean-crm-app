import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationLayoutComponent} from "./shared/layouts/authorization-layout/authorization-layout.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {LoginPageComponent} from "./pages/authorization/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/authorization/registration-page/registration-page.component";
import {AuthorizationGuard} from "./shared/classes/authorization.guard";
import {OverviewPageComponent} from "./pages/main/overview-page/overview-page.component";
import {AnalyticsPageComponent} from "./pages/main/analytics-page/analytics-page.component";
import {CategoriesPageComponent} from "./pages/main/categories-page/categories-page.component";
import {OrderPageComponent} from "./pages/main/order-page/order-page.component";
import {HistoryPageComponent} from "./pages/main/history-page/history-page.component";
import {NewCategoryPageComponent} from "./pages/main/categories-page/new-category-page/new-category-page.component";
import {OrderCategoriesComponent} from "./pages/main/order-page/order-categories/order-categories.component";
import {OrderPositionsComponent} from "./pages/main/order-page/order-positions/order-positions.component";

const routes: Routes = [
  {
    path: '', component: AuthorizationLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegistrationPageComponent }
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthorizationGuard], children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'categories/new', component: NewCategoryPageComponent },
      { path: 'categories/:id', component: NewCategoryPageComponent },
      { path: 'order', component: OrderPageComponent, children: [
          { path: '', component: OrderCategoriesComponent },
          { path: ':id', component: OrderPositionsComponent }
        ] },
      { path: 'history', component: HistoryPageComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
