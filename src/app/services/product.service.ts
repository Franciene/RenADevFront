import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<any> {
    return this.http.get('http://localhost:2727/products/');
  }

  getProductById(id : any) : Observable<any> {
    return this.http.get(`http://localhost:2727/products/${id}`);
  }

}
