import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/orders/order.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {

  @ViewChild('content', { static: false }) content!: ElementRef;
  orderDetails: any
  orderId: any
  orderDate?: String
  loader: boolean = true
  token = localStorage.getItem('auth-token')

  constructor(private order: OrderService, private activeRoute: ActivatedRoute, private loc: Location, private http: HttpClient) { }

  ngOnInit(): void {
    this.getOrderByid()
    // this.readSCSS()
  }

  // Get Order By Id
  getOrderByid() {
    this.activeRoute.params.subscribe((res: any) => {
      this.orderId = res.id
      this.order.getOrderById(this.orderId, this.token).subscribe((res: any) => {
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

  // Cancel Order
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
        this.order.cancel(this.orderId, this.token, status).subscribe((res: any) => {
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

  // Read SCSS file
  readSCSS() {
    this.http.get('src/styles.css', { responseType: 'text' }).subscribe((scssContent) => {
      // this.downloadPdf(scssContent);
    });
  }

  // Download PDF
  downloadPdf() {
    const contentElement = this.content.nativeElement;

    // Hide buttons before capturing content
    const buttonsToHide = contentElement.querySelectorAll('.btn');
    buttonsToHide.forEach((button: any) => {
      button.style.display = 'none';
    });

    // Use html2canvas to capture the content as an image
    html2canvas(contentElement).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');

      // Show buttons again
      buttonsToHide.forEach((button: any) => {
        button.style.display = '';
      });

      // Create a new instance of jsPDF with portrait orientation
      const pdf = new jsPDF({
        orientation: 'landscape',
      });

      // Add the captured image to the PDF
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      // Save the PDF
      pdf.save('PickUp_Details.pdf');
    });
  }

  //Go back
  goBack() {
    this.loc.back()
  }
}

