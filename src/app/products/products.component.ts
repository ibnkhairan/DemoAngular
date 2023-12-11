import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  //products$! : Observable<Array<Product>>;
  public products : Array<Product>=[];
  public keyword : string="";

  constructor(private productService : ProductService) {
  }




  ngOnInit(): void {
      this.getProducts();
  }

  getProducts(){

    this.productService.getProducts()
      .subscribe({
        next : data => {
          this.products=data
        },
        error : err => {
          console.log(err);
        }

      })

    //this.products$=this.productService.getProducts();
  }
  handleCheckProduct(product:Product) {
    this.productService.checkedProducts(product).subscribe({
      next : updateproduct => {
        product.checked=!product.checked;
        //this.getProducts();
      }
    })

  }

  handelDelete(product:Product) {
    if(confirm("Etes vous sure de vouloir supprimer ?"))
    this.productService.deleteProducts(product).subscribe({
      next:value => {
        //this.getProducts()
        this.products = this.products.filter(p => p.id != product.id);
      }
    });

  }

  searchProducts() {
    this.productService.searchProductService(this.keyword).subscribe({
      next : data => {
        this.products = data;
      }
    })
  }
}
