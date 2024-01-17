import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth/user.service';
import { OrderService } from 'src/app/services/orders/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private user: UserService, private order: OrderService, private router: Router) { }

  displayedColumns: string[] = ['id', 'status', 'date', 'time'];
  ELEMENT_DATA: PeriodicElement[] = [];
  pendingOrdersDataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  completedOrdersDataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  token: any
  pendingOrders: any
  completedOrders: any
  loader: boolean = true
  wasteType: string = 'upcoming'
  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token')
    this.fetchPendingOrders()
    this.fetchCompletedOrders()
  }


  changeSection(section: string) {
    this.wasteType = section
  }

  //Get Pending Orders of user
  fetchPendingOrders() {
    this.order.getOrders(this.token).subscribe((res: any) => {
      const sortedOrders = res.filter((order: any) => order.status === 'pending')
      this.pendingOrders = sortedOrders
      this.loader = false
      this.pendingOrdersTable()
    }, (error: any) => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.statusText,
        showConfirmButton: false,
        timer: 800
      })
      this.loader = false

    })
  }

  //Get Completed Orders of user
  fetchCompletedOrders() {
    this.order.getOrders(this.token).subscribe((res: any) => {
      const sortedOrders = res.filter((order: any) => order.status === 'Cancelled' || order.status === 'Completed')
      this.completedOrders = sortedOrders
      this.loader = false
      this.completedOrdersTable()
    })
  }

  //Pending Orders Table
  pendingOrdersTable() {
    this.ELEMENT_DATA = this.pendingOrders.map((order: any) => {
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
    this.pendingOrdersDataSource.data = this.ELEMENT_DATA
  }

  //Completed Orders Table
  completedOrdersTable() {
    this.ELEMENT_DATA = this.completedOrders.map((order: any) => {
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
    this.completedOrdersDataSource.data = this.ELEMENT_DATA
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


