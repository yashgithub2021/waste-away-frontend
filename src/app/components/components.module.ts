import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';


@NgModule({
  declarations: [
    AddressComponent,
    DashboardComponent,
    OrdersComponent,
    PricelistComponent,
    ProfileComponent,
    ScheduleComponent,
    OrderdetailsComponent,
  ],
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    CommonModule,
    ComponentsRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ComponentsModule { }
