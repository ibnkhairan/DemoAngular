import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private  appState : AppStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.appState.setProductState({
      status : "LOADING"
    });
    let req = request.clone({
      headers : request.headers.set("Authorization","BEARER JWT")
    });

    return next.handle(req).pipe(
      finalize(()=>{
        this.appState.setProductState({
          status : "LOADED"
        });
         })
    );
  }
}
