import {
    HttpErrorResponse,
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ErorInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar
  ){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
        return next.handle(request).pipe(
            tap({
              next: () => null,
              error: (error: HttpErrorResponse) => {
                this._snackBar.open(`Error: ${error.statusText}`);
              },
            })
        );
    }

}   