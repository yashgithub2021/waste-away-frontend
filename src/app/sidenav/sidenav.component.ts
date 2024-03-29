import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(public _route: Router) { }


  logout() {
    localStorage.removeItem('auth-token')
    this._route.navigate(['/login'])
  }
}
