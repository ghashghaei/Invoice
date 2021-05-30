import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {OrdersComponent} from './orders/orders.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {OrderService} from './services/order.service';
import {CustomerService} from './services/customer.service';
import {ItemsDialogComponent} from './orders/items-dialog/items-dialog.component';
import {AngularMaterialModule} from './material.module';
import {SnackBarService} from './core/snack-bar/snack-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    ItemsDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    CustomerService,
    OrderService,
    SnackBarService
  ],
  entryComponents: [
    ItemsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
