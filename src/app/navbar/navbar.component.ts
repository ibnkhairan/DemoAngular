import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
//  public isLoading : boolean=false;
  constructor(public appState : AppStateService,public loadingService : LoadingService, private router : Router) {
  /*  this.loadingService.isLoading$.subscribe({
      next : (value)=>{
        this.isLoading = value;
      }
    })*/
  }

  actions : Array<any>=[
    {title:"Home","route":"/admin/home",icon:"house"},
    {title:"Products","route":"/admin/products",icon:"search"},
    {title:"New Product","route":"/admin/newProduct",icon:"safe"}
  ];
  currentAction:any;
  setCurrentAction(action:any){
    this.currentAction = action;
  }

  logout() {
    console.log(this.appState.authState.isAuthenticaded);
    this.appState.authState = {};
    this.router.navigateByUrl("/login")
  }

  login() {
    console.log(this.appState.authState.isAuthenticaded);
    this.router.navigateByUrl("/login")
  }
}
