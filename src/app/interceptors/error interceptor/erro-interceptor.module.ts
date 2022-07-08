import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErorInterceptor } from './erro-interceptor.service';
@NgModule({
    providers: [
        ErorInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErorInterceptor,
            multi: true,
        },
    ],
})
export class ErorInterceptorModule { }