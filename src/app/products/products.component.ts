import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products : Array<any> =[
    { id : 1, name : "Computer", price : 4200, checked : false},
    { id : 2, name : "Printer", price : 1400, checked : true},
    { id : 3, name : "Phone", price : 3200, checked : false}
  ];

  handleCheckProduct(product:any) {
    product.checked = !product.checked;
  }
}
