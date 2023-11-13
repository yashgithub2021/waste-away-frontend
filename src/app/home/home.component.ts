import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedin = false
  userData: any = ''
  username: any = ''
  token: any
  constructor(public _route: Router, private user: UserService) {
    this._route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {

  }

  loadData() {
    console.log("welcome")
    this.token = localStorage.getItem('auth-token')
    this.user.fetchUsers(this.token).subscribe((res: any) => {
      console.log(res)
      this.userData = res
      this.username = this.userData.name
    }, (error: any) => {
      console.log("Error getting data", error)
    })
  }

  logout() {
    localStorage.removeItem('auth-token')
    this._route.navigate(['/login'])
  }
}
