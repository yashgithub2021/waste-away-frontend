import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  token: any
  building: String = '';
  flat: String = '';
  area: String = '';
  locality: String = '';
  city: String = '';
  pincode: any
  address: String = ''

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token')
  }
  updateAddr() {
    if (this.building == '' || this.flat == '' || this.area == '' || this.locality == '' || this.city == '' || this.pincode == 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please enter all fields',
        showConfirmButton: false,
        timer: 650
      })
      return
    }
    this.address = this.building.concat(", " + this.flat + ", " + this.area + ", " + this.locality + ", " + this.city + "- " + this.pincode)
    const addr = {
      address: this.address
    }
    this.user.updateAdd(this.token, addr).subscribe((res: any) => {
      this.building = '';
      this.flat = '';
      this.area = '';
      this.locality = '';
      this.city = '';
      this.pincode = ''
      console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Address changed successfully!',
        showConfirmButton: false,
        timer: 1000
      })
    }, (err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 650
      })
      // console.log(err.message)
    })
  }
}
