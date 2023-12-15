import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(private productService : ProductService, private router : Router,public appState : AppStateService) {
  }




  ngOnInit(): void {
      this.searchProducts();
  }

  searchProducts(){

    this.productService.searchProducts(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize)
      .subscribe({
        next : (resp) => {
          this.appState.productState.products = resp.body as Product[];
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
          this.appState.productState.totalProducts=totalProducts;
          this.appState.productState.totalPages = Math.floor(totalProducts/this.appState.productState.pageSize);
          if(totalProducts % this.appState.productState.pageSize != 0){
            this.appState.productState.totalPages = this.appState.productState.totalPages + 1;
          }
          console.log(this.appState.productState.totalPages);
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

  handleDelete(product:Product) {
    if(confirm("Etes vous sure de vouloir supprimer ?"))
    this.productService.deleteProducts(product).subscribe({
      next:value => {
        //this.getProducts()
        //this.appState.productState.products =
         // this.appState.productState.products.filter((p :any)=> p.id != product.id);
        this.searchProducts();
      }
    });

  }



  handleGoToPage(page:number) {
    this.appState.productState.currentPage=page;
    this.searchProducts();
  }

  handleEdit(product:Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
