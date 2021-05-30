import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerModel} from '../models/customer.model';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) {
  }

  getCustomers() {
    return this.http.get<CustomerModel[]>('http://private-anon-859207935b-byrd1.apiary-mock.com/customers');
  }

}
