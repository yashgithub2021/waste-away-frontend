import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  selectedDate: string = '';

  constructor(private location: Location) { }
  ngOnInit(): void {
  }

  goback() {
    this.location.back()
  }

}
