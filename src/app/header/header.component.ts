import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../services/auth/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  token: any
  userData: any
  username: any
  constructor(private user: UserService) { }
  ngOnInit(): void {
    this.loadData()
  }

  //Toggle sidenav
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  //Get User Details and username
  loadData() {
    this.token = localStorage.getItem('auth-token')
    this.user.fetchUsers(this.token).subscribe((res: any) => {
      // console.log(res)
      this.userData = res
      this.username = this.userData.name
    }, (error: any) => {
      console.log("Error getting data", error)
    })
  }
}
