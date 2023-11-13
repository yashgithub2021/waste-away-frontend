import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/orders/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {

  orderDetails: any
  orderId: any
  orderDate?: String
  loader: boolean = true

  constructor(private order: OrderService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrderByid()
  }

  // Get Order By Id
  getOrderByid() {
    this.activeRoute.params.subscribe((res: any) => {
      this.orderId = res.id
      const token = localStorage.getItem('auth-token')
      this.order.getOrderById(this.orderId).subscribe((res: any) => {
        this.loader = false
        this.orderDetails = res.order
        let date = new Date(this.orderDetails.orderdate)
        this.orderDate = date.toLocaleString('en-IN');
      }, (err: any) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 800
        })
      })
    })
  }

  cancelPickup() {
    const status = {
      status: "Cancelled"
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Cancel the Pickup",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.order.cancel(this.orderId, status).subscribe((res: any) => {
          Swal.fire({
            title: "Cancelled!",
            text: "Your Pickup has been Cancelled!",
            icon: "success"
          });
          this.getOrderByid()
        }, (err: any) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 800
          })
        })
      }
    });

  }
}

