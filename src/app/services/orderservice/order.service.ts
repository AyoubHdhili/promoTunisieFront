import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  products:ProductResponseModel[] = [];
  endpoint = `${environment.baseUrl}orders`;

  constructor(private http:HttpClient) { }

  getSingleOrder(orderId:number){
    return this.http.get<ProductResponseModel[]>(`${this.endpoint}/orderId`).toPromise();
  }
}
interface ProductResponseModel {
  id: number;
  name: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}
