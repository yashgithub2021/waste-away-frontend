import { Component, OnInit } from '@angular/core';
import { UserService } from './services/auth/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'waste-away-frontend';

  sideBarOpen = true;

  constructor(public _route: Router) { }

  ngOnInit(): void {

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
