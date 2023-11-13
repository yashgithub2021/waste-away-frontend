import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  token: any
  name?: String
  email?: String
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token')
    this.fetchUser()
  }

  //User Data
  fetchUser() {
    this.user.fetchUsers(this.token).subscribe((res: any) => {
      this.name = res.name
      this.email = res.email
    })
  }
}
