import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: String = "http://localhost:4000/api/order/"
  constructor(private http: HttpClient) { }

  // Place Pickup Order
  placeorder(body: any, token: any) {
    const header = new HttpHeaders({
      "auth-token": token
    })
    return this.http.post(`${this.url}placeorder`, body, { headers: header })
  }

  // Fetch All Orders
  getOrders(token: any) {
    const header = new HttpHeaders({
      "auth-token": token
    })
    return this.http.get(`${this.url}fetchOrder`, { headers: header })
  }

  // Fetch Single Order
  getOrderById(id: any, token: any) {
    const header = new HttpHeaders({
      "auth-token": token
    })
    return this.http.get(`${this.url}orderById/${id}`, { headers: header })
  }

  //Cancel Pickup
  cancel(id: any, token: any, status: any) {
    const header = new HttpHeaders({
      "auth-token": token
    })
    return this.http.put(`${this.url}updateStatus/${id}`, status, { headers: header })
  }

  //HTML to PDF
  generatePdf(htmlContent: HTMLElement, styles: string, filename: string): void {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    head.appendChild(styleElement);

    html2canvas(htmlContent).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(contentDataURL, 'PNG', 0, 0, 210, 297);

      pdf.save(filename + '.pdf');

      // Remove the dynamically added style element after capturing
      head.removeChild(styleElement);
    });
  }
}
