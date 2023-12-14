import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  //products$! : Observable<Array<Product>>;
  public products : Array<Product>=[];
  public keyword : string="";
  public totalPages:number=0;
  public pageSize:number=3;
  public currentPage:number=1;

  constructor(private productService : ProductService, private router : Router) {
  }




  ngOnInit(): void {
      this.searchProducts();
  }

  searchProducts(){

    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize)
      .subscribe({
        next : (resp) => {
          this.products = resp.body as Product[];
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
          this.totalPages = Math.floor(totalProducts/this.pageSize);
          if(totalProducts % this.pageSize != 0){
            this.totalPages = this.totalPages + 1;
          }
          console.log(this.totalPages);
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
        this.products = this.products.filter(p => p.id != product.id);
      }
    });

  }



  handleGoToPage(page:number) {
    this.currentPage=page;
    this.searchProducts();
  }

  handleEdit(product:Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
