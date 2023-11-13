import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: String = "http://localhost:4000/api/auth/";
  Orderurl: String = "http://localhost:4000/api/order/"

  constructor(private http: HttpClient) { }

  //Signup
  register(body: any) {
    return this.http.post(`${this.url}createuser`, body)
  }

  //Login
  login(body: any) {
    return this.http.post(`${this.url}login`, body)
  }

  // Get User Details
  fetchUsers(token: any) {
    const header = new HttpHeaders({
      'auth-token': token
    })
    return this.http.get(`${this.url}getuser`, { headers: header })
  }

  //Update Address
  updateAdd(token: any, address: any) {
    const header = new HttpHeaders({
      "auth-token": token
    })
    return this.http.put(`${this.url}updateAddress`, address, { headers: header })
  }
}
