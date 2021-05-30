import {Component, OnInit} from '@angular/core';
import {ParametersModel} from '../models/parameters.model';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CustomerModel} from '../models/customer.model';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parameters: ParametersModel = new ParametersModel();
  customers: CustomerModel[];

  constructor(private customerService: CustomerService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(res => {
      this.customers = res;
    });
  }

  submit() {
    const pipe = new DatePipe('en-US');
    const startDate = pipe.transform(this.parameters.startDate, 'yyyy-MM-dd');
    const endDate = pipe.transform(this.parameters.endDate, 'yyyy-MM-dd');
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/orders/' + this.parameters.customerId], {queryParams: {'startDate': startDate, 'endDate': endDate}}
      ));
  }
}
