import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  public productForm! : FormGroup;

  constructor(private formBuilder : FormBuilder) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name : this.formBuilder.control(''),
      price : this.formBuilder.control(''),
      checked : this.formBuilder.control(false)
    });
  }
}
