import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrdersComponent} from './orders/orders.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent},
  {
    path: 'orders/:customerId',
    component: OrdersComponent
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
