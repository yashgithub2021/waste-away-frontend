import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.scss']
})
export class PricelistComponent {

  constructor(private loc: Location) { }

  wasteType: string = 'paper'

  changeSection(section: string) {
    this.wasteType = section
  }

  goBack() {
    this.loc.back()
  }
}
