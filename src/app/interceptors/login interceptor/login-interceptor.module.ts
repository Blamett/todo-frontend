import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './login-interceptor.service';
@NgModule({
    providers: [
        LoginInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoginInterceptor,
            multi: true,
        },
    ],
})
export class LoginInterceptorModule { }