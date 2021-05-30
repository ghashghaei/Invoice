import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ItemsDialogComponent} from './items-dialog/items-dialog.component';
import {OrderModel} from '../models/order.model';
import {SummeryModel} from '../models/summery.model';
import * as moment from 'moment';
import {ParametersModel} from '../models/parameters.model';
import {SnackBarService} from '../core/snack-bar/snack-bar.service';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: OrderModel[];
  summery: SummeryModel;
  params = new ParametersModel();
  selectedOrder: OrderModel;

  constructor(private orderService: OrderService,
              private paramRoute: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: SnackBarService,
              private router: Router) {
    combineLatest(this.paramRoute.params, this.paramRoute.queryParams).subscribe(
      ([params, queryParams]) => {
        this.params.customerId = params.customerId;
        this.params.startDate = queryParams.startDate;
        this.params.endDate = queryParams.endDate;

        if (this.paramsValidator()) {
          this.getOrders();
        }
      });
  }

  ngOnInit() {
  }

  getOrders(): void {
    this.orderService.getCustomerOrders(this.params).subscribe(data => {
      this.orders = data.orders;
      this.summery = data.summery;
    });
  }

  orderSelected(row): void {
    this.selectedOrder = row;
  }

  showItems(items): void {
    this.dialog.open(ItemsDialogComponent, {
      width: '800px',
      data: {
        items
      }
    });
  }

  private paramsValidator(): boolean {
    let message;
    if (!this.params.customerId) {
      message = 'customer ID is not valid';
    } else if (!this.params.startDate || !this.isDateValid(this.params.startDate) ||
      !this.params.endDate || !this.isDateValid(this.params.endDate)) {
      message = 'date parameters are not valid';
    } else if (!this.isGreater()) {
      message = 'start date is greater than end date';
    }
    if (message) {
      this.router.navigateByUrl('/home');
      this.snackBar.showError(message);
      return false;
    } else {
      return true;
    }
  }

  private isDateValid(date): boolean {
    return moment(date).isValid();
  }

  private isGreater(): boolean {
    return moment(this.params.endDate).isSameOrAfter(moment(this.params.startDate));
  }
}
