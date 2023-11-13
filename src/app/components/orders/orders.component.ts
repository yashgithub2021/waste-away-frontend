import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth/user.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private user: UserService, private order: OrderService, private router: Router) { }

  displayedColumns: string[] = ['id', 'status', 'date', 'time'];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  token: any
  Orders: any
  loader: boolean = true
  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token')
    this.fetchOrders()
  }

  //Get Orders of user
  fetchOrders() {
    this.order.getOrders().subscribe((res) => {
      this.Orders = res
      this.loader = false
      // console.log(this.Orders)
      this.populateElementData()
    })
  }

  //Order Table
  populateElementData() {
    this.ELEMENT_DATA = this.Orders.map((order: any) => {
      return {
        id: order._id,
        user: order.user,
        address: order.address,
        date: order.date,
        time: order.time,
        status: order.status,
        orderdate: order.orderdate
      } as PeriodicElement;
    });
    this.dataSource.data = this.ELEMENT_DATA
  }

  redirectToDetails(id: number): void {
    // Navigate to the details page using the Angular router
    this.router.navigate(['/components/orderDetail', id]);
  }

}


export interface PeriodicElement {
  id: String
  user: String
  address: String
  date: String
  time: String
  status: String
  orderdate: Date
}


