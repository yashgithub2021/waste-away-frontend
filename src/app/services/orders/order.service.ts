import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: String = "http://localhost:4000/api/order/"

  private token: any = localStorage.getItem('auth-token')
  private header = new HttpHeaders({
    "auth-token": this.token
  })
  constructor(private http: HttpClient) { }

  // Place Pickup Order
  placeorder(body: any) {
    return this.http.post(`${this.url}placeorder`, body, { headers: this.header })
  }

  // Fetch All Orders
  getOrders() {
    return this.http.get(`${this.url}fetchOrder`, { headers: this.header })
  }

  // Fetch Single Order
  getOrderById(id: any) {
    return this.http.get(`${this.url}orderById/${id}`, { headers: this.header })
  }

  //Cancel Pickup
  cancel(id: any, status: any) {
    return this.http.put(`${this.url}updateStatus/${id}`, status, { headers: this.header })
  }
}
