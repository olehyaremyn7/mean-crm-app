import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AuthorizationLayoutComponent } from './shared/layouts/authorization-layout/authorization-layout.component';
import { LoginPageComponent } from './pages/authorization/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/authorization/registration-page/registration-page.component';
import { ToolbarComponent } from './shared/partials/toolbar/toolbar.component';
import { AuthorizationModalComponent } from './shared/components/authorization-modal/authorization-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import { OverviewPageComponent } from './pages/main/overview-page/overview-page.component';
import { AnalyticsPageComponent } from './pages/main/analytics-page/analytics-page.component';
import { HistoryPageComponent } from './pages/main/history-page/history-page.component';
import { OrderPageComponent } from './pages/main/order-page/order-page.component';
import { CategoriesPageComponent } from './pages/main/categories-page/categories-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NewCategoryPageComponent } from './pages/main/categories-page/new-category-page/new-category-page.component';
import { PositionComponent } from './pages/main/categories-page/position/position.component';
import { OrderCategoriesComponent } from './pages/main/order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './pages/main/order-page/order-positions/order-positions.component';
import { HistoryTableComponent } from './pages/main/history-page/history-table/history-table.component';
import { HistoryFilterComponent } from './pages/main/history-page/history-filter/history-filter.component';
import { AlertComponent } from './shared/components/alert/alert.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { OverviewModalComponent } from './pages/main/overview-page/overview-modal/overview-modal.component';
import { AnalyticsModalComponent } from './pages/main/analytics-page/analytics-modal/analytics-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthorizationLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    ToolbarComponent,
    AuthorizationModalComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    NewCategoryPageComponent,
    PositionComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryTableComponent,
    HistoryFilterComponent,
    AlertComponent,
    OverviewModalComponent,
    AnalyticsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
