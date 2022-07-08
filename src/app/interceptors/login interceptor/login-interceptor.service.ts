import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    token: string

    constructor() {
        this.token = localStorage.getItem("token");
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }

        if (request.method === 'POST') {
            return next.handle(request).pipe(

                tap((response: HttpEvent<any>) => {
                    if (response instanceof HttpResponse) {
                        response = response.clone()

                        if ("access_token" in response.body) {
                            this.token = response.body.access_token
                            localStorage.setItem("token", this.token);
                        }
                    }
                })
            );
        }
        else {
            return next.handle(request);
        }
    }

}   