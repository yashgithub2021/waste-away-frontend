import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrderService } from 'src/app/services/orders/order.service';
import { UserService } from 'src/app/services/auth/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  selectedDate: string = '';
  selectedTime: string = '';
  userId: any
  token: any
  address?: String
  date: any
  time: any
  status: any
  minDate: string;
  isTimeSelected: boolean = false

  constructor(private location: Location, private user: UserService, private order: OrderService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token')
    this.fetchId()
    // console.log(this.address)
  }

  //User Id
  fetchId() {
    this.user.fetchUsers(this.token).subscribe((res: any) => {
      this.userId = res._id
      this.address = res.address
      // console.log(this.userId)
    })
  }

  //Set time
  setTime(time: any) {
    this.selectedTime = time
    this.isTimeSelected = false
  }

  //Show time
  onDateSelected() {
    this.selectedTime = ''
    // Toggle the visibility of the "time" div when a date is selected
    this.isTimeSelected = true;
  }

  //Reset Date and time
  reset() {
    this.selectedDate = ''
    this.selectedTime = ''
    this.isTimeSelected = false;
  }

  //Schedule Pickup date and time
  schedulePickup() {

    if (this.selectedDate == '' || this.selectedTime == '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please select Date and Time',
        showConfirmButton: false,
        timer: 650
      })
      return
    }
    else if (this.address == '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Enter Address',
        showConfirmButton: false,
        timer: 650
      })
      return
    }
    const body = {
      user: this.userId,
      address: this.address,
      date: this.selectedDate,
      time: this.selectedTime,
      status: this.status,
    }
    const token = this.token

    this.order.placeorder(body, token).subscribe((res: any) => {
      // console.log(res)
      if (res.success) {
        this.selectedDate = '';
        this.selectedTime = ''
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Order Placed Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }, (err: any) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.error.message,
        showConfirmButton: false,
        timer: 750
      })
      // console.log("Server Error!", err)
    })

  }

  //Go to previous location
  goback() {
    this.location.back()
  }

}
