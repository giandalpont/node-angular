import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RootComponent } from "./root.component";
import { ApplicationModule } from "src/app/application/application.module";
import { ErrorInterceptor } from "../interceptors/error.interceptor";
import { RequestInterceptor } from "../interceptors/request.interceptor";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    imports: [BrowserModule, ApplicationModule],
    declarations: [RootComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: '' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [RootComponent]
})
export class RootModule {}
