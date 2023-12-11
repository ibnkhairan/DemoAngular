import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:8089/products");
  }

  public checkedProducts(product:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}` ,
      {checked:!product.checked});
  }

  public deleteProducts(product:Product){
    return this.http.delete<any>(`http://localhost:8089/products/${product.id}`);
  }

  saveProductService(product: Product):Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products` ,
      product);
  }

  searchProductService(keyword: string) :Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`);
  }
}
