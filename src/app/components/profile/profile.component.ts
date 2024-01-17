import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  token: any
  name?: String
  email?: String
  loader: boolean = true
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token')
    this.fetchUser()
  }

  //User Data
  fetchUser() {
    this.user.fetchUsers(this.token).subscribe((res: any) => {
      this.loader = false
      this.name = res.name
      this.email = res.email
    })
  }

  ngOnDestroy(): void {
    this.loader = true
  }
}
